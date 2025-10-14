import { Submission } from '@/lib/validations';
import * as nodemailer from 'nodemailer';

// Tạo transporter cho Gmail
const createGmailTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER, // email Gmail của công ty
            pass: process.env.GMAIL_APP_PASSWORD, // App Password của Gmail
        },
    });
};

/**
 * Service gửi email sử dụng Gmail SMTP thông qua Nodemailer
 */
export const GmailService = {
    /**
     * Gửi email thông báo đến admin khi có submission mới
     */
    async sendNotificationToAdmin(data: Submission): Promise<{ success: boolean; error?: string }> {
        try {
            const transporter = createGmailTransporter();

            // Kiểm tra cấu hình Gmail
            if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
                console.warn('Gmail không được cấu hình. Bỏ qua việc gửi email thông báo.');
                return { success: false, error: 'Gmail chưa được cấu hình' };
            }

            // Tạo nội dung email HTML
            const emailSubject = `🚨 [ADMIN] Yêu cầu tư vấn mới từ ${data.name} - ${new Date().toLocaleString('vi-VN')}`;
            const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .content { background-color: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; }
            .info-row { margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #f1f3f4; }
            .label { font-weight: bold; color: #495057; }
            .value { margin-left: 10px; }
            .footer { margin-top: 20px; font-size: 12px; color: #6c757d; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0; color: #007bff;">🏗️ Yêu cầu tư vấn mới</h2>
              <p style="margin: 5px 0 0 0; color: #6c757d;">Từ website Nguyên Thông JP Construction</p>
            </div>
            
            <div class="content">
              <div class="info-row">
                <span class="label">👤 Họ và tên:</span>
                <span class="value">${data.name}</span>
              </div>
              
              <div class="info-row">
                <span class="label">📞 Số điện thoại:</span>
                <span class="value">${data.phone}</span>
              </div>
              
              <div class="info-row">
                <span class="label">📧 Email:</span>
                <span class="value">${data.email || 'Không cung cấp'}</span>
              </div>
              
              <div class="info-row">
                <span class="label">💬 Tin nhắn:</span>
                <div class="value" style="margin-top: 10px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
                  ${data.message || 'Không có tin nhắn'}
                </div>
              </div>
              
              <div class="info-row">
                <span class="label">🕒 Thời gian:</span>
                <span class="value">${new Date().toLocaleString('vi-VN')}</span>
              </div>
            </div>
            
            <div class="footer">
              <p>Email này được gửi tự động từ hệ thống website Nguyên Thông JP Construction</p>
              <p>Vui lòng liên hệ với khách hàng trong thời gian sớm nhất.</p>
            </div>
          </div>
        </body>
        </html>
      `;



            // Gửi email (có thể thêm CC cho backup)
            const mailOptions = {
                from: `"Nguyên Thông JP Construction" <${process.env.GMAIL_USER}>`,
                to: process.env.ADMIN_EMAIL,
                // cc: 'backup@email.com', // Có thể thêm CC nếu cần
                subject: emailSubject,
                html: emailHtml,
            };

            const info = await transporter.sendMail(mailOptions);

            return { success: true };

        } catch (error) {
            console.error('Lỗi khi gửi email thông báo đến admin:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Lỗi không xác định khi gửi email'
            };
        }
    },

    /**
     * Gửi email xác nhận đến người dùng
     */
    async sendConfirmationToUser(data: Submission): Promise<{ success: boolean; error?: string }> {
        try {
            // Kiểm tra email người dùng
            if (!data.email) {
                return { success: false, error: 'Không có email người dùng' };
            }

            const transporter = createGmailTransporter();

            // Kiểm tra cấu hình Gmail
            if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
                console.warn('Gmail không được cấu hình. Bỏ qua việc gửi email xác nhận.');
                return { success: false, error: 'Gmail chưa được cấu hình' };
            }

            // Tạo nội dung email xác nhận
            const emailSubject = 'Cảm ơn bạn đã liên hệ với Nguyên Thông JP Construction';
            const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #ffffff; padding: 30px; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 8px 8px; }
            .highlight { background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0; }
            .contact-info { background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e9ecef; font-size: 14px; color: #6c757d; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">🏗️ Nguyên Thông JP Construction</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Cảm ơn bạn đã tin tướng và liên hệ với chúng tôi!</p>
            </div>
            
            <div class="content">
              <h2 style="color: #007bff; margin-top: 0;">Xin chào ${data.name}!</h2>
              
              <p>Chúng tôi đã nhận được yêu cầu tư vấn của bạn và sẽ liên hệ lại trong thời gian sớm nhất.</p>
              
              <div class="highlight">
                <h3 style="margin-top: 0; color: #007bff;">📋 Thông tin bạn đã gửi:</h3>
                <p><strong>Họ và tên:</strong> ${data.name}</p>
                <p><strong>Số điện thoại:</strong> ${data.phone}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Nội dung:</strong> ${data.message || 'Không có nội dung cụ thể'}</p>
              </div>
              
              <div class="contact-info">
                <h3 style="margin-top: 0; color: #007bff;">📞 Thông tin liên hệ</h3>
                <p><strong>Công ty:</strong> Nguyên Thông JP Construction</p>
                <p><strong>Điện thoại:</strong>0912842727</p>
                <p><strong>Email:</strong> ${process.env.ADMIN_EMAIL}</p>
                <p><strong>Website:</strong> nguyenthongjp.com</p>
              </div>
              
              <p>Nếu bạn có bất kỳ câu hỏi nào khác, vui lòng liên hệ trực tiếp với chúng tôi qua thông tin trên.</p>
            </div>
            
            <div class="footer">
              <p>Email này được gửi tự động từ hệ thống của Nguyên Thông JP Construction</p>
              <p>© ${new Date().getFullYear()} Nguyên Thông JP Construction. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;

            // Gửi email xác nhận
            const info = await transporter.sendMail({
                from: `"Nguyên Thông JP Construction" <${process.env.GMAIL_USER}>`,
                to: data.email,
                subject: emailSubject,
                html: emailHtml,
            });

            return { success: true };

        } catch (error) {
            console.error('Lỗi khi gửi email xác nhận đến người dùng:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Lỗi không xác định khi gửi email'
            };
        }
    }
};

export default GmailService;