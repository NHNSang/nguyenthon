import { ContactService } from '@/services/contact';
import { EmailService } from '@/services/email';
import { ReactEmailService } from '@/services/react-email';
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
                EmailService.sendNotificationToAdmin(validationResult.data)
                    .then((emailResult) => {
                        if (!emailResult.success) {
                            console.warn('Không thể gửi email thông báo đến admin:', emailResult.error);
                        }
                    })
                    .catch(err => {
                        console.error('Lỗi khi gửi email thông báo đến admin:', err);
                    });

                // Gửi email xác nhận đến người dùng (nếu họ cung cấp email)
                if (validationResult.data.email) {
                    try {
                        // Thử gửi email xác nhận trực tiếp với EmailService (template thông thường)
                        // Debug log chỉ trong development
                        console.log('Gửi email xác nhận tới:', validationResult.data.email);
                        console.log('Đang sử dụng Resend với cấu hình:', {
                            api_key_exists: !!process.env.RESEND_API_KEY,
                            email_domain: process.env.EMAIL_DOMAIN,
                            sender: 'onboarding@resend.dev'
                        });

                        const emailResult = await EmailService.sendConfirmationToUser(validationResult.data);
                        if (emailResult.success) {
                            console.log('Đã gửi email xác nhận thành công đến:', validationResult.data.email);
                        } else {
                            // Warning log vẫn giữ lại để dễ debug
                            console.warn('Không thể gửi email xác nhận đến người dùng:', emailResult.error);
                            // Log thêm thông tin để debug resend
                            console.log('Cấu hình email hiện tại:', {
                                api_key: process.env.RESEND_API_KEY ? 'Đã cấu hình' : 'Chưa cấu hình',
                                email_domain: process.env.EMAIL_DOMAIN || 'Không có'
                            });
                        }

                        // Ghi log thử sử dụng React Email nhưng không block process
                        ReactEmailService.sendConfirmationToUser(validationResult.data)
                            .then(result => {
                                if (result.success) {
                                    // Debug log chỉ trong development
                                    if (process.env.NODE_ENV !== 'production') {
                                        console.log('Đã gửi React Email xác nhận thành công');
                                    }
                                } else {
                                    // Warning log vẫn giữ lại để dễ debug
                                    console.warn('Không thể gửi React Email xác nhận:', result.error);
                                }
                            })
                            .catch(err => {
                                // Error log vẫn giữ lại để dễ debug
                                console.error('Lỗi khi thử gửi React Email:', err);
                            });
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
    runtime: 'edge',
};
