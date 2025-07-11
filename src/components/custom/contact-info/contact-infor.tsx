"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle, MessageSquare } from "lucide-react";

// Component form liên hệ
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    service: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const services = [
    "Biệt thư villa",
    "Căn hộ khách sạn",
    "Nhà hàng cà phê",
    "Nhà phố",
    "Văn phòng",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
      setIsSuccess(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        service: "",
      });
    }, 3000);
  };

  if (isSuccess) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-[#D5B48C] rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={32} className="text-balack" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Gửi Thành Công!
          </h3>
          <p className="text-gray-600 mb-4">
            Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi trong
            vòng 24 giờ.
          </p>
          <div className="bg-[#D5B48C]  rounded-lg p-4 text-left">
            <div className="text-sm text-balack space-y-1">
              <div>
                <strong>Họ tên:</strong> {formData.name}
              </div>
              <div>
                <strong>Email:</strong> {formData.email}
              </div>
              <div>
                <strong>Điện thoại:</strong> {formData.phone}
              </div>
              <div>
                <strong>Dịch vụ:</strong> {formData.service}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-[#F5F5F3] p-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center ">
          Gửi Tin Nhắn Cho Chúng Tôi
        </CardTitle>
        <CardDescription className="text-gray-600 italic mb-3">
          Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nhập họ và tên của bạn"
                required
                className="w-full px-4 py-2 border border-[#D5B78F] bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#D5B78F]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Nhập số điện thoại"
                required
                className="w-full px-4 py-2 border border-[#D5B78F] bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#D5B78F]"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Nhập địa chỉ email"
                required
                className="w-full px-4 py-2 border border-[#D5B78F] bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#D5B78F]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Công ty/Tổ chức</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Tên công ty (tùy chọn)"
                className="w-full px-4 py-2 border border-[#D5B78F] bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#D5B78F]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Dịch vụ quan tâm *</Label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-[#D5B78F] bg-white rounded-md focus:outline-none focus:ring-2 focu]s:ring-[#D5B78F] text-gray-600 text-sm"
              required
            >
              <option value="">Chọn dịch vụ</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Tiêu đề *</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Nhập tiêu đề tin nhắn"
              className="w-full px-4 py-2 border border-[#D5B78F] bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#D5B78F]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Nội dung tin nhắn *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Mô tả chi tiết yêu cầu của bạn..."
              className="w-full px-4 py-2 border border-[#D5B78F] bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#D5B78F] min-h-[120px] resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#D5B48C] hover:scale-105 text-black rounded-lg py-3 text-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Đang gửi...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Send size={18} className="mr-2" />
                Gửi Tin Nhắn
              </div>
            )}
          </Button>

          <p className="text-xs text-gray-600 text-center">
            * Thông tin bắt buộc. Chúng tôi cam kết bảo mật thông tin của bạn.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default function ContactInfor() {
  return (
    <div className="mb-6 font-calibri">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-[35%_60%] gap-12 ">
        <ContactForm />
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4245999999997!2d106.69999999999999!3d10.7769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b00000000%3A0x0!2zMTAuNzc2OSwgMTA2LjcwMDAw!5e0!3m2!1svi!2s!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
