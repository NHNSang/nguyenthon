"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  X,
  User,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  MousePointerClick,
} from "lucide-react";

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
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsOpen(false);
      setIsSuccess(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    }, 3000);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsSuccess(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name Field */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-gray-700 font-medium flex items-center"
                        >
                          <User size={16} className="mr-2 text-blue-600" />
                          Họ và tên *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Nhập họ và tên của bạn"
                          className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>

                      {/* Phone Field */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-gray-700 font-medium flex items-center"
                        >
                          <Phone size={16} className="mr-2 text-green-600" />
                          Số điện thoại *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Nhập số điện thoại"
                          className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-gray-700 font-medium flex items-center"
                        >
                          <Mail size={16} className="mr-2 text-red-600" />
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Nhập địa chỉ email (tùy chọn)"
                          className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      {/* Message Field */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="message"
                          className="text-gray-700 font-medium flex items-center"
                        >
                          <MessageSquare
                            size={16}
                            className="mr-2 text-purple-600"
                          />
                          Tin nhắn
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Nhập tin nhắn hoặc yêu cầu của bạn (tùy chọn)"
                          className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px] resize-none"
                          rows={4}
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={
                          isSubmitting || !formData.name || !formData.phone
                        }
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
                        <strong>Họ tên:</strong> {formData.name}
                      </div>
                      <div>
                        <strong>Điện thoại:</strong> {formData.phone}
                      </div>
                      {formData.email && (
                        <div>
                          <strong>Email:</strong> {formData.email}
                        </div>
                      )}
                      {formData.message && (
                        <div>
                          <strong>Tin nhắn:</strong> {formData.message}
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
