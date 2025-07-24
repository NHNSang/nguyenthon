# Tài liệu về Flow Gửi Email trong Ứng dụng Nguyên Thông

## Tổng quan

Ứng dụng Nguyên Thông JP sử dụng kết hợp hai hệ thống chính để xử lý form liên hệ của khách hàng:
1. **WordPress** - lưu trữ dữ liệu form liên hệ
2. **Resend API** - gửi email thông báo và xác nhận

## Flow chính

### 1. Nhận và xác thực dữ liệu form

Khi người dùng gửi form liên hệ, quá trình xử lý bắt đầu tại API endpoint `/api/contact`:

```typescript
// src/app/api/contact/route.ts
export async function POST(req: NextRequest) {
  // Parse và validate dữ liệu
  const body = await req.json();
  const validationResult = submissionSchema.safeParse(body);
  
  // Nếu dữ liệu không hợp lệ, trả về lỗi
  if (!validationResult.success) {
    return NextResponse.json({
      success: false,
      error: 'Dữ liệu không hợp lệ',
      issues: validationResult.error.issues
    }, { status: 400 });
  }
  
  // Tiếp tục xử lý nếu dữ liệu hợp lệ
  // ...
}
```

### 2. Lưu thông tin vào WordPress

Thông tin form được gửi đến WordPress thông qua GraphQL API:

```typescript
// Gửi submission lên WordPress
const result = await ContactService.submitContactForm(validationResult.data);
```

Chi tiết implementation trong `ContactService`:

```typescript
// src/services/contact.ts
async submitContactForm(data: Submission): Promise<{ success: boolean; id?: string; error?: string }> {
  // Chuẩn bị mutation query
  const mutation = `mutation CreateSubmission($input: CreateSubmissionInput!) {...}`;
  
  // Gửi request đến WordPress GraphQL endpoint với JWT token
  const response = await api.post(graphqlEndpoint, {
    query: mutation,
    variables
  }, { headers });
  
  // Xử lý response và trả về kết quả
  // ...
}
```

### 3. Gửi email thông báo đến Admin

Sau khi lưu vào WordPress thành công, hệ thống gửi email thông báo đến Admin (không đồng bộ):

```typescript
// Gửi email thông báo đến admin (không chờ kết quả để tránh làm chậm response)
EmailService.sendNotificationToAdmin(validationResult.data)
  .then((emailResult) => {
    if (!emailResult.success) {
      console.warn('Không thể gửi email thông báo đến admin:', emailResult.error);
    }
  })
  .catch(err => {
    console.error('Lỗi khi gửi email thông báo đến admin:', err);
  });
```

### 4. Gửi email xác nhận đến người dùng

Nếu người dùng cung cấp email, hệ thống sẽ gửi email xác nhận:

```typescript
// Gửi email xác nhận đến người dùng (nếu họ cung cấp email)
if (validationResult.data.email) {
  try {
    const emailResult = await EmailService.sendConfirmationToUser(validationResult.data);
    // Xử lý kết quả...
  } catch (emailError) {
    console.error('Lỗi khi gửi email xác nhận đến người dùng:', emailError);
  }
}
```

## Chi tiết các Email Services

### EmailService

`EmailService` sử dụng Resend API trực tiếp để gửi email:

```typescript
// src/services/email.ts
export const EmailService = {
  // Gửi email thông báo đến admin
  async sendNotificationToAdmin(data: Submission): Promise<{ success: boolean, error?: string }> {
    // Tạo nội dung email và gửi qua Resend API
    const { data: emailData, error } = await resend.emails.send({
      from: `Nguyên Thông JP <onboarding@resend.dev>`,
      to: [process.env.ADMIN_EMAIL],
      subject: emailSubject,
      html: emailHtml,
    });
    // ...
  },
  
  // Gửi email xác nhận đến người dùng
  async sendConfirmationToUser(data: Submission): Promise<{ success: boolean, error?: string }> {
    // Tạo nội dung email và gửi qua Resend API
    const { data: emailData, error } = await resend.emails.send({
      from: `Nguyên Thông JP <onboarding@resend.dev>`,
      to: [data.email],
      subject: emailSubject,
      html: emailHtml,
    });
    // ...
  }
};
```

### ReactEmailService

`ReactEmailService` gọi một API endpoint nội bộ để render và gửi email với React Email template:

```typescript
// src/services/react-email.ts
export const ReactEmailService = {
  async sendConfirmationToUser(data: Submission): Promise<{ success: boolean, error?: string }> {
    // Gọi API gửi email
    const response = await apiClient.post('/api/send-confirmation', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message
    });
    // ...
  }
};
```

### API Endpoint /api/send-confirmation

API endpoint này render React Email template và gửi email thông qua Resend:

```typescript
// src/app/api/send-confirmation/route.tsx
export async function POST(req: NextRequest) {
  // Parse request body
  const body = await req.json();
  const { name, email, phone, message } = body;
  
  // Render React Email template
  const emailComponent = <UserConfirmationEmail
    firstName={firstName}
    lastName={lastName}
    email={email}
    message={message || ''}
  />;
  emailHtml = await renderAsync(emailComponent);
  
  // Gửi email xác nhận
  const { data: emailData, error } = await resend.emails.send({
    from: `Nguyên Thông JP <onboarding@resend.dev>`,
    to: [email],
    subject: emailSubject,
    html: emailHtml,
  });
  // ...
}
```

## Cấu hình Email

### Cấu hình trong .env.local

```bash
# Resend Email Configuration
RESEND_API_KEY=re_Gdusth5Y_H4kiN89Hz53QPDMgRFdYcv7r
EMAIL_DOMAIN=resend.dev  # Sử dụng resend.dev cho môi trường phát triển

ADMIN_EMAIL=lemsapartment@gmail.com
USER_EMAIL=lemsapartment@gmail.com
```

### Chuyển sang sử dụng domain tùy chỉnh

Để sử dụng domain tùy chỉnh (ví dụ: wp.nguyenthongjp.com) thay vì resend.dev, cần thực hiện các bước sau:

1. **Xác minh domain trong Resend Dashboard**:
   - Thêm các bản ghi DNS theo hướng dẫn của Resend:
     - Bản ghi MX
     - Bản ghi SPF (TXT)
     - Bản ghi DKIM (TXT)

2. **Sau khi xác minh thành công**, cập nhật `.env.local`:
   ```bash
   EMAIL_DOMAIN=wp.nguyenthongjp.com
   ```

3. **Cập nhật địa chỉ người gửi** trong tất cả các service:
   ```typescript
   from: `Nguyên Thông JP <noreply@wp.nguyenthongjp.com>`,
   ```

## Luồng dữ liệu

```
[Form submit] → [API route.ts] → [ContactService] → [WordPress GraphQL] → [Lưu dữ liệu]
                      ↓
            [EmailService/ReactEmailService]
                      ↓
                [Resend API] → [Email đến Admin & Người dùng]
```

## Xử lý lỗi

- **Lỗi WordPress**: Hiển thị thông báo lỗi cho người dùng, không gửi email
- **Lỗi Email**: Log lỗi nhưng vẫn trả về thành công nếu đã lưu được vào WordPress
- **Retry Logic**: Hiện tại không có retry logic cho email. Nếu email gửi thất bại, không tự động thử lại.

## Lưu ý khi triển khai

1. **Email Staging vs Production**:
   - Môi trường phát triển: Sử dụng `resend.dev` làm domain và `onboarding@resend.dev` làm địa chỉ gửi
   - Môi trường sản xuất: Sử dụng domain đã xác minh (ví dụ: wp.nguyenthongjp.com)

2. **Vấn đề email trùng lặp**:
   - Hiện tại, hệ thống đang gọi cả `EmailService` và `ReactEmailService`, có thể dẫn đến việc người dùng nhận được 2 email
   - Nên chuẩn hóa lại chỉ sử dụng một service

3. **Bảo mật**:
   - SMTP và API keys không nên được commit vào Git repository
   - Sử dụng biến môi trường hoặc các giải pháp quản lý bí mật khác

4. **Nâng cao hiệu năng**:
   - Cân nhắc việc thêm hàng đợi (queue) cho việc gửi email để tránh làm chậm response API
   - Implement retry logic cho email quan trọng

## Thư viện sử dụng

- [Resend](https://resend.com) - API để gửi email
- [React Email](https://react.email) - Xây dựng email templates với React
- [Axios](https://axios-http.com) - Thực hiện HTTP requests

## Kiểm tra và Debug

- Log chi tiết được implement trong tất cả các services
- Kiểm tra Resend dashboard để xem trạng thái email đã gửi
- Theo dõi các warning và error trong console

---

*Tài liệu này được cập nhật lần cuối ngày: 24/07/2025*
