import { Submission } from '@/lib/validations';
import axios from 'axios';

// Kiểm tra nếu đang chạy ở client-side
const isClient = typeof window !== 'undefined';

/**
 * Service để gửi thông tin liên hệ đến WordPress thông qua Contact Form 7 API
 */
export const CF7Service = {
    /**
     * Gửi submission đến WordPress Contact Form 7
     * @param data Dữ liệu form submission
     * @returns Promise với kết quả từ WordPress
     */
    async submitContactForm(data: Submission): Promise<{ success: boolean; id?: string; error?: string }> {
        try {
            // ID của Contact Form trong Contact Form 7 (bạn cần thay đổi ID này)
            const contactFormId = 123; // Thay bằng ID thực tế của contact form trong CF7

            // URL của Contact Form 7 REST API
            const apiEndpoint = `https://aqua-pigeon-769011.hostingersite.com/wp-json/contact-form-7/v1/contact-forms/${contactFormId}/feedback`;

            // Chuyển đổi dữ liệu sang FormData để phù hợp với Contact Form 7
            const formData = new FormData();
            formData.append('your-name', data.name);
            formData.append('your-phone', data.phone);
            if (data.email) formData.append('your-email', data.email);
            if (data.message) formData.append('your-message', data.message);

            console.log('Gửi request đến Contact Form 7:', apiEndpoint);

            // Gửi request
            const response = await axios.post(apiEndpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            console.log('CF7 Response:', response.data);

            // Kiểm tra response
            if (response.data.status === 'mail_sent') {
                // Lưu kết quả thành công vào sessionStorage cho tracking (chỉ khi ở client)
                if (isClient) {
                    const cacheKey = `submission_${Date.now()}`;
                    sessionStorage.setItem(cacheKey, JSON.stringify({
                        timestamp: new Date().toISOString(),
                        data: data,
                        success: true
                    }));
                }

                return {
                    success: true,
                    // Contact Form 7 không trả về ID, nhưng chúng ta có thể sử dụng timestamp
                    id: Date.now().toString()
                };
            } else {
                throw new Error(response.data.message || 'Không thể gửi form');
            }
        } catch (error) {
            console.error('Lỗi khi gửi submission qua Contact Form 7:', error);

            // Kiểm tra lỗi từ Axios để hiển thị thông tin chi tiết hơn
            let errorMessage = 'Đã xảy ra lỗi khi gửi thông tin';

            if (axios.isAxiosError(error)) {
                // Lỗi từ axios request
                errorMessage = `Lỗi API (${error.response?.status || 'unknown'}): ${error.response?.data?.message || error.message || 'Không có chi tiết lỗi'
                    }`;

                // Log thêm chi tiết để debug
                console.error('Response error data:', error.response?.data);
                console.error('Request config:', error.config);
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            // Fallback data để tránh app crash
            return {
                success: false,
                error: errorMessage
            };
        }
    }
};
