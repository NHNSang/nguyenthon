'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, MousePointerClick, X } from 'lucide-react'
import { useState, useTransition } from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Submission, submissionSchema } from '@/lib/validations'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { FormError } from '../forms/FormError'
import { FormSuccess } from '../forms/FormSuccess'

export default function ContactInfoModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<Submission>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
  })

  const { handleSubmit, reset, watch } = form

  const onSubmit = (values: Submission) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })

        const result = await res.json()

        if (result.success) {
          setSuccess('Gửi thông tin thành công!')
          setIsSuccess(true)

          toast.success('Gửi thông tin thành công!', {
            description:
              'Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.',
            duration: 3000,
            closeButton: true,
          })

          // ✅ Tự đóng modal sau 3 giây
          setTimeout(() => {
            setIsOpen(false)
            setIsSuccess(false)
            reset()
          }, 3000)
        } else {
          throw new Error(result.error || 'Vui lòng thử lại sau.')
        }
      } catch (error) {
        console.error('Lỗi khi gửi:', error)
        toast.error('Gửi thông tin thất bại!', {
          description:
            error instanceof Error ? error.message : 'Vui lòng thử lại sau.',
          closeButton: true,
        })
        setError(error instanceof Error ? error.message : String(error))
      }
    })
  }

  const closeModal = () => {
    setIsOpen(false)
    setIsSuccess(false)
    reset()
  }

  return (
    <>
      {/* Nút mở form */}
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-primary text-white px-8 py-3 w-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-calibri"
      >
        Để Lại Thông Tin
        <MousePointerClick />
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md mx-auto">
            <Card className="relative bg-white shadow-2xl border-0 font-calibri">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                aria-label="Đóng"
              >
                <X size={24} />
              </button>

              {!isSuccess ? (
                <>
                  <CardHeader className="text-center pb-3">
                    <CardTitle className="text-2xl font-bold text-gray-900 mt-3">
                      Để lại thông tin liên hệ
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col justify-between flex-1"
                      >
                        {/* Họ tên */}
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <>
                              <Label>Họ và tên</Label>
                              <FormItem className="my-2">
                                <FormControl>
                                  <Input
                                    placeholder="Họ và tên"
                                    {...field}
                                    className="w-full border-neutral-700 shadow-sm text-neutral-500 placeholder:text-neutral-400 rounded-none"
                                  />
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
                              <Label>Email *</Label>
                              <FormItem className="my-2">
                                <FormControl>
                                  <Input
                                    placeholder="Email"
                                    {...field}
                                    className="w-full border-neutral-700 shadow-sm text-neutral-500 placeholder:text-neutral-400 rounded-none"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            </>
                          )}
                        />

                        {/* Số điện thoại */}
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <>
                              <Label>Số điện thoại *</Label>
                              <FormItem className="my-2">
                                <FormControl>
                                  <Input
                                    placeholder="Điện thoại"
                                    {...field}
                                    className="w-full border-neutral-700 shadow-sm text-neutral-500 placeholder:text-neutral-400 rounded-none"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            </>
                          )}
                        />

                        {/* Tin nhắn */}
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <>
                              <Label>Nội dung tin nhắn</Label>
                              <FormItem className="my-2">
                                <FormControl>
                                  <Textarea
                                    placeholder="Vui lòng để lại yêu cầu của bạn!"
                                    {...field}
                                    className="border-neutral-700 shadow-sm text-neutral-500 placeholder:text-neutral-400 rounded-none"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            </>
                          )}
                        />

                        {/* Hiển thị lỗi/thành công */}
                        <div className="my-1">
                          {error ? (
                            <FormError message={error} />
                          ) : success ? (
                            <FormSuccess message={success} />
                          ) : null}
                        </div>

                        {/* Nút gửi */}
                        <Button
                          disabled={isPending}
                          type="submit"
                          className="w-full bg-primary py-6 mt-3"
                        >
                          {isPending ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              <span className="font-bold text-xl text-white">
                                ĐANG GỬI...
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <CheckCircle size={20} className="mr-2" />
                              Hoàn Thành
                            </div>
                          )}
                        </Button>
                      </form>
                    </Form>

                    <p className="text-xs text-gray-500 text-center py-3">
                      * Thông tin bắt buộc. Chúng tôi cam kết bảo mật thông tin
                      của bạn.
                    </p>
                  </CardContent>
                </>
              ) : (
                // ✅ Giao diện sau khi gửi thành công
                <div className="p-8 text-center">
                  <div className="mb-6">
                    <div className="mx-auto w-16 h-10 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle size={32} className="text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Gửi Thành Công!
                    </h3>
                    <p className="text-gray-600">
                      Cảm ơn bạn đã để lại thông tin. Chúng tôi sẽ liên hệ với
                      bạn trong vòng 24 giờ.
                    </p>
                  </div>

                  <div className="bg-[#F1EDE6] border border-[#F5F5F3] rounded-lg p-4 mb-4">
                    <div className="text-sm text-black space-y-1">
                      <div>
                        <strong>Họ tên:</strong> {watch('name')}
                      </div>
                      <div>
                        <strong>Điện thoại:</strong> {watch('phone')}
                      </div>
                      {watch('email') && (
                        <div>
                          <strong>Email:</strong> {watch('email')}
                        </div>
                      )}
                      {watch('message') && (
                        <div>
                          <strong>Tin nhắn:</strong> {watch('message')}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">
                    Cửa sổ này sẽ tự động đóng sau 3 giây...
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </>
  )
}
