import { Submission } from '@/lib/validations';
import { Resend } from 'resend';

// Khởi tạo resend client nếu có API key
const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

/**
 * Service xử lý việc gửi email thông báo
 */
export const EmailService = {
    /**
     * Gửi email thông báo đến admin khi có submission mới
     * 
     * @param data Dữ liệu từ form submission
     * @returns Promise với kết quả gửi email
     */
    async sendNotificationToAdmin(data: Submission): Promise<{ success: boolean, error?: string }> {
        try {
            // Kiểm tra xem đã cấu hình email chưa
            if (!resend || !process.env.ADMIN_EMAIL) {
                console.warn('Email service không được cấu hình. Bỏ qua việc gửi thông báo.');
                return { success: false, error: 'Email service không được cấu hình' };
            }

            // Chuẩn bị nội dung email
            const emailSubject = `Liên hệ mới từ ${data.name}`;

            // Tạo HTML cho email
            const emailHtml = `
        <h2>Thông tin liên hệ mới từ website</h2>
        <p><strong>Thời gian:</strong> ${new Date().toLocaleString('vi-VN')}</p>
        <hr />
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Họ và tên:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Số điện thoại:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.phone}</td>
          </tr>
          ${data.email ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.email}</td>
          </tr>
          ` : ''}
          ${data.message ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Tin nhắn:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.message}</td>
          </tr>
          ` : ''}
        </table>
        <p>Hãy liên hệ lại với khách hàng sớm nhất có thể.</p>
      `;

            // Gửi email
            const { data: emailData, error } = await resend.emails.send({
                from: `Thông báo website <noreply@${process.env.EMAIL_DOMAIN || 'example.com'}>`,
                to: [process.env.ADMIN_EMAIL],
                subject: emailSubject,
                html: emailHtml,
            });

            if (error) {
                throw new Error(`Lỗi khi gửi email: ${error.message}`);
            }

            return { success: true };
        } catch (error) {
            console.error('Lỗi khi gửi email thông báo:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Lỗi không xác định khi gửi email'
            };
        }
    },

    /**
     * Gửi email xác nhận đến người dùng khi họ gửi liên hệ
     * 
     * @param data Dữ liệu từ form submission
     * @returns Promise với kết quả gửi email
     */
    async sendConfirmationToUser(data: Submission): Promise<{ success: boolean, error?: string }> {
        try {
            // Kiểm tra xem đã cấu hình email chưa và người dùng có cung cấp email không
            if (!resend || !data.email) {
                console.warn('Email service không được cấu hình hoặc người dùng không cung cấp email. Bỏ qua việc gửi thông báo.');
                return { success: false, error: 'Không thể gửi email xác nhận' };
            }

            // Thông tin công ty
            const companyName = 'Nguyên Thông JP';
            const companyPhone = '028.3333.8888';
            const companyWebsite = 'nguyenthongjp.com';
            const companyAddress = 'Khu đô thị Vạn Phúc, Thủ Đức, TP. Hồ Chí Minh';

            // Chuẩn bị nội dung email
            const emailSubject = `Cảm ơn bạn đã liên hệ với ${companyName}`;

            // Tạo HTML cho email với thiết kế nâng cao
            const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Cảm ơn bạn đã liên hệ</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              border-bottom: 2px solid #0C4B7A;
            }
            .logo {
              max-width: 150px;
              margin-bottom: 10px;
            }
            .content {
              padding: 20px 0;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eaeaea;
              text-align: center;
              font-size: 14px;
              color: #666;
            }
            .highlight {
              background-color: #f5f9fc;
              border-left: 4px solid #0C4B7A;
              padding: 15px;
              margin: 20px 0;
            }
            .button {
              display: inline-block;
              background-color: #0C4B7A;
              color: #ffffff;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 4px;
              margin: 20px 0;
              font-weight: bold;
            }
            .social {
              margin-top: 15px;
            }
            .social a {
              margin: 0 8px;
              display: inline-block;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="color: #0C4B7A; margin: 0;">${companyName}</h2>
              <p style="color: #666; margin-top: 5px;">Thiết kế & Thi công nội thất</p>
            </div>
            
            <div class="content">
              <p>Xin chào <strong>${data.name}</strong>,</p>
              
              <p>Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi đã nhận được thông tin của bạn và sẽ liên hệ lại trong thời gian sớm nhất.</p>
              
              <div class="highlight">
                <p style="margin-top: 0;"><strong>Thông tin bạn đã gửi:</strong></p>
                <p><strong>Họ và tên:</strong> ${data.name}</p>
                <p><strong>Số điện thoại:</strong> ${data.phone}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                ${data.message ? `<p><strong>Tin nhắn:</strong> ${data.message}</p>` : ''}
              </div>
              
              <p>Đội ngũ chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ làm việc.</p>
              
              <p>Nếu bạn cần hỗ trợ gấp, vui lòng liên hệ với chúng tôi qua:</p>
              <p>- Số điện thoại: ${companyPhone}</p>
              <p>- Email: info@${companyWebsite}</p>
              
              <div style="text-align: center; margin-top: 25px;">
                <a href="https://${companyWebsite}" class="button">Xem các dự án của chúng tôi</a>
              </div>
              
              <p style="margin-top: 30px;">Trân trọng,</p>
              <p><strong>Đội ngũ ${companyName}</strong></p>
            </div>
            
            <div class="footer">
              <p>${companyName} | ${companyAddress}</p>
              <p>Email này được gửi tự động, vui lòng không trả lời.</p>
              
              <div class="social">
                <a href="https://facebook.com/nguyenthongjp" style="color: #4267B2; text-decoration: none;">Facebook</a>
                <a href="https://zalo.me/nguyenthongjp" style="color: #0068ff; text-decoration: none;">Zalo</a>
                <a href="https://${companyWebsite}" style="color: #0C4B7A; text-decoration: none;">Website</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

            // Gửi email xác nhận
            const { data: emailData, error } = await resend.emails.send({
                from: `${companyName} <noreply@${process.env.EMAIL_DOMAIN || 'example.com'}>`,
                to: [data.email],
                subject: emailSubject,
                html: emailHtml,
            });

            if (error) {
                throw new Error(`Lỗi khi gửi email: ${error.message}`);
            }

            return { success: true };
        } catch (error) {
            console.error('Lỗi khi gửi email xác nhận cho người dùng:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Lỗi không xác định khi gửi email'
            };
        }
    }
};
