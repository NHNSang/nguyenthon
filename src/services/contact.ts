import { api } from '@/lib/apiClient';
import { Submission } from '@/lib/validations';
import axios from 'axios';

// Kiểm tra nếu đang chạy ở client-side
const isClient = typeof window !== 'undefined';

// Interface cho response từ GraphQL
interface SubmissionResponse {
    data?: {
        createSubmission?: {
            submission?: {
                id?: string;
                databaseId?: number;
                title?: string;
                date?: string;
                status?: string;
                content?: string;
                slug?: string;
            },
            clientMutationId?: string;
        }
    },
    errors?: Array<{
        message: string;
        locations?: Array<{ line: number; column: number }>;
        path?: string[];
        extensions?: any;
    }>;
    extensions?: {
        debug?: Array<{
            type: string;
            message: string;
        }>;
    };
}

/**
 * Service để gửi thông tin liên hệ đến WordPress thông qua GraphQL
 */
export const ContactService = {
    /**
     * Gửi submission đến WordPress
     * @param data Dữ liệu form submission
     * @returns Promise với kết quả từ WordPress
     */
    async submitContactForm(data: Submission): Promise<{ success: boolean; id?: string; error?: string }> {
        try {
            // Chuẩn bị mutation query theo đúng cấu trúc GraphQL của WordPress
            const mutation = `
        mutation CreateSubmission($input: CreateSubmissionInput!) {
          createSubmission(input: $input) {
            submission {
              id
              databaseId
              title
              date
              status
              content
              slug
            }
            clientMutationId
          }
        }
      `;

            // Chuẩn bị variables cho GraphQL request dựa trên tài liệu WordPress
            const variables = {
                input: {
                    clientMutationId: `submission-${Date.now()}`,
                    // Các trường chính xác theo tài liệu
                    title: `Liên hệ từ: ${data.name}`,
                    content: `
            <strong>Họ và tên:</strong> ${data.name}
            <strong>Số điện thoại:</strong> ${data.phone}
            <strong>Email:</strong> ${data.email || 'Không cung cấp'}
            <strong>Tin nhắn:</strong> ${data.message || 'Không có nội dung'}
          `,
                    status: 'PUBLISH',
                    date: new Date().toISOString(),
                    // Có thể thêm slug nếu cần
                    slug: `lien-he-${data.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
                }
            };

            // Cache key để lưu trữ trạng thái submission
            const cacheKey = `submission_${Date.now()}`;

            // URL đầy đủ của WordPress GraphQL endpoint
            const graphqlEndpoint = 'https://wp.nguyenthongjp.com/graphql';

            // Lấy JWT token
            const token = process.env.WORDPRESS_AUTH_REFRESH_TOKEN || process.env.NEXT_PUBLIC_WORDPRESS_AUTH_TOKEN;

            // Chuẩn bị headers với JWT token
            const headers = {
                'Content-Type': 'application/json',
                // Sử dụng JWT token
                'Authorization': `Bearer ${token}`
            };

            // Gửi request đến WordPress GraphQL endpoint với JWT token
            const response = await api.post(graphqlEndpoint, {
                query: mutation,
                variables
            }, { headers });

            const result = response.data as SubmissionResponse;

            // Kiểm tra lỗi GraphQL
            if (result.errors) {
                throw new Error(result.errors[0]?.message || 'GraphQL error');
            }

            // Kiểm tra kết quả và trả về trạng thái thành công/thất bại
            if (result.data?.createSubmission?.submission) {
                // Lưu kết quả thành công vào sessionStorage cho tracking (chỉ khi ở client)
                if (isClient) {
                    sessionStorage.setItem(cacheKey, JSON.stringify({
                        timestamp: new Date().toISOString(),
                        data: data,
                        success: true
                    }));
                }

                return {
                    success: true,
                    id: result.data?.createSubmission?.submission?.id ||
                        result.data?.createSubmission?.submission?.databaseId?.toString() ||
                        'unknown'
                };
            } else {
                throw new Error('Submission không thành công');
            }
        } catch (error) {
            console.error('Lỗi khi gửi submission:', error);

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
