'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
} from 'lucide-react'
import { motion } from 'framer-motion'

// Dữ liệu công ty
const companyData = {
  name: 'BuildPro Construction',
  mainOffice: {
    address: '119 Lê Ấm, P. Hoà Xuân, TP. Đà Nẵng.',
    companyBranch: ' 58A Nguyễn Thành Hãn, P. Hoà Cường, TP. Đà Nẵng.',
    phone: '0912842727',
    email: 'nguyenthongjpcontrustion@gmail.com',
    website: 'https://www.nguyenthongjp.com/',
    workingHours: '7:30 - 17 (T2-T7),',
    hotline: '0912842727',
  },
}

export default function ContactInforV2() {
  return (
    <div className=" font-calibri">
      {/* Office Information */}
      <section className=" ">
        <div className="container mx-auto lg:px-4">
          <div className="max-w-5xl mx-auto ">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 bg-white  lg:border lg:border-primary lg:shadow-2xl">
                <h2 className="text-2xl md:text-3xl mb-2 lg:mb-6 uppercase tracking-[2px] lg:tracking-[3px] font-semibold text-center border-b lg:border-none border-primary">
                  Thông Tin <span className="text-primary">Văn Phòng</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Office Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-black mb-4 flex items-center">
                        <Building className="mr-2 text-black" size={20} />
                        Văn Phòng Chính
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <MapPin
                            className="mr-3 text-black mt-1 flex-shrink-0"
                            size={16}
                          />
                          <div className="text-black">
                            <p className="font-semibold ">
                              Địa chỉ:{' '}
                              <span className="font-normal ">
                                {companyData.mainOffice.address}
                              </span>
                            </p>
                            <p className="font-semibold mt-2">
                              Chi nhánh:{' '}
                              <span className="font-normal ">
                                {companyData.mainOffice.companyBranch}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-3 text-black" size={16} />
                          <div className="text-black">
                            <p className="font-semibold ">
                              Điện thoại:{' '}
                              <span className="font-normal">
                                {companyData.mainOffice.phone}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Mail className="mr-3 text-black" size={16} />
                          <div className="text-black">
                            <p className="font-semibold ">
                              Email:{' '}
                              <span className="font-normal">
                                {companyData.mainOffice.email}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Globe className="mr-3 text-black" size={16} />
                          <div className="text-black">
                            <p className="font-semibold ">
                              Website:{' '}
                              <span className="font-normal">
                                {companyData.mainOffice.website}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-3 text-black" size={16} />
                          <div className="text-black">
                            <p className="font-semibold ">
                              Giờ Làm Việc:{' '}
                              <span className="font-normal">
                                {companyData.mainOffice.workingHours}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div>
                      <div className=" p-4">
                        <div className="mt-3 pt-3 border-t border-primary">
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
                        <motion.button
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.05, 1] }} // Zoom in-out nhẹ
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="w-full bg-[#D5B48C] text-white flex items-center justify-center p-2"
                        >
                          <Phone className="mr-2 text-black" size={16} />
                          Gọi ngay: {companyData.mainOffice.phone}
                        </motion.button>
                        <Button className="w-full bg-[#D5B48C] ">
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
                        <div className="flex items-center justify-between p-3 bg-white lg:shadow-2xl border  border-primary  ">
                          <div className="flex items-center">
                            <Calculator className="mr-2 text-black" size={16} />
                            <span className="text-sm font-medium">
                              Báo giá miễn phí
                            </span>
                          </div>
                          <Badge variant="secondary">Miễn phí</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white lg:shadow-2xl border  border-primary  ">
                          <div className="flex items-center">
                            <Users className="mr-2 text-black" size={16} />
                            <span className="text-sm font-medium">
                              Tư vấn tại nhà
                            </span>
                          </div>
                          <Badge variant="secondary">24/7</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white lg:shadow-2xl border  border-primary  ">
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
  )
}
