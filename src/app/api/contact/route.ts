import { ContactService } from '@/services/contact';
import { GmailService } from '@/services/gmail';
// import { EmailService } from '@/services/email';
// import { ReactEmailService } from '@/services/react-email';
// import { ContactRestService } from '@/services/contact-rest'; 
// import { CF7Service } from '@/services/contact-cf7';
import { submissionSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API route để xử lý form submission
 * 
 * @param req NextRequest - Yêu cầu từ client
 * @returns NextResponse - Phản hồi cho client
 */
export async function POST(req: NextRequest) {
    try {
        // Giới hạn tốc độ gửi request để ngăn spam
        // TODO: Thêm rate limiting solution trong production.

        // Parse dữ liệu từ request
        const body = await req.json();

        // Kiểm tra origin của request để ngăn CSRF
        const origin = req.headers.get('origin');
        if (!process.env.NODE_ENV.includes('development') &&
            !origin?.includes(process.env.NEXT_PUBLIC_SITE_URL || '')) {
            return NextResponse.json(
                { success: false, error: 'Không được phép gửi từ domain này' },
                { status: 403 }
            );
        }

        // Validate dữ liệu bằng schema
        const validationResult = submissionSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Dữ liệu không hợp lệ',
                    issues: validationResult.error.issues
                },
                { status: 400 }
            );
        }

        // Gửi dữ liệu đến WordPress thông qua GraphQL và gửi email thông báo
        try {
            // Gửi submission lên WordPress
            const result = await ContactService.submitContactForm(validationResult.data);

            if (result.success) {
                // Gửi email thông báo đến admin (không chờ kết quả để tránh làm chậm response)
                GmailService.sendNotificationToAdmin(validationResult.data)
                    .then((emailResult: { success: boolean; error?: string }) => {
                        if (!emailResult.success) {
                            console.warn('Không thể gửi email thông báo đến admin:', emailResult.error);
                        } else {
                            console.log('Đã gửi email thông báo đến admin thành công');
                        }
                    })
                    .catch((err: any) => {
                        console.error('Lỗi khi gửi email thông báo đến admin:', err);
                    });

                // Gửi email xác nhận đến người dùng (nếu họ cung cấp email)
                if (validationResult.data.email) {
                    try {
                        // Thử gửi email xác nhận trực tiếp với EmailService (template thông thường)
                        // Debug log
                        console.log('Gửi email xác nhận tới:', validationResult.data.email);
                        console.log('Đang sử dụng Gmail với cấu hình:', {
                            gmail_user_exists: !!process.env.GMAIL_USER,
                            gmail_password_exists: !!process.env.GMAIL_APP_PASSWORD,
                            admin_email: process.env.ADMIN_EMAIL
                        });

                        const emailResult = await GmailService.sendConfirmationToUser(validationResult.data);
                        if (emailResult.success) {
                            console.log('Đã gửi email xác nhận thành công đến:', validationResult.data.email);
                        } else {
                            // Warning log vẫn giữ lại để dễ debug
                            console.warn('Không thể gửi email xác nhận đến người dùng:', emailResult.error);
                            // Log thêm thông tin để debug Gmail
                            console.log('Cấu hình email hiện tại:', {
                                gmail_user: process.env.GMAIL_USER || 'Chưa cấu hình',
                                gmail_password: process.env.GMAIL_APP_PASSWORD ? 'Đã cấu hình' : 'Chưa cấu hình'
                            });
                        }

                        // Chỉ sử dụng Gmail service, không cần React Email nữa
                    } catch (emailError) {
                        // Error log vẫn giữ lại để dễ debug
                        console.error('Lỗi khi gửi email xác nhận đến người dùng:', emailError);
                    }
                }

                return NextResponse.json({
                    success: true,
                    message: 'Đã gửi thông tin thành công',
                    id: result.id,
                    emailSent: !!validationResult.data.email
                });
            } else {
                // Trả về lỗi nhưng không throw exception để có thể xử lý tốt hơn
                console.error('Lỗi từ service:', result.error);
                return NextResponse.json({
                    success: false,
                    error: result.error || 'Lỗi không xác định khi gửi dữ liệu'
                }, { status: 500 });
            }

            /* 
            // Backup plan: Chỉ gửi email nếu GraphQL không hoạt động
            // Gửi email thông báo đến admin
            const emailResult = await EmailService.sendNotificationToAdmin(validationResult.data);
            
            if (emailResult.success) {
              return NextResponse.json({ 
                success: true,
                message: 'Đã gửi thông tin thành công',
              });
            } else {
              console.error('Lỗi khi gửi email thông báo:', emailResult.error);
              return NextResponse.json({
                success: false,
                error: emailResult.error || 'Lỗi không xác định khi gửi email'
              }, { status: 500 });
            }
            */
        } catch (serviceError) {
            console.error('Lỗi khi gọi service:', serviceError);
            return NextResponse.json({
                success: false,
                error: serviceError instanceof Error ? serviceError.message : 'Lỗi không xác định khi gọi service'
            }, { status: 500 });
        }

    } catch (error) {
        console.error('Lỗi khi xử lý submission:', error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Đã có lỗi xảy ra khi xử lý yêu cầu'
            },
            { status: 500 }
        );
    }
}

// Cấu hình CORS headers cho API route này nếu cần
export const config = {
    // runtime: 'edge',
    runtime: 'nodejs',
};
