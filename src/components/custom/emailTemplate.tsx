import * as React from 'react';

export interface EmailTemplateProps {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  message: string;
  name?: string;
}

export interface UserConfirmationEmailProps {
  firstName: string;
  lastName?: string;
  email: string;
  message: string;
}

/**
 * Template email cho admin
 */
export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email,
  phone,
  message,
}) => (
  <div style={main}>
    <div style={container}>
      <h1 style={h1}>Thông báo liên hệ mới từ website</h1>
      <p style={text}>Xin chào Ban quản trị,</p>
      <p style={text}>
        Bạn vừa nhận được một liên hệ mới từ website với thông tin như sau:
      </p>
      <p style={text}>
        <strong>Họ và tên:</strong> {firstName} {lastName || ''}
      </p>
      <p style={text}>
        <strong>Email:</strong> {email}
      </p>
      <p style={text}>
        <strong>Số điện thoại:</strong> {phone}
      </p>
      <p style={text}>
        <strong>Nội dung tin nhắn:</strong>
      </p>
      <p style={text}>{message}</p>
      <p style={text}>
        Vui lòng liên hệ lại với khách hàng trong thời gian sớm nhất.
      </p>
      <p style={footer}>
        &copy; {new Date().getFullYear()} Nguyên Thông. All Rights Reserved.
      </p>
    </div>
  </div>
);

/**
 * Template email xác nhận cho người dùng
 */
export const UserConfirmationEmail: React.FC<Readonly<UserConfirmationEmailProps>> = ({
  firstName,
  lastName,
  email,
  message,
}) => {
  const fullName = `${firstName} ${lastName || ''}`.trim();

  return (
    <div style={main}>
      <div style={container}>
        <h1 style={h1}>Cảm ơn bạn đã liên hệ với chúng tôi</h1>

        <p style={text}>
          Xin chào {fullName},
        </p>

        <p style={text}>
          Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất.
          Dưới đây là thông tin mà bạn đã gửi cho chúng tôi:
        </p>

        <div style={boxedContent}>
          <p style={{ ...text, fontStyle: 'italic' }}>
            "{message}"
          </p>
        </div>

        <hr style={divider} />

        <p style={text}>
          Đội ngũ của chúng tôi sẽ xem xét nội dung tin nhắn và liên hệ lại với bạn qua email {email} trong vòng 24 giờ làm việc.
        </p>

        <p style={text}>
          Nếu bạn có bất kỳ câu hỏi nào khác, vui lòng không ngần ngại liên hệ với chúng tôi.
        </p>

        <div style={buttonContainer}>
          <a
            href="https://nguyenthongjp.com"
            style={button}
          >
            Xem thêm dự án của chúng tôi
          </a>
        </div>

        <p style={signatureText}>
          Trân trọng,<br />
          Đội ngũ Nguyên Thông
        </p>

        <hr style={divider} />

        <p style={footer}>
          &copy; {new Date().getFullYear()} Nguyên Thông. All Rights Reserved.<br />
          Địa chỉ: 350 Đường số 13, P. Bình Trị Đông, Q. Bình Tân, TP. Hồ Chí Minh
        </p>
      </div>
    </div>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #e6ebf1',
  borderRadius: '6px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  margin: '0 auto',
  maxWidth: '600px',
  padding: '30px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.4',
  margin: '16px 0',
  textAlign: 'center' as const,
};

const text = {
  color: '#444',
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '14px',
};

const footer = {
  color: '#898989',
  fontSize: '14px',
  lineHeight: '22px',
  marginTop: '32px',
  textAlign: 'center' as const,
};

const boxedContent = {
  backgroundColor: '#f9f9f9',
  border: '1px solid #e6ebf1',
  borderRadius: '4px',
  padding: '15px',
  margin: '20px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#0C4B7A',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '12px 20px',
  textAlign: 'center' as const,
  display: 'inline-block',
};

const divider = {
  borderTop: '1px solid #e6ebf1',
  margin: '30px 0',
};

const signatureText = {
  ...text,
  marginTop: '30px',
};