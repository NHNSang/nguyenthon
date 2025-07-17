import { z } from 'zod';

// Schema cho form submission
export const submissionSchema = z.object({
    name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự' }),
    phone: z.string().min(10, { message: 'Số điện thoại không hợp lệ' })
        .regex(/^[0-9+\- ]+$/, { message: 'Số điện thoại không hợp lệ' }),
    email: z.string().email({ message: 'Email không hợp lệ' }).optional(),
    message: z.string().optional(),
});

// Type được trích xuất từ schema
export type Submission = z.infer<typeof submissionSchema>;
