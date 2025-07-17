import axios from 'axios';

/**
 * Axios instance cho các API calls
 * Sử dụng baseURL là URL đầy đủ của trang web
 * Các requests sẽ tự động được gửi với Content-Type: application/json
 */
/**
 * Hàm đảm bảo URL có giao thức HTTP/HTTPS
 */
function ensureHttpProtocol(url: string): string {
    if (!url) return 'http://localhost:3000';

    // Kiểm tra xem URL đã có giao thức HTTP/HTTPS chưa
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        // Mặc định thêm https:// nếu không có giao thức
        return `https://${url}`;
    }
    return url;
}

export const apiClient = axios.create({
    baseURL: typeof window !== 'undefined'
        ? window.location.origin
        : ensureHttpProtocol(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Thêm interceptors để xử lý lỗi
 */
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Chỉ log lỗi trong development mode
        if (process.env.NODE_ENV !== 'production') {
            console.error('API request failed:', error);
        }
        return Promise.reject(error);
    }
);
