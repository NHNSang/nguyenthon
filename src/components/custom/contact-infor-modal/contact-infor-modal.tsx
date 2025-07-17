"use client";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle,
  Mail,
  MessageCircle,
  MousePointerClick,
  Phone,
  User,
  X
} from "lucide-react";
import { useState } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Submission, submissionSchema } from "@/lib/validations";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactInfoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  // Khai báo giá trị mặc định cho form
  const defaultValues: Partial<Submission> = {
    name: "",
    phone: "",
    email: "",
    message: "",
  };

  // Định nghĩa form
  const form = useForm<Submission>({
    resolver: zodResolver(submissionSchema),
    defaultValues,
  })
  // Lấy các phương thức từ form
  const {
    handleSubmit,
    setValue,
    watch,
    reset
  } = form;

  // Định nghĩa hàm onsubmit để xử lý gửi dữ liệu
  const onsubmit = async (data: Submission) => {
    try {
      // Gọi API route của NextJS để xử lý submission
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        toast.success("Gửi thông tin thành công!", {
          description: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
          closeButton: true
        });

        // Reset form sau 3 giây
        setTimeout(() => {
          setIsOpen(false);
          setIsSuccess(false);
          reset();
        }, 3000);
      } else {
        console.error('Lỗi từ API:', result.error);
        toast.error("Gửi thông tin thất bại!", {
          description: result.error || "Vui lòng thử lại sau.",
          closeButton: true
        });
      }
    } catch (error) {
      console.error('Exception khi gửi form:', error);
      toast.error("Gửi thông tin thất bại!", {
        description: error instanceof Error ? error.message : "Vui lòng thử lại sau.",
        closeButton: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const internalSubmit: SubmitHandler<Submission> = async (data) => {
    setIsSubmitting(true);
    const validationResult = await form.trigger(["name", "phone", "email", "message"]);

    if (!validationResult) {
      toast(" các trường đã điền không hợp lệ ", {
        description: "Vui lòng kiểm tra lại thông tin đã nhập.",
        closeButton: true
      });
      setIsSubmitting(false);
      return; //Dừng submit
    }

    await onsubmit(data);

  }
  const closeModal = () => {
    setIsOpen(false);
    setIsSuccess(false);
    reset();
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-primary text-white  px-8 py-3 w-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-calibri"
      >
        {/* <User className="mr-2" size={20} /> */}
        Để Lại Thông Tin
        <MousePointerClick />
      </Button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md mx-auto">
            <Card className="relative bg-white shadow-2xl border-0 font-calibri">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                aria-label="Đóng"
              >
                <X size={24} />
              </button>

              {!isSuccess ? (
                <>
                  {/* Header */}
                  <CardHeader className="text-center pb-3">
                    <CardTitle className="text-2xl font-bold text-gray-900 mt-3">
                      Để Lại Thông Tin Liên Hệ
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
                    </CardDescription>
                  </CardHeader>

                  {/* Form */}
                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={handleSubmit(internalSubmit)}
                        className="space-y-4">
                        {/* Name Field */}
                        <FormField
                          control={form.control}
                          name='name'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex flex-row items-center justify-start gap-1">
                                <User size={16} className="mr-2 text-blue-600" />
                                Họ và tên *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nhập họ và tên của bạn"
                                  type="text"
                                  className="text-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Phone Field */}
                        <FormField
                          control={form.control}
                          name='phone'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex flex-row items-center justify-start gap-1">
                                <Phone size={16} className="mr-2 text-green-600" />
                                Số điện thoại *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nhập số điện thoại"
                                  type="tel"
                                  className="text-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Email Field */}
                        <FormField
                          control={form.control}
                          name='email'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex flex-row items-center justify-start gap-1">
                                <Mail size={16} className="mr-2 text-blue-600" />
                                Email *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nhập địa chỉ email"
                                  type="email"
                                  className="text-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Message Field */}
                        <FormField
                          control={form.control}
                          name='message'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex flex-row items-center justify-start gap-1">
                                <MessageCircle size={16} className="mr-2 text-blue-600" />
                                Lời nhắn *
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Nhập tin nhắn hoặc yêu cầu của bạn (tùy chọn)"
                                  {...field}
                                  disabled={isSubmitting}
                                  rows={2}
                                  className="text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Submit Button */}
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-primary text-white font-semibold py-3 rounded-lg transition-all duration-300 mt-6"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Đang gửi...
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

                    {/* Note */}
                    <p className="text-xs text-gray-500 text-center py-3">
                      * Thông tin bắt buộc. Chúng tôi cam kết bảo mật thông tin
                      của bạn.
                    </p>
                  </CardContent>
                </>
              ) : (
                /* Success State */
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
  );
}
