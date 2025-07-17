import axios, { AxiosError, AxiosResponse } from 'axios';

// Tạo instance axios với cấu hình mặc định
const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm interceptor để xử lý lỗi
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export { api };

