import { UserConfirmationEmail } from '@/components/custom/emailTemplate';
import { renderAsync } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Khởi tạo resend client nếu có API key
const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

export async function POST(req: NextRequest) {
    if (!resend) {
        return NextResponse.json(
            { success: false, error: 'Email service không được cấu hình' },
            { status: 500 }
        );
    }

    try {
        // Parse request body
        const body = await req.json();
        const { name, email, phone, message } = body;

        if (!name || !email) {
            return NextResponse.json(
                { success: false, error: 'Thiếu thông tin bắt buộc' },
                { status: 400 }
            );
        }

        // Thông tin công ty
        const companyName = 'Nguyên Thông JP';

        // Debug log chỉ trong development
        if (process.env.NODE_ENV !== 'production') {
            console.log('Xử lý React Email template cho:', email);
        }

        // Xử lý tên để tạo firstName và lastName
        const nameParts = name.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

        // Chuẩn bị nội dung email
        const emailSubject = `Cảm ơn bạn đã liên hệ với ${companyName}`;

        let emailHtml;
        try {
            // Render React Email template
            const emailComponent = <UserConfirmationEmail
                firstName={firstName}
                lastName={lastName}
                email={email}
                message={message || ''}
            />;

            // Debug log chỉ trong development
            if (process.env.NODE_ENV !== 'production') {
                console.log('Rendering React Email template...');
            }

            emailHtml = await renderAsync(emailComponent);

            // Debug log chỉ trong development
            if (process.env.NODE_ENV !== 'production') {
                console.log('Đã render React Email template thành công');
            }
        } catch (renderError) {
            console.error('Lỗi khi render React Email template:', renderError);
            return NextResponse.json(
                { success: false, error: 'Lỗi khi xử lý template email' },
                { status: 500 }
            );
        }

        // Gửi email xác nhận
        try {
            // Debug log chỉ trong development
            if (process.env.NODE_ENV !== 'production') {
                console.log('Gửi email với Resend đến:', email);
            }

            const { data: emailData, error } = await resend.emails.send({
                from: `${companyName} <noreply@${process.env.EMAIL_DOMAIN || 'example.com'}>`,
                to: [email],
                subject: emailSubject,
                html: emailHtml,
            });

            if (error) {
                // Error log vẫn giữ lại để dễ debug
                console.error('Lỗi khi gửi email React:', error);
                return NextResponse.json(
                    { success: false, error: error.message },
                    { status: 500 }
                );
            }

            // Debug log chỉ trong development
            if (process.env.NODE_ENV !== 'production') {
                console.log('Resend API trả về thành công, ID:', emailData?.id);
            }

            return NextResponse.json({
                success: true,
                message: 'Đã gửi email xác nhận thành công',
                id: emailData?.id
            });
        } catch (sendError) {
            console.error('Exception khi gửi email qua Resend:', sendError);
            return NextResponse.json(
                {
                    success: false,
                    error: sendError instanceof Error ? sendError.message : 'Lỗi không xác định khi gửi email'
                },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Lỗi khi xử lý yêu cầu:', error);

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
