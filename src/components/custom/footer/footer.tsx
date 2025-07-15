import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'
import NewslettersDark from '../newsletters/newsletters-dark'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold tracking-widest mb-6 text-primary">
              NGUYÊN THỐNG JP
            </h3>
            <p className="text-gray-400 mb-6">
              Trang website chính thức của Công ty TNHH MTV NGUYÊN THỐNG JP
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/nguyenthongjpconstruction"
                className="text-gray-400 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-6">Danh mục</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/du-an" className="text-gray-400 hover:text-white">
                  Các dự án triển khai
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Tin tức & Sự kiện
                </Link>
              </li>
              <li>
                <Link
                  href="/lien-he"
                  className="text-gray-400 hover:text-white"
                >
                  Thông tin liên hệ
                </Link>
              </li>
              <li>
                <Link
                  href="/tuyen-dung"
                  className="text-gray-400 hover:text-white"
                >
                  Thông tin tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-medium mb-6">Liên hệ với chúng tôi</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-primary" />
                <Link href="tel:0912842727" className="text-gray-400">
                  0912842727
                </Link>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0 text-primary" />
                <span className="text-gray-400">info@nguyenthongjp.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-primary" />
                <div>
                  <p className="text-gray-400">
                    Trụ sở chính: 119 Lê Ấm, P. Hoà Xuân, TP. Đà Nẵng
                  </p>
                  <p className="block mt-1 text-gray-400">
                    Chi nhánh: 58A Nguyễn Thành Hãn, P. Hoà Cường, TP. Đà Nẵng
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <NewslettersDark />
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} NguyenthongJP Ltd. All rights
              reserved.
            </p>
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              Designed by {''}
              <Link
                href="https://www.lemstech.com"
                className="text-white hover:text-[#d5b78f]"
              >
                {' '}
                Lems tech
              </Link>
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Terms & Conditions
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
