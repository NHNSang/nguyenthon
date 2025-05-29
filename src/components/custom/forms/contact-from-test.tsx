'use client';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { FormError } from './FormError';
import { FormSuccess } from './FormSuccess';
import { Button } from '@/components/ui/button';
import { ContactSchema } from '@/schemas';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface ContactFormProps {
  labelOfForm: string;
}

interface ContactFormResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

const ContactFormTest  = ({ labelOfForm }: ContactFormProps) => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ContactSchema>) => {
    setError('');
    setSuccess('');

    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS;
    if (!apiUrl) {
      setError('Lỗi cấu hình: Thiếu URL API WordPress.');
      toast.error('Lỗi cấu hình hệ thống. Vui lòng liên hệ quản trị viên.');
      return;
    }


    startTransition(async () => {
      try {
        const response = await fetch('https://aqua-pigeon-769011.hostingersite.com/wp-json/wp/v2/contact_submission', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'X-WP-Nonce': nonce,
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_WORDPRESS_API_TOKEN}`,
          },
          body: JSON.stringify(values),
        });

        const result: ContactFormResponse = await response.json();

        if (response.ok && result.success) {
          setSuccess(result.message || 'Gửi thông tin thành công!');
          form.reset();
          toast.success(result.message || 'Yêu cầu của bạn đã được gửi thành công!');
        } else {
          throw new Error(result.error || 'Gửi yêu cầu thất bại. Vui lòng thử lại.');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định.';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Contact form submission error:', error);
      }
    });
  };

  return (
    <div className="bg-neutral-100 relative w-full lg:w-10/12 h-[550px] p-5 flex flex-col justify-center">
      <div className="absolute top-5 left-5 flex flex-row justify-center items-center gap-2 border-[1px] border-neutral-300 shadow-xl py-2 mx-auto bg-neutral-800 text-white w-11/12">
        <h2 className="text-center font-[500] text-2xl">{labelOfForm}</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full bg-white border-none focus:ring-0 shadow-sm rounded-none text-neutral-500"
                    type="text"
                    placeholder="Họ và tên"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full bg-white border-none focus:ring-0 rounded-none shadow-xl text-neutral-500"
                    type="email"
                    placeholder="Email"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full bg-white border-none focus:ring-0 rounded-none shadow-xl text-neutral-500"
                    type="tel"
                    placeholder="Điện thoại"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Vui lòng để lại yêu cầu của bạn!"
                    className="border-0 focus:ring-0 shadow-xl rounded-none bg-white text-neutral-500 h-24"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button
            disabled={isPending}
            type="submit"
            className="bg-secondary w-full text-white hover:bg-secondary/90 border-none flex items-center justify-center"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang gửi...
              </>
            ) : (
              <span className="tracking-wide">LIÊN HỆ TƯ VẤN</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactFormTest;