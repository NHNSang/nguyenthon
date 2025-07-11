# Tài liệu: Khắc phục lỗi URI trong Next.js Dynamic Routes khi tích hợp với WordPress API

## Vấn đề

Khi xây dựng ứng dụng Next.js sử dụng Dynamic Routes (`[uri]`) để lấy dữ liệu từ WordPress GraphQL API, chúng ta gặp phải lỗi sau trong quá trình build:

```
Error: Post is null or missing slug for uri: %2Fproject%2Fnew-espace-citoyen-des-confluents-transforms-former-industrial-site-into-sustainable-urban-renewal-model%2F
Error loading project: Error: Post not found or invalid
```

### Nguyên nhân:

1. **URI bị mã hóa URL**: Các URI từ WordPress được trả về dưới dạng mã hóa URL (URL-encoded), nhưng API WordPress GraphQL yêu cầu URI đúng định dạng.

2. **Không nhất quán trong việc xử lý URI**: Cách xử lý URI trong các hàm `generateStaticParams()`, `generateMetadata()`, và trong component chính không đồng nhất.

3. **Kiểu dữ liệu không đúng trong Next.js**: Next.js mong đợi tham số `params` trong `generateMetadata()` và component trang chính là một Promise nhưng chúng ta đang xử lý nó như một đối tượng thông thường.

4. **Thiếu xử lý dữ liệu null hoặc undefined**: Không có đủ kiểm tra và xử lý các trường hợp khi API trả về dữ liệu không hợp lệ.

## Giải pháp

### 1. Xử lý URI trong hàm getSingleProject

```typescript
export async function getSingleProject(uri: string): Promise<SingleProject> {
  // Decode URI if encoded and clean up formatting
  let cleanUri = uri;
  try {
    // Handle encoded URI formats
    if (cleanUri.includes('%2F')) {
      cleanUri = decodeURIComponent(cleanUri);
    }
    
    // Ensure the URI has proper format for WordPress API
    if (!cleanUri.startsWith('/')) {
      cleanUri = '/' + cleanUri;
    }
    if (!cleanUri.endsWith('/')) {
      cleanUri = cleanUri + '/';
    }
    
    console.log('Formatted URI for API request:', cleanUri);
  } catch (error) {
    console.error('Error processing URI:', error);
  }

  const data = await FetchAPI(`
  query singleProject($id: ID = "new-espace-citoyen-des-confluents-transforms-former-industrial-site-into-sustainable-urban-renewal-model", $idType: ProjectIdType = URI) {
    project(id: $id, idType: $idType) {
      // ... rest of the query
    }
  }
  `, {
    variables: {
      id: cleanUri
    }
  });

  return data;
}
```

### 2. Xử lý URI trong generateStaticParams

```typescript
export async function generateStaticParams(): Promise<{ uri: string }[]> {
  try {
    const res = await getAllProjects();
    
    // Properly format and clean URIs to ensure they work correctly
    return res?.projects?.nodes?.map((item) => {
      let cleanUri = item.uri || '';
      
      // Remove project prefix and trailing slashes for route parameters
      cleanUri = cleanUri.replace(/^\/project\//, '').replace(/\/$/, '');
      
      console.log('Cleaned URI for route:', cleanUri);
      
      return { 
        uri: cleanUri 
      };
    }) || [];
  } catch (error) {
    console.error('Error generating static params in du-an:', error);
    return [];
  }
}
```

### 3. Kiểu dữ liệu tham số trong generateMetadata và Component

```typescript
// Định nghĩa interface
interface Params {
  uri: string;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  try {
    const { uri } = await params;
    const projectUri = `/project/${uri}/`;
    const res = await getSingleProject(projectUri);
    
    // Rest of the function
  }
}

// Main page component
export default async function SingleProjectPage({ params }: { params: Promise<Params> }) {
  try {
    const { uri } = await params;
    const projectUri = `/project/${uri}/`;
    const res = await getSingleProject(projectUri);
    
    // Rest of the function
  }
}
```

## Tại sao xảy ra lỗi này?

1. **Khác biệt giữa cách xử lý URI của WordPress và Next.js**:
   - WordPress lưu trữ URI dưới dạng `/project/slug/`
   - Next.js dynamic routes thường chỉ cần `slug` không cần tiền tố và hậu tố "/"

2. **Mã hóa URL**:
   - WordPress có thể trả về URI đã encoded (ví dụ: `%2Fproject%2Fslug%2F`)
   - Cần decode trước khi sử dụng

3. **Next.js SSG và Server Components**:
   - Trong Next.js App Router, `params` trong `generateMetadata` và component trang là một Promise
   - Cần sử dụng `await params` để lấy giá trị thực

## Các bài học và quy tắc cần nhớ

1. **Luôn xử lý URI từ API bên ngoài**:
   - Decode URI nếu cần
   - Đảm bảo định dạng nhất quán (có hoặc không có dấu gạch chéo ở đầu và cuối)

2. **Kiểm tra kiểu dữ liệu trong Next.js**:
   - Trong generateMetadata: `params` là một Promise
   - Trong component trang: `params` cũng là một Promise với App Router

3. **Logging và kiểm tra**:
   - Log URI để debug
   - Kiểm tra dữ liệu null/undefined và xử lý lỗi

4. **Nhất quán trong việc xử lý URI**:
   - Nếu WordPress API cần `/project/slug/`
   - Next.js routes sử dụng `slug`
   - Đảm bảo chuyển đổi đúng định dạng giữa hai hệ thống

## Quy trình kiểm tra

1. Chạy `pnpm build` để xác minh không còn lỗi
2. Kiểm tra console log để theo dõi các URI đã được xử lý
3. Kiểm tra tất cả các đường dẫn dự án trong ứng dụng

## Áp dụng cho các dự án tương lai

Khi làm việc với WordPress API và Next.js trong tương lai, hãy:

1. Tạo các tiện ích xử lý URI để đảm bảo tính nhất quán
2. Thêm kiểm tra kiểu dữ liệu và xử lý lỗi
3. Tuân thủ quy ước kiểu dữ liệu của Next.js App Router (`params` là Promise)
4. Sử dụng TypeScript để đảm bảo kiểu dữ liệu chính xác

Việc hiểu và triển khai đúng cách xử lý URI sẽ giúp tránh các lỗi tương tự trong các dự án tương lai và đảm bảo quá trình xây dựng và triển khai diễn ra suôn sẻ.
