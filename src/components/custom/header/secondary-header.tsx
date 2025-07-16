'use client'

import Logo from '@/components/custom/header/logo'
import { useWindowSize } from '@/hooks/useWindowSize'
import { MapPin, PhoneIcon } from 'lucide-react'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

const SecondaryHeader = () => {
  const { isMobile } = useWindowSize()

  const informationCompany = [
    {
      icon: <MapPin className="text-primary w-5 h-5" />,
      title: 'Địa Chỉ:',
      Content: <p>119 Lê Ấm, P. Hoà Xuân, TP. Đà Nẵng</p>,
    },
    {
      icon: <PhoneIcon className="w-5 h-5 text-primary" />,
      title: 'Hotline:',
      Content: <Link href="tel:0905 123 456">0912842727</Link>,
    },
  ]

  const socialLinks = [
    {
      icon: <FaFacebook />,
      link: 'https://facebook.com/nguyenthongjp',
      label: 'Facebook',
    },
    {
      icon: <FaInstagram />,
      link: 'https://instagram.com/nguyenthongjp',
      label: 'Instagram',
    },
    {
      icon: <FaLinkedin />,
      link: 'https://linkedin.com/company/nguyenthongjp',
      label: 'LinkedIn',
    },
  ]

  return (
    <>
      {isMobile ? null : (
        <div className="bg-white px-2 lg:px-10 py-2 lg:py-3">
          <div className="container mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Logo / Tên công ty */}
            <div>
              <p className="font-oswald text-lg lg:text-base font-extrabold text-black pl-4 tracking-[1px]">
                CÔNG TY TNHH MTV NGUYÊN THỐNG JP{' '}
              </p>
              <p className="font-oswald text-lg lg:text-base font-extrabold text-primary whitespace-nowrap pl-4 text-center tracking-[1px]">
                THIẾT KẾ - THI CÔNG XÂY DỰNG
              </p>
            </div>

            {/* Grid thông tin chỉ hiển thị ở màn lớn */}
            <div className="flex gap-6 ">
              {informationCompany.map((info, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 cursor-pointer"
                >
                  <div className="w-5 h-5">{info.icon}</div>

                  <div className="flex flex-col">
                    <span className="text-primary text-[14px] font-bold">
                      {info.title}
                    </span>
                    <span className="hover:text-primary text-[14px] font-semibold cursor-pointer">
                      {info.Content}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SecondaryHeader
