'use client'

import type React from 'react'
import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { FormError } from '../forms/FormError'
import { FormSuccess } from '../forms/FormSuccess'
import { useForm } from 'react-hook-form'
import { submissionSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

// Component form liên hệ
function ContactForm() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof submissionSchema>>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    // Hiển thị thông báo lỗi ngay khi người dùng rời khỏi trường đầu vào
    mode: 'onBlur',
  })
  const onSubmit = (values: z.infer<typeof submissionSchema>) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      try {
        // Gọi API route của NextJS để xử lý submission
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })

        const result = await response.json()

        if (result.success) {
          setSuccess('Gửi thông tin thành công!')
          form.reset()

          // Hiển thị toast thông báo thành công
          toast.success('Gửi thông tin thành công!', {
            description:
              'Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.',
            closeButton: true,
            duration: 3000,
          })

          // Tự động ẩn thông báo thành công sau 3 giây
          setTimeout(() => {
            setSuccess('')
          }, 3000)
        } else {
          console.error('Lỗi từ API:', result.error)

          // Hiển thị toast thông báo lỗi
          toast.error('Gửi thông tin thất bại!', {
            description: result.error || 'Vui lòng thử lại sau.',
            closeButton: true,
          })

          throw new Error(result.error || 'Vui lòng thử lại sau.')
        }
      } catch (error) {
        console.error('Exception khi gửi form:', error)

        // Hiển thị toast thông báo lỗi
        toast.error('Gửi thông tin thất bại!', {
          description:
            error instanceof Error ? error.message : 'Vui lòng thử lại sau.',
          closeButton: true,
        })

        setError(error instanceof Error ? error.message : String(error))
      }
    })
  }
  return (
    <Card className=" lg:border lg:border-primary p-3">
      <CardHeader>
        <CardTitle className="text-2xl md:text-2xl uppercase tracking-[2px] lg:tracking-[3px] font-semibold text-center border-b lg:border-none border-primary">
          Gửi Tin Nhắn Cho
          <p className="text-primary"> NGUYÊN THỐNG JP</p>
        </CardTitle>
      </CardHeader>
      {/* form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between flex-1"
        >
          {/* họ và tên */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <>
                <Label htmlFor="name">Họ và tên</Label>
                <FormItem className="my-3 relative">
                  <FormControl className="h-[50px]">
                    <div className="relative">
                      <Input
                        className="w-full px-4 py-2 border border-[#D5B78F] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#D5B78F]"
                        type="text"
                        placeholder="Nhập họ và tên của bạn"
                        {...field}
                        value={field.value || ''}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <>
                <Label htmlFor="email">Email *</Label>

                <FormItem className="my-3">
                  <FormControl className="h-[50px]">
                    <div className="relative">
                      <Input
                        required
                        className="w-full px-4 py-2 border border-[#D5B78F] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#D5B78F]"
                        type="text"
                        placeholder="Nhập địa chỉ email"
                        {...field}
                      />
                      <span className="absolute left-2 top-[30%] transform -translate-y-1/2 text-red-400 text-xl pointer-events-none z-10">
                        *
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <>
                <Label htmlFor="phone">Số điện thoại *</Label>

                <FormItem className="my-3">
                  <FormControl className="h-[50px]">
                    <div className="relative">
                      <Input
                        required
                        className="w-full px-4 py-2 border border-[#D5B78F] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#D5B78F]"
                        type="text"
                        placeholder="Nhập số điện thoại"
                        {...field}
                      />
                      <span className="absolute left-2 top-[30%] transform -translate-y-1/2 text-red-400 text-xl pointer-events-none z-10">
                        *
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <>
                <Label htmlFor="message">Nội dung tin nhắn</Label>
                <FormItem className="my-3">
                  <FormControl className="h-[50px]">
                    <Textarea
                      {...field}
                      placeholder="Mô tả chi tiết yêu cầu của bạn..."
                      className="w-full px-4 py-2 border border-[#D5B78F] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#D5B78F] min-h-[120px] resize-none"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              </>
            )}
          />
          <div className="my-1">
            {error ? (
              <FormError message={error} />
            ) : success ? (
              <FormSuccess message={success} />
            ) : null}
          </div>
          <Button
            disabled={isPending}
            type="submit"
            className="w-full border-none bg-primary py-6 mt-auto"
          >
            {isPending ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                <span className="tracking-wide font-extrabold text-xl text-white">
                  ĐANG GỬI...
                </span>
              </div>
            ) : (
              <span className="tracking-wide font-extrabold text-xl text-white">
                GỬI NGAY
              </span>
            )}
          </Button>
          <p className="text-xs text-gray-600 text-center py-2">
            * Thông tin bắt buộc. Chúng tôi cam kết bảo mật thông tin của bạn.
          </p>
        </form>
      </Form>
    </Card>
  )
}

export default function ContactInfor() {
  return (
    <div className="pb-6">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-[35%_60%] lg:gap-12">
        <ContactForm />
        <div className="overflow-hidden lg:shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4245999999997!2d106.69999999999999!3d10.7769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b00000000%3A0x0!2zMTAuNzc2OSwgMTA2LjcwMDAw!5e0!3m2!1svi!2s!4v1234567890"
            width="100%"
            height="100%"
            className="h-[300px] lg:h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
