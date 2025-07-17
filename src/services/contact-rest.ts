import { Submission } from '@/lib/validations';
import axios from 'axios';

// Kiểm tra nếu đang chạy ở client-side
const isClient = typeof window !== 'undefined';

/**
 * Service để gửi thông tin liên hệ đến WordPress thông qua REST API tùy chỉnh
 */
export const ContactRestService = {
    /**
     * Gửi submission đến WordPress qua REST API
     * @param data Dữ liệu form submission
     * @returns Promise với kết quả từ WordPress
     */
    async submitContactForm(data: Submission): Promise<{ success: boolean; id?: string; error?: string }> {
        try {
            // URL của REST API endpoint tùy chỉnh
            const apiEndpoint = 'https://aqua-pigeon-769011.hostingersite.com/wp-json/nguyenthon/v1/submit-contact';

            console.log('Gửi request đến REST API:', apiEndpoint);

            // Gửi request
            const response = await axios.post(apiEndpoint, {
                name: data.name,
                phone: data.phone,
                email: data.email || '',
                message: data.message || ''
            });

            console.log('REST API Response:', response.data);

            // Kiểm tra response
            if (response.data.success) {
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
                    id: response.data.id?.toString()
                };
            } else {
                throw new Error(response.data.message || 'Không thể gửi form');
            }
        } catch (error) {
            console.error('Lỗi khi gửi submission qua REST API:', error);

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
