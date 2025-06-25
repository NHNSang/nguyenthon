'use client'
import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const images = [
  {
    src: 'https://aqua-pigeon-769011.hostingersite.com/wp-content/uploads/2025/06/494738081_2448967692124256_2050038420089772221_n.jpg',
    alt: 'Định vị thương hiệu',
    title: 'Kiến Tạo Không Gian – Nâng Tầm Giá Trị Sống',
    description: 'Chúng tôi đồng hành cùng bạn trong hành trình xây dựng tổ ấm bền vững và tinh tế'
  },
  {
    src: 'https://aqua-pigeon-769011.hostingersite.com/wp-content/uploads/2025/06/494183796_2448964915457867_6537993737425744723_n.jpg',
    alt: 'Dịch vụ trọn gói',
    title: 'Thiết Kế & Thi Công Trọn Gói – Tiện Lợi, Chuyên Nghiệp',
    description: 'Từ ý tưởng đến thực tế – tất cả đều được thực hiện chỉ trong một quy trình khép kín, minh bạch.'
  },
  {
    src: 'https://aqua-pigeon-769011.hostingersite.com/wp-content/uploads/2025/06/494138949_2448964928791199_2030276574775910701_n.jpg',
    alt: 'Chất lượng & kỹ thuật',
    title: 'Vững Kỹ Thuật – Bền Công Trình',
    description: 'Chúng tôi đặt chất lượng lên hàng đầu, cam kết thi công đúng tiêu chuẩn, đúng tiến độ'
  },
  {
    src: 'https://aqua-pigeon-769011.hostingersite.com/wp-content/uploads/2025/06/494225417_2449347278752964_5546362461091261188_n.jpg',
    alt: 'Uy tín & niềm tin',
    title: 'Hàng Trăm Khách Hàng – Một Niềm Tin',
    description: 'Chúng tôi tự hào là lựa chọn của nhiều gia chủ, doanh nghiệp và đối tác trong suốt những năm qua.'
  }
]

export function ArchitectureCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full h-[850px] overflow-hidden rounded-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover"
            width={1000}
            height={1000}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-light mb-2"
              >
                {images[currentIndex].title}
              </motion.h3>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg"
              >
                {images[currentIndex].description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
} 