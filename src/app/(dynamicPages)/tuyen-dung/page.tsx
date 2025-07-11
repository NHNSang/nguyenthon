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
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Coffee,
  Car,
  Shield,
  TrendingUp,
  Award,
  Send,
  Upload,
  CheckCircle,
  X,
  Users,
  Building,
  Calendar,
  Star,
  Search,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Dữ liệu các vị trí tuyển dụng
const jobPositions = [
  {
    id: 1,
    title: "Kỹ Sư Xây Dựng Dân Dụng",
    department: "Kỹ Thuật",
    location: "Hà Nội",
    type: "Toàn thời gian",
    salary: "15-25 triệu",
    experience: "2-5 năm",
    description:
      "Tham gia thiết kế, giám sát thi công các dự án xây dựng dân dụng và công nghiệp. Yêu cầu có kinh nghiệm về AutoCAD, Revit và các phần mềm thiết kế chuyên ngành.",
    requirements: [
      "Tốt nghiệp Đại học chuyên ngành Xây dựng Dân dụng",
      "Có kinh nghiệm 2-5 năm trong lĩnh vực xây dựng",
      "Thành thạo AutoCAD, Revit, MS Office",
      "Có khả năng đọc hiểu bản vẽ kỹ thuật",
      "Kỹ năng giao tiếp tốt, làm việc nhóm hiệu quả",
      "Có thể đi công tác theo dự án",
    ],
    benefits: [
      "Lương cạnh tranh + thưởng dự án",
      "Bảo hiểm đầy đủ",
      "Đào tạo chuyên môn",
      "Cơ hội thăng tiến",
    ],
    urgent: true,
    posted: "2 ngày trước",
  },
  {
    id: 2,
    title: "Kiến Trúc Sư Thiết Kế",
    department: "Thiết Kế",
    location: "TP.HCM",
    type: "Toàn thời gian",
    salary: "20-35 triệu",
    experience: "3-7 năm",
    description:
      "Thiết kế kiến trúc các công trình dân dụng, thương mại, resort. Phối hợp với team kỹ thuật để hoàn thiện dự án từ ý tưởng đến triển khai.",
    requirements: [
      "Tốt nghiệp Đại học Kiến trúc",
      "Kinh nghiệm 3-7 năm thiết kế kiến trúc",
      "Thành thạo SketchUp, 3ds Max, Photoshop, AutoCAD",
      "Có tư duy sáng tạo, thẩm mỹ cao",
      "Khả năng thuyết trình, trình bày ý tưởng tốt",
      "Có portfolio các dự án đã thực hiện",
    ],
    benefits: [
      "Lương cao + bonus",
      "Môi trường sáng tạo",
      "Dự án đa dạng",
      "Team building thường xuyên",
    ],
    urgent: false,
    posted: "1 tuần trước",
  },
  {
    id: 3,
    title: "Trưởng Phòng Kinh Doanh",
    department: "Kinh Doanh",
    location: "Hà Nội",
    type: "Toàn thời gian",
    salary: "25-40 triệu",
    experience: "5+ năm",
    description:
      "Quản lý đội ngũ kinh doanh, phát triển thị trường, tìm kiếm khách hàng mới và duy trì mối quan hệ với khách hàng cũ. Xây dựng chiến lược kinh doanh cho công ty.",
    requirements: [
      "Tốt nghiệp Đại học các ngành Kinh tế, Quản trị",
      "Kinh nghiệm 5+ năm quản lý kinh doanh",
      "Kỹ năng lãnh đạo, quản lý team xuất sắc",
      "Mạng lưới quan hệ rộng trong ngành xây dựng",
      "Kỹ năng đàm phán, thuyết phục tốt",
      "Có kinh nghiệm làm việc với khách hàng doanh nghiệp",
    ],
    benefits: [
      "Lương + Hoa hồng hấp dẫn",
      "Xe công ty",
      "Du lịch hàng năm",
      "Thưởng KPI cao",
    ],
    urgent: true,
    posted: "3 ngày trước",
  },
  {
    id: 4,
    title: "Nhân Viên Kế Toán Tổng Hợp",
    department: "Tài Chính",
    location: "Hà Nội",
    type: "Toàn thời gian",
    salary: "8-15 triệu",
    experience: "1-3 năm",
    description:
      "Thực hiện các công việc kế toán tổng hợp, lập báo cáo tài chính, theo dõi công nợ khách hàng, hỗ trợ công tác thuế và kiểm toán.",
    requirements: [
      "Tốt nghiệp Đại học Kế toán, Tài chính",
      "Có kinh nghiệm 1-3 năm làm kế toán tổng hợp",
      "Thành thạo Excel, phần mềm kế toán MISA/FAST",
      "Tỉ mỉ, cẩn thận, trung thực trong công việc",
      "Có chứng chỉ kế toán trưởng là lợi thế",
      "Khả năng làm việc độc lập và theo nhóm",
    ],
    benefits: [
      "Lương ổn định",
      "Môi trường chuyên nghiệp",
      "Đào tạo nghiệp vụ",
      "Thưởng lễ tết",
    ],
    urgent: false,
    posted: "5 ngày trước",
  },
  {
    id: 5,
    title: "Thực Tập Sinh Kỹ Thuật",
    department: "Kỹ Thuật",
    location: "Hà Nội/TP.HCM",
    type: "Thực tập",
    salary: "3-5 triệu",
    experience: "Sinh viên",
    description:
      "Hỗ trợ các kỹ sư trong việc thiết kế, vẽ bản vẽ kỹ thuật, tham gia khảo sát thực địa các dự án. Cơ hội học hỏi kinh nghiệm thực tế từ các chuyên gia.",
    requirements: [
      "Sinh viên năm 3, 4 ngành Xây dựng, Kiến trúc",
      "Có kiến thức cơ bản về AutoCAD, SketchUp",
      "Ham học hỏi, nhiệt tình, có trách nhiệm",
      "Có thể làm việc full-time tối thiểu 3 tháng",
      "Ưu tiên sinh viên có điểm số tốt",
      "Có khả năng giao tiếp tốt",
    ],
    benefits: [
      "Trợ cấp thực tập",
      "Mentor 1-1",
      "Cơ hội full-time",
      "Chứng nhận thực tập",
    ],
    urgent: false,
    posted: "1 ngày trước",
  },
  {
    id: 6,
    title: "Giám Đốc Dự Án",
    department: "Quản Lý",
    location: "Hà Nội",
    type: "Toàn thời gian",
    salary: "35-50 triệu",
    experience: "7+ năm",
    description:
      "Quản lý toàn bộ dự án từ khởi động đến hoàn thành, điều phối các bộ phận, đảm bảo tiến độ, chất lượng và ngân sách dự án.",
    requirements: [
      "Tốt nghiệp Đại học chuyên ngành liên quan",
      "Kinh nghiệm 7+ năm quản lý dự án xây dựng",
      "Có chứng chỉ PMP hoặc tương đương",
      "Kỹ năng lãnh đạo và quản lý team mạnh",
      "Khả năng làm việc dưới áp lực cao",
      "Thành thạo MS Project, Primavera",
    ],
    benefits: [
      "Lương cao + thưởng dự án",
      "Quyền quyết định cao",
      "Cơ hội phát triển",
      "Đãi ngộ đặc biệt",
    ],
    urgent: true,
    posted: "4 ngày trước",
  },
];

// Component form ứng tuyển
function ApplicationModal({
  job,
  isOpen,
  onClose,
}: {
  job: any;
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

    // Simulate API call
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <Card className="relative bg-white shadow-2xl border-0 font-calibri max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X size={24} />
          </button>

          {!isSuccess ? (
            <>
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Ứng Tuyển: {job.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Điền thông tin của bạn để ứng tuyển vị trí này
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">Tải lên CV của bạn</p>
                    <p className="text-sm text-gray-500">
                      PDF, DOC, DOCX (tối đa 5MB)
                    </p>
                    <Button type="button" variant="outline" className="mt-2">
                      Chọn file
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
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
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Gửi Hồ Sơ Thành Công!
              </h3>
              <p className="text-gray-600 mb-4">
                Cảm ơn bạn đã ứng tuyển vị trí <strong>{job.title}</strong>.
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

export default function RecruitmentPage() {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const departments = [
    "all",
    "Kỹ Thuật",
    "Thiết Kế",
    "Kinh Doanh",
    "Tài Chính",
    "Quản Lý",
  ];

  const filteredJobs = jobPositions.filter((job) => {
    const matchesDepartment =
      filterDepartment === "all" || job.department === filterDepartment;
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const handleApply = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <div className=" bg-[#F1EDE6] font-calibri pt-[120px]">
      <div className="container mx-auto">
        <div className="w-full m-8 flex flex-col lg:w-[85%] mx-auto items-center justify-center ">
          <div
            className="
        items-center justify-center mx-auto
        flex flex-col w-12/12 md:w-9/12 gap-1"
          >
            <h2 className="bg-[#D5B78F] w-full py-1 text-center text-3xl md:text-2xl font-[300px] rounded-t-lg uppercase">
              Vị Trí Đang Tuyển Dụng
            </h2>
            <p className="bg-[#F5F5F3] w-full  py-1  text-gray-600 text-lg  line-clamp-2  shadow-xl text-center">
              Khám phá các cơ hội nghề nghiệp hấp dẫn và tìm kiếm vị trí phù hợp
              với năng lực của bạn
            </p>
          </div>
        </div>
      </div>

      {/* Job Positions */}
      <section className="">
        <div className="container mx-auto px-4">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {departments.map((dept) => (
              <Button
                key={dept}
                onClick={() => setFilterDepartment(dept)}
                className={cn(
                  "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                  filterDepartment === dept
                    ? " bg-white text-black border border-primary font-bold shadow-md"
                    : "bg-primary text-white"
                )}
              >
                {dept === "all" ? "Tất cả" : dept}
              </Button>
            ))}
          </div>

          {/* Results count */}
          <div className="text-center mb-4">
            <p className="text-gray-600">
              Tìm thấy{" "}
              <span className="font-semibold text-black">
                {filteredJobs.length}
              </span>{" "}
              vị trí phù hợp
            </p>
          </div>

          {/* Jobs Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="border-0 shadow-xl bg-[#F5F5F3] p-3"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-black mb-2   ">
                        {job.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge
                          variant="secondary"
                          className="bg-[#D5B78F] text-white"
                        >
                          {job.department}
                        </Badge>
                        {job.urgent && (
                          <Badge className="bg-red-500 hover:bg-red-600 animate-pulse">
                            🔥 Tuyển gấp
                          </Badge>
                        )}
                        <Badge
                          variant="outline"
                          className="text-black bg-white"
                        >
                          {job.posted}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin
                        size={16}
                        className="mr-2 text-black flex-shrink-0"
                      />
                      <span className="text-gray-600">{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock
                        size={16}
                        className="mr-2 text-black flex-shrink-0"
                      />
                      <span className="text-gray-600">{job.type}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign
                        size={16}
                        className="mr-2 text-black 0 flex-shrink-0"
                      />
                      <span className="text-gray-600">{job.salary}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase
                        size={16}
                        className="mr-2 text-black flex-shrink-0"
                      />
                      <span className="text-gray-600">{job.experience}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <CheckCircle size={16} className="mr-2 text-black" />
                      Yêu cầu chính:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {job.requirements
                        .slice(0, 3)
                        .map((req: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-black rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            <span>{req}</span>
                          </li>
                        ))}
                      {job.requirements.length > 3 && (
                        <li className="text-gray-600 italic text-sm font-medium ml-4">
                          +{job.requirements.length - 3} yêu cầu khác...
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Award size={16} className="mr-2 text-black" />
                      Phúc lợi:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.map((benefit: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-white text-black border-[#D5B78F]"
                        >
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {/* <Button
                      onClick={() => handleApply(job)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    >
                      <Send size={16} className="mr-2" />
                      Ứng Tuyển Ngay
                    </Button> */}

                    {/* <Link href="/tuyen-dung-id" className="w-full">
                      <Button className="px-4 bg-[#D5B78F]  text-white rounded-full w-full hover:scale-105  duration-500">
                        Xem Chi Tiết
                      </Button>
                    </Link> */}
                    <Link
                      href="https://zalo.me/0123456789"
                      target="_blank"
                      className="w-full"
                    >
                      <Button className="px-4 bg-[#D5B78F] text-white rounded-full w-full hover:scale-105 duration-500">
                        Liên hệ với chúng tôi 
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Không tìm thấy vị trí phù hợp
              </h3>
              <p className="text-gray-600 mb-4">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setFilterDepartment("all");
                }}
              >
                Xem tất cả vị trí
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 bg-[#F1EDE6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Tại Sao Chọn NguyenThong JP
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi cam kết tạo ra môi trường làm việc tốt nhất để nhân viên
              phát triển và thành công
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-[#F5F5F3] shadow-xl rounded-xl">
              <div className="w-16 h-16 bg-[#D4B38B] rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black ">
                Cơ Hội Thăng Tiến
              </h3>
              <p className="text-gray-600">
                Chính sách thăng tiến rõ ràng, đào tạo chuyên môn thường xuyên
                và cơ hội phát triển không giới hạn
              </p>
            </div>

            <div className="text-center p-6 bg-[#F5F5F3] shadow-xl rounded-xl">
              <div className="w-16 h-16 bg-[#D4B38B] rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black ">
                Lương Thưởng Hấp Dẫn
              </h3>
              <p className="text-gray-600">
                Mức lương cạnh tranh, thưởng theo hiệu quả công việc và các
                khoản phụ cấp đặc biệt
              </p>
            </div>

            <div className="text-center p-6 bg-[#F5F5F3] shadow-xl rounded-xl">
              <div className="w-16 h-16 bg-[#D4B38B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black ">
                Bảo Hiểm Toàn Diện
              </h3>
              <p className="text-gray-600">
                Bảo hiểm xã hội, y tế, tai nạn 24/7 và gói bảo hiểm sức khỏe cao
                cấp
              </p>
            </div>

            <div className="text-center p-6 bg-[#F5F5F3] shadow-xl rounded-xl">
              <div className="w-16 h-16 bg-[#D4B38B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black ">
                Môi Trường Thân Thiện
              </h3>
              <p className="text-gray-600">
                Văn hóa công ty tích cực, đồng nghiệp hỗ trợ và không gian làm
                việc hiện đại
              </p>
            </div>

            <div className="text-center p-6 bg-[#F5F5F3] shadow-xl rounded-xl">
              <div className="w-16 h-16 bg-[#D4B38B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black ">
                Phúc Lợi Đa Dạng
              </h3>
              <p className="text-gray-600">
                Du lịch hàng năm, xe đưa đón, hỗ trợ ăn trưa và nhiều hoạt động
                giải trí
              </p>
            </div>

            <div className="text-center p-6 bg-[#F5F5F3] shadow-xl rounded-xl">
              <div className="w-16 h-16 bg-[#D4B38B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black ">
                Ghi Nhận Thành Tích
              </h3>
              <p className="text-gray-600">
                Chương trình khen thưởng, vinh danh nhân viên xuất sắc và bonus
                đặc biệt
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <ApplicationModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
