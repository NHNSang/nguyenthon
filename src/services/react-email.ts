import { apiClient } from '@/lib/axios-client';
import { Submission } from '@/lib/validations';

/**
 * Service xử lý việc gửi email sử dụng React Email template
 */
export const ReactEmailService = {
    /**
     * Gửi email xác nhận đến người dùng với mẫu React Email
     * 
     * @param data Dữ liệu từ form submission
     * @returns Promise với kết quả gửi email
     */
    async sendConfirmationToUser(data: Submission): Promise<{ success: boolean, error?: string }> {
        try {
            // Kiểm tra email người dùng
            if (!data.email) {
                return { success: false, error: 'Thiếu địa chỉ email người nhận' };
            }

            // Gọi API gửi email (sử dụng axios từ lib/axios-client.ts)
            try {
                // Debug log chỉ trong development
                if (process.env.NODE_ENV !== 'production') {
                    console.log('Gửi request đến URL:', `${apiClient.defaults.baseURL}/api/send-confirmation`);
                }

                const response = await apiClient.post('/api/send-confirmation', {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    message: data.message
                });

                if (response.data.success) {
                    // Debug log chỉ trong development
                    if (process.env.NODE_ENV !== 'production') {
                        console.log('API trả về thành công');
                    }
                    return { success: true };
                } else {
                    // Warning log vẫn giữ lại để dễ debug
                    console.warn('API trả về lỗi:', response.data.error);
                    return { success: false, error: response.data.error || 'API trả về lỗi không xác định' };
                }
            } catch (apiError: any) {
                // Error log vẫn giữ lại để dễ debug
                console.error('Lỗi khi gọi API gửi email:', apiError.message || 'Lỗi không xác định');
                return { success: false, error: apiError.message || 'Lỗi kết nối đến API gửi email' };
            }
        } catch (error) {
            console.error('Lỗi khi gửi email xác nhận sử dụng React Email:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Lỗi không xác định khi gửi email'
            };
        }
    }
};
