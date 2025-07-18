"use client";

import type React from "react";

import { useWindowSize } from "@/hooks/useWindowSize";
import type { valuesComponent } from "@/types/typeForWordpressData";
import { motion, useAnimation, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useRef } from "react";


interface ValuesSectionProps {
  valuesComponent: valuesComponent;
}

const ValuesSection: React.FC<ValuesSectionProps> = ({ valuesComponent }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.5, once: true });
  // Animation controls
  const controls = useAnimation();
  const { isMobile } = useWindowSize();
  const defaultValues = [
    {
      label: "Kinh nghiệm dày dặn",
      description:
        "Hơn một thập kỷ hoạt động trong lĩnh vực thiết kế nội thất.",
    },
    {
      label: "Đội ngũ chuyên nghiệp",
      description: "Kiến trúc sư tài năng, giàu sáng tạo và tận tâm trong công việc.",
    },
    {
      label: "Thiết kế cá nhân hóa",
      description:
        "Phù hợp với phong cách và nhu cầu riêng của từng khách hàng.",
    },
    {
      label: "Chất lượng vượt trội",
      description: "Sử dụng vật liệu cao cấp, chất lượng, bền bỉ với thời gian.",
    },
    {
      label: "Dịch vụ trọn gói",
      description:
        "Từ tư vấn, thiết kế đến thi công, đảm bảo tiến độ và chất lượng.",
    },
    {
      label: "Giá cả hợp lý",
      description:
        "Minh bạch, cạnh tranh, mang lại giá trị tối ưu cho khách hàng.",
    },
  ];
  const { introduction, values } = valuesComponent;
  // transform valuesComponent from object to values Array
  const valuesArray =
    Object.values(values).filter(
      (value) => value.label !== null && value.description !== null
    ) || defaultValues;

  // Tự động scroll khi component hiển thị 70%
  useEffect(() => {
    // Chỉ áp dụng animation trên desktop
    if (!isMobile && isInView) {
      controls.start("visible");
    }
  }, [isInView, controls, isMobile]);

  // Variants cho container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // Variants cho từng item
  // Nếu là mobile thì không dùng variants, trả về undefined
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
  };

  return (
    <section
      ref={sectionRef}
      className="py-[30px] lg:py-[110px] h-fit md:h-[600px] lg:h-[calc(100vh-100px)] xl:h-fit flex flex-col items-center justify-center bg-[#FFFAF4] bg-service-bg bg-center bg-no-repeat"
    >
      {/* // Trên mobile: sử dụng div thông thường, không có animation */}
      {isMobile ? (
        <div className="container max-w-6xl mx-auto h-full flex flex-col">
          <div className="max-w-4xl mx-auto text-center mb-4 lg:mb-8">
            <HeaderOfValuesSection />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 sm:px-6 md:px-0">
            {defaultValues.map((value, index) => (
              <div
                key={index}
                className="flex items-start p-4 sm:p-5 md:p-6 bg-white cursor-pointer shadow-md hover:shadow-xl group border border-primary transition-all duration-300"
              >
                <div className="bg-[#CA9C6A] p-2 mr-4 flex-shrink-0 shadow-lg">
                  <Check className="h-3 lg:h-5 w-3 lg:w-5 text-white" />
                </div>
                <div className="group-hover:translate-x-1 md:group-hover:translate-x-2 duration-500">
                  <h3 className="text-lg sm:text-lg md:text-xl font-semibold mb-1 uppercase">
                    {value.label}
                  </h3>
                  <p className="text-base sm:text-base text-[#5f5c5c] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      ) : (
        // Trên desktop: sử dụng motion.div với các animation
        <div className="container max-w-6xl mx-auto h-full flex flex-col">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-4 lg:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <HeaderOfValuesSection />
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 sm:px-6 md:px-0"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {defaultValues.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                className="flex items-start p-4 sm:p-5 md:p-6 bg-white cursor-pointer shadow-md hover:shadow-xl group border border-primary transition-all duration-300"
              >
                <div className="bg-[#CA9C6A] p-2 mr-4 flex-shrink-0 shadow-lg">
                  <Check className="h-3 lg:h-5 w-3 lg:w-5 text-white" />
                </div>
                <div className="group-hover:translate-x-1 md:group-hover:translate-x-2 duration-500">
                  <h3 className="text-lg sm:text-lg md:text-xl font-semibold mb-1 uppercase">
                    {value.label}
                  </h3>
                  <p className="text-base sm:text-base text-[#5f5c5c] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default ValuesSection;

const HeaderOfValuesSection = () => {
  return (
    <div>
      <h1 className="text-2xl md:text-[48px] mb-2 lg:mb-6 uppercase tracking-[5px] lg:tracking-[8px] font-semibold">
        MỤC TIÊU  <span className="text-primary">HƯỚNG ĐẾN</span>
      </h1>
      <p className="text-[#5f5c5c] text-base px-5 lg:px-0 lg:text-lg line-clamp-2 lg:line-clamp-3 uppercase font-normal">
        SÁNG TẠO – UY TÍN – TẬN TÂM  là những giá trị cốt lõi mà CÔNG  TY NGUYÊN THỐNG JP gầy dựng cho đội ngũ. Vì chúng tôi tin rằng, khi sở hữu những phẩm chất này thì chúng tôi sẽ thành công trong mọi sản phẩm, dịch vụ và tự tin mang đến NHỮNG điều tốt NHẤT CHO KHÁCH HÀNG
      </p>
    </div>
  )
}