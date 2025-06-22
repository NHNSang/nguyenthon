"use client"

import type React from "react"

import type { valuesComponent } from "@/types/typeForWordpressData"
import { Check } from "lucide-react"
import { JetBrains_Mono } from "next/font/google"
import { motion, useInView, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"

// const font = JetBrains_Mono({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// })

interface ValuesSectionProps {
  valuesComponent: valuesComponent
}

const ValuesSection: React.FC<ValuesSectionProps> = ({ valuesComponent }) => {
  // Ref cho section
  const sectionRef = useRef<HTMLElement>(null)

  // Kiểm tra khi nào section hiển thị 1/3 trong viewport
  // const isInView = useInView(sectionRef, { amount: 0.33, once: true })
  // Kiểm tra khi nào section hiển thị 70% trong viewport
  const isInView = useInView(sectionRef, { amount: 0.5, once: true })

  // Animation controls
  const controls = useAnimation()

  // data seeding
  const defaultValues = [
    {
      label: "Kinh nghiệm dày dặn khoa học",
      description: "Hơn một thập kỷ hoạt động trong lĩnh vực thiết kế nội thất.",
    },
    {
      label: "Đội ngũ chuyên nghiệp",
      description: "Kiến trúc sư tài năng, giàu sáng tạo và tận tâm",
    },
    {
      label: "Thiết kế cá nhân hóa",
      description: "Phù hợp với phong cách và nhu cầu riêng của từng khách hàng.",
    },
    {
      label: "Chất lượng vượt trội",
      description: "Sử dụng vật liệu cao cấp, bền đẹp theo thời gian.",
    },
    {
      label: "Dịch vụ trọn gói",
      description: "Từ tư vấn, thiết kế đến thi công, đảm bảo tiến độ và chất lượng",
    },
    {
      label: "Giá cả hợp lý",
      description: "Minh bạch, cạnh tranh, mang lại giá trị tối ưu cho khách hàng.",
    },
  ]

  const { introduction, values } = valuesComponent

  // transform valuesComponent from object to values Array
  const valuesArray =
    Object.values(values).filter((value) => value.label !== null && value.description !== null) || defaultValues

  // Tự động scroll khi component hiển thị 1/3
  // useEffect(() => {
  //   if (isInView && sectionRef.current) {
  //     // Lấy vị trí của section
  //     const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY
  //     console.log(sectionTop,"sectionTop")
  //     // Scroll đến vị trí của section
  //     window.scrollTo({
  //       top: sectionTop,
  //       behavior: "smooth",
  //     })

  //     // Kích hoạt animation cho các items
  //     controls.start("visible")
  //   }
  // }, [isInView, controls])

  
  // Tự động scroll khi component hiển thị 70%
  useEffect(() => {
  if (isInView) {
    controls.start("visible")
  }
  }, [isInView, controls])

  // Variants cho container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  // Variants cho từng item
  const itemVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section ref={sectionRef} className="py-12 h-fit md:h-[600px] lg:h-[calc(100vh-100px)] xl:h-fit flex flex-col items-center justify-center bg-[#f5f5f3]">
      <div className="container max-w-6xl mx-auto px-4 h-full flex flex-col">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          // chỉ xảy ra một lần, không lặp lại 
          
          
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">Giá trị cốt lỗi</h2>
          <p className="text-gray-600 text-lg line-clamp-3">Trung thực – Sáng tạo – Tận tâm – Kỷ luật – Yêu thương là những giá trị cốt lõi mà Nguyên Thống Construction gầy dựng cho đội ngũ. Vì chúng tôi tin rằng, khi sở hữu những giá trị này thì chúng tôi sẽ thành công trong mọi sản phẩm, dịch vụ và tự tin mang đến điều tốt nhất cho khách hàng. Trung thực, tận tâm trong thương thảo, sáng tạo trong mọi sản phẩm, yêu thương và coi công trình của khách hàng như của chính mình. Và kỷ luật để kịp tiến độ dù trong bất cứ hoàn cảnh nào.</p>
        </motion.div>

        {/* <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {valuesArray.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              className="flex items-start p-6 bg-[#f1ede6] rounded-lg cursor-pointer shadow-xl group"
            >
              <div className="bg-primary rounded-full p-2 mr-4 flex-shrink-0">
                <Check className="h-5 w-5 text-white" />
              </div>
              <div className="group-hover:translate-x-2 duration-500">
                <h3 className="text-xl font-medium mb-2">{value.label}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div> */}


        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {defaultValues.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              className="flex items-start p-6 bg-[#f1ede6] rounded-lg cursor-pointer shadow-xl group"
            >
              <div className="bg-primary rounded-full p-2 mr-4 flex-shrink-0">
                <Check className="h-5 w-5 text-white" />
              </div>
              <div className="group-hover:translate-x-2 duration-500">
                <h3 className="text-xl font-medium mb-2">{value.label}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ValuesSection
