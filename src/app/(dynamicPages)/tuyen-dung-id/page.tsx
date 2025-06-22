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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Send,
  Upload,
  CheckCircle,
  X,
  ArrowLeft,
  Calendar,
  Users,
  Building,
  Phone,
  Mail,
  Share2,
  Bookmark,
  BookmarkCheck,
  Star,
  Award,
  Target,
  Lightbulb,
  TrendingUp,
  Eye,
  Heart,
  Link,
} from "lucide-react";

// Dữ liệu mẫu cho công việc chi tiết
const jobData = {
  id: 1,
  title: "Kỹ Sư Xây Dựng Dân Dụng",
  department: "Kỹ Thuật",
  location: "Hà Nội",
  type: "Toàn thời gian",
  salary: "15-25 triệu VNĐ",
  experience: "2-5 năm",
  posted: "2 ngày trước",
  deadline: "30/01/2024",
  views: 1247,
  applications: 23,
  urgent: true,
  description:
    "Chúng tôi đang tìm kiếm một Kỹ Sư Xây Dựng Dân Dụng có kinh nghiệm để tham gia vào các dự án xây dựng quy mô lớn. Bạn sẽ chịu trách nhiệm thiết kế, giám sát thi công và đảm bảo chất lượng các công trình dân dụng và công nghiệp. Đây là cơ hội tuyệt vời để phát triển sự nghiệp trong một môi trường chuyên nghiệp và năng động.",
  responsibilities: [
    "Thiết kế và tính toán kết cấu các công trình dân dụng theo tiêu chuẩn quốc gia",
    "Giám sát thi công và kiểm tra chất lượng công trình tại hiện trường",
    "Lập báo cáo tiến độ và chất lượng dự án theo định kỳ",
    "Phối hợp với các bộ phận khác để đảm bảo tiến độ và chất lượng",
    "Tham gia khảo sát thực địa và đánh giá hiện trạng công trình",
    "Hỗ trợ giải quyết các vấn đề kỹ thuật phát sinh trong quá trình thi công",
    "Đảm bảo tuân thủ các quy chuẩn xây dựng và an toàn lao động",
    "Tham gia đào tạo và hướng dẫn nhân viên mới",
  ],
  requirements: [
    "Tốt nghiệp Đại học chuyên ngành Xây dựng Dân dụng hoặc Kỹ thuật Xây dựng",
    "Có kinh nghiệm 2-5 năm trong lĩnh vực thiết kế và thi công xây dựng",
    "Thành thạo các phần mềm AutoCAD, Revit, SAP2000, MS Office",
    "Có khả năng đọc hiểu bản vẽ kỹ thuật và các tiêu chuẩn xây dựng",
    "Kỹ năng giao tiếp tốt, làm việc nhóm hiệu quả",
    "Có thể đi công tác theo dự án trong và ngoài thành phố",
    "Có chứng chỉ hành nghề xây dựng là lợi thế lớn",
    "Khả năng làm việc dưới áp lực và đáp ứng deadline",
    "Tiếng Anh giao tiếp cơ bản là một lợi thế",
  ],
  benefits: [
    "Mức lương cạnh tranh từ 15-25 triệu VNĐ + thưởng theo hiệu quả dự án",
    "Bảo hiểm xã hội, y tế, tai nạn 24/7 theo quy định",
    "Thưởng lễ tết, 13th month salary và các dịp đặc biệt",
    "Chương trình đào tạo chuyên môn thường xuyên và nâng cao kỹ năng",
    "Cơ hội thăng tiến rõ ràng với lộ trình phát triển sự nghiệp",
    "Môi trường làm việc chuyên nghiệp, hiện đại và thân thiện",
    "Team building, du lịch nghỉ mát hàng năm cùng công ty",
    "Hỗ trợ ăn trưa, xe đưa đón và các phúc lợi khác",
    "Được tham gia các dự án lớn và học hỏi từ chuyên gia hàng đầu",
  ],
  workingConditions: [
    "Thời gian làm việc: 8:00 - 17:30, thứ 2 - thứ 6 (8 tiếng/ngày)",
    "Địa điểm: Văn phòng tại Hà Nội + các công trình thi công",
    "Môi trường: Văn phòng hiện đại, trang thiết bị đầy đủ, không gian mở",
    "Đồng nghiệp: Team trẻ, năng động, hỗ trợ lẫn nhau và chia sẻ kinh nghiệm",
    "Cơ hội học hỏi: Được làm việc với các chuyên gia giàu kinh nghiệm",
  ],
  companyInfo: {
    name: "BuildPro Construction Co., Ltd",
    size: "500+ nhân viên",
    industry: "Xây dựng & Kiến trúc",
    founded: "2008",
    website: "www.buildpro.vn",
    address: "Tầng 15, Tòa nhà ABC, 123 Đường XYZ, Cầu Giấy, Hà Nội",
    description:
      "Công ty xây dựng hàng đầu Việt Nam với hơn 15 năm kinh nghiệm trong lĩnh vực thiết kế và thi công các công trình dân dụng, công nghiệp.",
  },
  contactInfo: {
    recruiter: "Ms. Nguyễn Thị Lan Anh",
    position: "Trưởng phòng Nhân sự",
    phone: "024.3456.7890",
    email: "tuyendung@buildpro.vn",
    workingHours: "8:00 - 17:30 (T2-T6)",
  },
};

// Component form ứng tuyển
function ApplicationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        experience: "",
        coverLetter: "",
      });
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4  ">
      <div className="w-full max-w-2xl mx-auto">
        <Card className="relative bg-white shadow-2xl border-0 font-calibri max-h-[100vh] overflow-y-auto pb-3">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X size={24} className="text-black" />
          </button>

          {!isSuccess ? (
            <>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Ứng Tuyển: {jobData.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Điền thông tin của bạn để ứng tuyển vị trí này
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và tên *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Nhập họ và tên"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="Nhập số điện thoại"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Nhập địa chỉ email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Kinh nghiệm làm việc</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData({ ...formData, experience: e.target.value })
                      }
                      placeholder="Mô tả ngắn gọn về kinh nghiệm làm việc của bạn"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Thư xin việc</Label>
                    <Textarea
                      id="coverLetter"
                      value={formData.coverLetter}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          coverLetter: e.target.value,
                        })
                      }
                      placeholder="Viết vài dòng về lý do bạn muốn ứng tuyển vị trí này"
                      rows={4}
                    />
                  </div>

                  {/* <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-black mb-4" />
                    <p className="text-gray-600 mb-2">Tải lên CV của bạn</p>
                    <p className="text-sm text-gray-500">
                      PDF, DOC, DOCX (tối đa 5MB)
                    </p>
                    <Button type="button" variant="outline" className="mt-2">
                      Chọn file
                    </Button>
                  </div> */}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 bg-[#D5B78F] text-white rounded-full w-full hover:scale-105  duration-500 mb-3"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Đang gửi...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send size={20} className="mr-2" />
                        Gửi Hồ Sơ
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-black" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Gửi Hồ Sơ Thành Công!
              </h3>
              <p className="text-gray-600 mb-4">
                Cảm ơn bạn đã ứng tuyển vị trí <strong>{jobData.title}</strong>.
                Chúng tôi sẽ xem xét hồ sơ và liên hệ với bạn trong thời gian
                sớm nhất.
              </p>
              <p className="text-sm text-gray-500">
                Cửa sổ này sẽ tự động đóng sau 3 giây...
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default function JobDetailStandalone() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: jobData.title,
        text: jobData.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Đã copy link vào clipboard!");
    }
  };

  return (
    <div className="bg-[#F1EDE6] font-calibri pt-[120px]">
      {/* Header */}
      <div className=" ">
        <div className="container mx-auto px-4 pt-4 ">
            <button className="inline-flex items-center text-black mb-4 hover:text-primary duration-500">
              <ArrowLeft size={20} className="mr-2 text-black" />
              Quay lại danh sách tuyển dụng
            </button>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-6 bg-[#F1EDE6]  ">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-xl bg-[#F5F5F3] p-3">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                      {jobData.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge
                        variant="secondary"
                        className="bg-[#D5B78F] text-white"
                      >
                        {jobData.department}
                      </Badge>
                      {jobData.urgent && (
                        <Badge className="bg-red-500 hover:bg-red-600 animate-pulse">
                          🔥 Tuyển gấp
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-black bg-white">
                        Đăng {jobData.posted}
                      </Badge>
                    </div>
                  </div>
                  {/*  */}
                </div>
                <div className="grid grid-cols-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin
                      size={16}
                      className="mr-2 text-black flex-shrink-0"
                    />
                    <span className="text-gray-600">{jobData.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock
                      size={16}
                      className="mr-2 text-black flex-shrink-0"
                    />
                    <span className="text-gray-600">{jobData.type}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign
                      size={16}
                      className="mr-2 text-black 0 flex-shrink-0"
                    />
                    <span className="text-gray-600">{jobData.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase
                      size={16}
                      className="mr-2 text-black flex-shrink-0"
                    />
                    <span className="text-gray-600">{jobData.experience}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 pt-3">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-black" />
                    <span>Hạn nộp hồ sơ: {jobData.deadline}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <Eye size={16} className="mr-1 text-black" />
                      <span>{jobData.views} lượt xem</span>
                    </div>
                    <div className="flex items-center">
                      <Heart size={16} className="mr-1 text-black" />
                      <span>{jobData.applications} ứng viên</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Job Description */}
            <Card className="bborder-0 shadow-xl bg-[#F5F5F3] p-3">
              <CardHeader>
                <CardTitle className="flex items-center pb-3">
                  <Lightbulb className="mr-2 text-black" size={20} />
                  Mô Tả Công Việc
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {jobData.description}
                </p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card className="border-0 shadow-xl bg-[#F5F5F3] p-3">
              <CardHeader>
                <CardTitle className="flex items-center pb-3">
                  <Target className="mr-2 text-black" size={20} />
                  Trách Nhiệm Công Việc
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {jobData.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle
                        size={16}
                        className="mr-3 text-black mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="border-0 shadow-xl bg-[#F5F5F3] p-3">
              <CardHeader>
                <CardTitle className="flex items-center pb-3">
                  <Star className="mr-2 text-black" size={20} />
                  Yêu Cầu Ứng Viên
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {jobData.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-black rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="border-0 shadow-xl bg-[#F5F5F3] p-3">
              <CardHeader>
                <CardTitle className="flex items-center pb-3">
                  <Award className="mr-2 text-black" size={20} />
                  Quyền Lợi & Phúc Lợi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-1 gap-3">
                  {jobData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <TrendingUp
                        size={16}
                        className="mr-3 text-black mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Working Conditions */}
            <Card className="border-0 shadow-xl bg-[#F5F5F3] p-3">
              <CardHeader>
                <CardTitle className="flex items-center pb-3">
                  <Building className="mr-2 text-black" size={20} />
                  Điều Kiện Làm Việc
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {jobData.workingConditions.map((condition, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-black rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{condition}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Button */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 bg-[#D5B78F] text-white rounded-full w-full hover:scale-105  duration-500"
                >
                  <Send size={20} className="mr-2" />
                  Ứng Tuyển Ngay
                </Button>
                <p className="text-sm text-gray-600 text-center mb-4">
                  Hạn nộp hồ sơ:{" "}
                  <span className="font-semibold text-red-600">
                    {jobData.deadline}
                  </span>
                </p>
                <div className="text-xs text-gray-500 text-center space-y-1">
                  <div className="flex justify-between">
                    <span>Lượt xem:</span>
                    <span className="font-medium">{jobData.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ứng viên:</span>
                    <span className="font-medium">{jobData.applications}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card className="border-0 shadow-xl bg-[#F5F5F3] p-3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 text-black" size={20} />
                  Thông Tin Công Ty
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-900">
                    {jobData.companyInfo.name}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users size={14} className="mr-2 text-black" />
                  <span>{jobData.companyInfo.size}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase size={14} className="mr-2 text-black" />
                  <span>{jobData.companyInfo.industry}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={14} className="mr-2 text-black" />
                  <span>Thành lập: {jobData.companyInfo.founded}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-2 text-black" />
                  <span className="text-xs">{jobData.companyInfo.address}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {jobData.companyInfo.description}
                </p>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className=" border-0 shadow-xl bg-[#F5F5F3] p-3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 text-black" size={20} />
                  Thông Tin Liên Hệ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-900">
                    {jobData.contactInfo.recruiter}
                  </p>
                  <p className="text-sm text-gray-600">
                    {jobData.contactInfo.position}
                  </p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={14} className="mr-2 text-black" />
                  <span>{jobData.contactInfo.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail size={14} className="mr-2 text-black" />
                  <span>{jobData.contactInfo.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={14} className="mr-2 text-black" />
                  <span>{jobData.contactInfo.workingHours}</span>
                </div>
                {/* <Separator /> */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="px-4 bg-[#D5B78F] text-white rounded-full w-full hover:scale-105  duration-500">
                    <Phone size={14} className="mr-1 text-white" />
                    Gọi
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="border-0 shadow-xl bg-[#F5F5F3] p-3">
              <CardHeader>
                <CardTitle className="flex items-center text-black pb-3">
                  <Lightbulb className="mr-2 text-black" size={20} />
                  Gợi Ý Ứng Tuyển
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start">
                  <CheckCircle
                    size={14}
                    className="mr-2 text-black mt-0.5 flex-shrink-0"
                  />
                  <span>Chuẩn bị CV chi tiết với kinh nghiệm liên quan</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle
                    size={14}
                    className="mr-2 text-black mt-0.5 flex-shrink-0"
                  />
                  <span>Viết thư xin việc thể hiện động lực</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle
                    size={14}
                    className="mr-2 text-black mt-0.5 flex-shrink-0"
                  />
                  <span>Nộp hồ sơ sớm để tăng cơ hội được xem xét</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle
                    size={14}
                    className="mr-2 text-black mt-0.5 flex-shrink-0"
                  />
                  <span>Chuẩn bị portfolio các dự án đã thực hiện</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
