"use client"

import React, { useState, useEffect } from "react"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
} from "lucide-react"
import Link from "next/link"

// Dữ liệu chi tiết các vị trí tuyển dụng
const jobDetails = {
  "1": {
    id: 1,
    title: "Kỹ Sư Xây Dựng Dân Dụng",
    department: "Kỹ Thuật",
    location: "Hà Nội",
    type: "Toàn thời gian",
    salary: "15-25 triệu",
    experience: "2-5 năm",
    posted: "2 ngày trước",
    deadline: "30/01/2024",
    urgent: true,
    description:
      "Chúng tôi đang tìm kiếm một Kỹ Sư Xây Dựng Dân Dụng có kinh nghiệm để tham gia vào các dự án xây dựng quy mô lớn. Bạn sẽ chịu trách nhiệm thiết kế, giám sát thi công và đảm bảo chất lượng các công trình dân dụng và công nghiệp.",
    responsibilities: [
      "Thiết kế và tính toán kết cấu các công trình dân dụng",
      "Giám sát thi công và kiểm tra chất lượng công trình",
      "Lập báo cáo tiến độ và chất lượng dự án",
      "Phối hợp với các bộ phận khác để đảm bảo tiến độ",
      "Tham gia khảo sát thực địa và đánh giá hiện trạng",
      "Hỗ trợ giải quyết các vấn đề kỹ thuật phát sinh",
      "Đảm bảo tuân thủ các quy chuẩn xây dựng và an toàn lao động",
    ],
    requirements: [
      "Tốt nghiệp Đại học chuyên ngành Xây dựng Dân dụng",
      "Có kinh nghiệm 2-5 năm trong lĩnh vực xây dựng",
      "Thành thạo AutoCAD, Revit, MS Office",
      "Có khả năng đọc hiểu bản vẽ kỹ thuật",
      "Kỹ năng giao tiếp tốt, làm việc nhóm hiệu quả",
      "Có thể đi công tác theo dự án",
      "Có chứng chỉ hành nghề xây dựng là lợi thế",
      "Khả năng làm việc dưới áp lực và deadline",
    ],
    benefits: [
      "Lương cạnh tranh từ 15-25 triệu + thưởng dự án",
      "Bảo hiểm xã hội, y tế, tai nạn 24/7",
      "Thưởng lễ tết, 13th month salary",
      "Đào tạo chuyên môn thường xuyên",
      "Cơ hội thăng tiến rõ ràng",
      "Môi trường làm việc chuyên nghiệp",
      "Team building, du lịch hàng năm",
      "Hỗ trợ ăn trưa và xe đưa đón",
    ],
    workingConditions: [
      "Thời gian làm việc: 8:00 - 17:30, thứ 2 - thứ 6",
      "Địa điểm: Văn phòng tại Hà Nội + công trình",
      "Môi trường: Văn phòng hiện đại, trang thiết bị đầy đủ",
      "Đồng nghiệp: Team trẻ, năng động, hỗ trợ lẫn nhau",
    ],
    companyInfo: {
      name: "BuildPro Construction",
      size: "500+ nhân viên",
      industry: "Xây dựng & Kiến trúc",
      founded: "2008",
      website: "www.buildpro.vn",
    },
    contactInfo: {
      recruiter: "Ms. Nguyễn Thị Lan",
      phone: "024.3456.7890",
      email: "tuyendung@buildpro.vn",
    },
    relatedJobs: [2, 5],
  },
  "2": {
    id: 2,
    title: "Kiến Trúc Sư Thiết Kế",
    department: "Thiết Kế",
    location: "TP.HCM",
    type: "Toàn thời gian",
    salary: "20-35 triệu",
    experience: "3-7 năm",
    posted: "1 tuần trước",
    deadline: "15/02/2024",
    urgent: false,
    description:
      "Vị trí Kiến Trúc Sư Thiết Kế tại văn phòng TP.HCM, chuyên thiết kế các công trình dân dụng, thương mại và resort cao cấp. Cơ hội làm việc với các dự án đa dạng và team thiết kế chuyên nghiệp.",
    responsibilities: [
      "Thiết kế kiến trúc các công trình dân dụng, thương mại",
      "Phát triển ý tưởng thiết kế từ concept đến bản vẽ thi công",
      "Phối hợp với team kỹ thuật để hoàn thiện dự án",
      "Tham gia thuyết trình ý tưởng với khách hàng",
      "Giám sát và hỗ trợ quá trình thi công",
      "Nghiên cứu xu hướng thiết kế mới",
      "Tạo ra các bản vẽ 3D và presentation materials",
    ],
    requirements: [
      "Tốt nghiệp Đại học Kiến trúc",
      "Kinh nghiệm 3-7 năm thiết kế kiến trúc",
      "Thành thạo SketchUp, 3ds Max, Photoshop, AutoCAD",
      "Có tư duy sáng tạo, thẩm mỹ cao",
      "Khả năng thuyết trình, trình bày ý tưởng tốt",
      "Có portfolio các dự án đã thực hiện",
      "Kỹ năng làm việc nhóm và giao tiếp tốt",
      "Có kinh nghiệm với dự án resort, khách sạn là lợi thế",
    ],
    benefits: [
      "Lương cao từ 20-35 triệu + bonus theo dự án",
      "Môi trường sáng tạo, không gian làm việc đẹp",
      "Được làm việc với các dự án đa dạng và thú vị",
      "Team building thường xuyên",
      "Cơ hội học hỏi từ các chuyên gia hàng đầu",
      "Bảo hiểm đầy đủ và phúc lợi tốt",
      "Cơ hội thăng tiến và phát triển sự nghiệp",
      "Hỗ trợ tham gia các khóa đào tạo chuyên môn",
    ],
    workingConditions: [
      "Thời gian làm việc linh hoạt: 8:30 - 17:30",
      "Văn phòng hiện đại tại quận 1, TP.HCM",
      "Trang thiết bị làm việc cao cấp",
      "Không gian sáng tạo, thoải mái",
    ],
    companyInfo: {
      name: "BuildPro Construction",
      size: "500+ nhân viên",
      industry: "Xây dựng & Kiến trúc",
      founded: "2008",
      website: "www.buildpro.vn",
    },
    contactInfo: {
      recruiter: "Mr. Trần Văn Nam",
      phone: "028.9876.5432",
      email: "tuyendung.hcm@buildpro.vn",
    },
    relatedJobs: [1, 3],
  },
  // Thêm các job khác...
}

// Component form ứng tuyển
function ApplicationModal({ job, isOpen, onClose }: { job: any; isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    setTimeout(() => {
      onClose()
      setIsSuccess(false)
      setFormData({ name: "", email: "", phone: "", experience: "", coverLetter: "" })
    }, 3000)
  }

  if (!isOpen) return null

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
                <CardTitle className="text-2xl font-bold text-gray-900">Ứng Tuyển: {job?.title}</CardTitle>
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
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nhập họ và tên"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Nhập địa chỉ email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Kinh nghiệm làm việc</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="Mô tả ngắn gọn về kinh nghiệm làm việc của bạn"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Thư xin việc</Label>
                    <Textarea
                      id="coverLetter"
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      placeholder="Viết vài dòng về lý do bạn muốn ứng tuyển vị trí này"
                      rows={4}
                    />
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">Tải lên CV của bạn</p>
                    <p className="text-sm text-gray-500">PDF, DOC, DOCX (tối đa 5MB)</p>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Gửi Hồ Sơ Thành Công!</h3>
              <p className="text-gray-600 mb-4">
                Cảm ơn bạn đã ứng tuyển vị trí <strong>{job?.title}</strong>. Chúng tôi sẽ xem xét hồ sơ và liên hệ với
                bạn trong thời gian sớm nhất.
              </p>
              <p className="text-sm text-gray-500">Cửa sổ này sẽ tự động đóng sau 3 giây...</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function JobDetailPage({ params }: PageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [jobId, setJobId] = useState<string>("")
  const [job, setJob] = useState<any>(null)

  // Sử dụng useEffect để resolve params
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      const slug = resolvedParams.slug
      setJobId(slug)
      setJob(jobDetails[slug as keyof typeof jobDetails])
    }
    
    resolveParams()
  }, [params])

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 font-calibri flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy công việc</h1>
          <Link href="/tuyen-dung">
            <Button>Quay lại danh sách tuyển dụng</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: job.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Đã copy link vào clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-calibri">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/tuyen-dung" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft size={20} className="mr-2" />
            Quay lại danh sách tuyển dụng
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{job.title}</h1>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {job.department}
                      </Badge>
                      {job.urgent && <Badge className="bg-red-500 hover:bg-red-600 animate-pulse">🔥 Tuyển gấp</Badge>}
                      <Badge variant="outline" className="text-gray-600">
                        Đăng {job.posted}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsSaved(!isSaved)}
                      className={isSaved ? "text-yellow-600 border-yellow-600" : ""}
                    >
                      {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 size={16} />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2 text-blue-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2 text-green-500" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign size={16} className="mr-2 text-purple-500" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase size={16} className="mr-2 text-orange-500" />
                    <span>{job.experience}</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mt-4">
                  <Calendar size={16} className="mr-2 text-red-500" />
                  <span>Hạn nộp hồ sơ: {job.deadline}</span>
                </div>
              </CardHeader>
            </Card>

            {/* Job Description */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 text-yellow-500" size={20} />
                  Mô Tả Công Việc
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 text-blue-500" size={20} />
                  Trách Nhiệm Công Việc
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={16} className="mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 text-orange-500" size={20} />
                  Yêu Cầu Ứng Viên
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.requirements.map((requirement: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 text-purple-500" size={20} />
                  Quyền Lợi & Phúc Lợi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {job.benefits.map((benefit: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <TrendingUp size={16} className="mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Working Conditions */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 text-teal-500" size={20} />
                  Điều Kiện Làm Việc
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.workingConditions.map((condition: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg mb-4"
                >
                  <Send size={20} className="mr-2" />
                  Ứng Tuyển Ngay
                </Button>
                <p className="text-sm text-gray-600 text-center">
                  Hạn nộp hồ sơ: <span className="font-semibold text-red-600">{job.deadline}</span>
                </p>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 text-blue-500" size={20} />
                  Thông Tin Công Ty
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-900">{job.companyInfo.name}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users size={14} className="mr-2" />
                  <span>{job.companyInfo.size}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase size={14} className="mr-2" />
                  <span>{job.companyInfo.industry}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={14} className="mr-2" />
                  <span>Thành lập: {job.companyInfo.founded}</span>
                </div>
                {/* <Separator /> */}
                <Button variant="outline" className="w-full">
                  Xem Thông Tin Công Ty
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 text-green-500" size={20} />
                  Thông Tin Liên Hệ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-900">{job.contactInfo.recruiter}</p>
                  <p className="text-sm text-gray-600">Nhân viên tuyển dụng</p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={14} className="mr-2" />
                  <span>{job.contactInfo.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail size={14} className="mr-2" />
                  <span>{job.contactInfo.email}</span>
                </div>
              </CardContent>
            </Card>

            {/* Related Jobs */}
            {job.relatedJobs && job.relatedJobs.length > 0 && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="mr-2 text-purple-500" size={20} />
                    Việc Làm Liên Quan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {job.relatedJobs.map((relatedJobId: number) => {
                    const relatedJob = jobDetails[relatedJobId.toString() as keyof typeof jobDetails]
                    if (!relatedJob) return null
                    return (
                      <Link
                        key={relatedJobId}
                        href={`/tuyen-dung/${relatedJobId}`}
                        className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{relatedJob.title}</h4>
                        <p className="text-xs text-gray-600">
                          {relatedJob.location} • {relatedJob.salary}
                        </p>
                      </Link>
                    )
                  })}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal job={job} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
