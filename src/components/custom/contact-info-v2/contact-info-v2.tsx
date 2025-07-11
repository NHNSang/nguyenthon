"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
  Users,
  Globe,
  Shield,
  Calculator,
  FileText,
  Headphones,
} from "lucide-react";

// Dữ liệu công ty
const companyData = {
  name: "BuildPro Construction",
  mainOffice: {
    address:
      "119 Lê Ấm, Cẩm Lệ, Đà Nẵng. Chinh nhánh: 58A Nguyễn Thành Hãn, Hải Châu, Đà Nẵng.",
    phone: "0912842727",
    email: "info@nguyenthongjp.com",
    website: "https://nguyenthongjp.vercel.app/",
    workingHours: "8:00 - 17:30 (T2-T6), 8:00 - 12:00 (T7)",
    hotline: "0912842727",
  },
};

export default function ContactInforV2() {
  return (
    <div className=" font-calibri">
      {/* Office Information */}
      <section className=" ">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto ">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 bg-[#F5F5F3] shadow-2xl">
                <h2 className="text-3xl font-bold text-black mb-4 text-center">
                  Thông Tin Văn Phòng
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Office Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-black mb-4 flex items-center">
                        <Building className="mr-2 text-black" size={20} />
                        Văn Phòng Chính
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <MapPin
                            className="mr-3 text-black mt-1 flex-shrink-0"
                            size={16}
                          />
                          <div>
                            <p className="font-medium text-black">Địa chỉ:</p>
                            <p className="text-gray-600">
                              {companyData.mainOffice.address}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-3 text-black" size={16} />
                          <div>
                            <p className="font-medium text-black">
                              Điện thoại:
                            </p>
                            <p className="text-gray-600">
                              {companyData.mainOffice.phone}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Mail className="mr-3 text-black" size={16} />
                          <div>
                            <p className="font-medium text-black">Email:</p>
                            <p className="text-gray-600">
                              {companyData.mainOffice.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Globe className="mr-3 text-black" size={16} />
                          <div>
                            <p className="font-medium text-black">Website:</p>
                            <p className="text-gray-600">
                              {companyData.mainOffice.website}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div>
                      <h4 className="font-bold text-black mb-3 flex items-center">
                        <Clock className="mr-2 text-black" size={18} />
                        Giờ Làm Việc
                      </h4>
                      <div className="rounded-lg p-4">
                        <p className="text-gray-700">
                          {companyData.mainOffice.workingHours}
                        </p>
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              Hotline:
                            </span>
                            <span className="font-medium text-black">
                              {companyData.mainOffice.hotline}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-black mb-4 flex items-center">
                        <Headphones className="mr-2 text-black" size={18} />
                        Liên Hệ Nhanh
                      </h4>
                      <div className="space-y-3">
                        <Button className="w-full bg-[#D5B48C] rounded-lg">
                          <Phone className="mr-2 text-black" size={16} />
                          Gọi ngay: {companyData.mainOffice.phone}
                        </Button>
                        <Button className="w-full bg-[#D5B48C] rounded-lg">
                          <Phone className="mr-2 text-black" size={16} />
                          Gửi email: {companyData.mainOffice.email}
                        </Button>
                      </div>
                    </div>

                    {/* Additional Services */}
                    <div>
                      <h4 className="font-bold text-black mb-4 flex items-center">
                        <FileText className="mr-2 text-black" size={18} />
                        Dịch Vụ Hỗ Trợ
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-white shadow-2xl border  border-primary  rounded-lg">
                          <div className="flex items-center">
                            <Calculator className="mr-2 text-black" size={16} />
                            <span className="text-sm font-medium">
                              Báo giá miễn phí
                            </span>
                          </div>
                          <Badge variant="secondary">Miễn phí</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white shadow-2xl border  border-primary  rounded-lg">
                          <div className="flex items-center">
                            <Users className="mr-2 text-black" size={16} />
                            <span className="text-sm font-medium">
                              Tư vấn tại nhà
                            </span>
                          </div>
                          <Badge variant="secondary">24/7</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white shadow-2xl border  border-primary  rounded-lg">
                          <div className="flex items-center">
                            <Shield className="mr-2 text-black" size={16} />
                            <span className="text-sm font-medium">
                              Bảo hành 10 năm
                            </span>
                          </div>
                          <Badge variant="secondary">Cam kết</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
