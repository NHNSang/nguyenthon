"use client";

import { useState, useRef, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView, useScroll } from "framer-motion";
import { useWindowSize } from "@/hooks/useWindowSize";

const testimonials = [
  {
    name: "Nguyễn Thị Hương",
    location: "Hà Nội",
    text: "Tôi rất hài lòng với dịch vụ của Nguyên Thống JP. Đội ngũ nhân viên chuyên nghiệp, tận tâm và chất lượng sản phẩm rất tốt. Họ đã giúp tôi xây dựng được không gian sống lý tưởng cho gia đình.",
    rating: 5,
  },
  {
    name: "Trần Văn Minh",
    location: "TP. Hồ Chí Minh",
    text: "Nguyên Thống JP đã vượt quá mong đợi của tôi. Từ khâu tư vấn thiết kế đến thi công đều rất chuyên nghiệp. Sản phẩm của họ không chỉ đẹp mà còn rất bền và tiện dụng.",
    rating: 5,
  },
  {
    name: "Lê Thị Phương",
    location: "Đà Nẵng",
    text: "Tôi đã chọn Nguyên Thống JP cho dự án cải tạo nhà của mình và không hề thất vọng. Họ luôn lắng nghe ý kiến của khách hàng và đưa ra những giải pháp tối ưu. Chất lượng công trình rất tốt.",
    rating: 5,
  },
  {
    name: "Phạm Văn Tuấn",
    location: "Đà Nẵng",
    text: "Dịch vụ của Nguyên Thống JP rất đáng giá. Họ có đội ngũ kỹ thuật giỏi, tư vấn nhiệt tình và giá cả hợp lý. Tôi sẽ giới thiệu họ cho bạn bè và người thân.",
    rating: 5,
  },
  {
    name: "Hoàng Thị Lan",
    location: "Đà Nẵng",
    text: "Tôi rất ấn tượng với sự chuyên nghiệp và tận tâm của Nguyên Thống JP. Họ luôn hoàn thành đúng tiến độ và đảm bảo chất lượng công trình. Sản phẩm của họ thực sự rất đáng tin cậy.",
    rating: 5,
  },
  {
    name: "Đỗ Văn Hùng",
    location: "Đà Nẵng",
    text: "Sau khi sử dụng dịch vụ của Nguyên Thống JP, tôi thấy họ xứng đáng là đối tác tin cậy. Họ không chỉ cung cấp sản phẩm chất lượng mà còn có dịch vụ hậu mãi rất tốt.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);
  const { isMobile } = useWindowSize();

  const isInView = useInView(sectionRef, { amount: 0.2, once: true });
  const isTitleInView = useInView(titleRef, { once: true });

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const testimonialVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="py-10  relative overflow-hidden bg-white"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      {/* Architectural grid background */}
      {/* <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-black h-full"></div>
          ))}
        </div>
        <div className="grid grid-rows-12 w-full absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-b border-black w-full"></div>
          ))}
        </div>
      </div> */}

      <div className="container mx-auto px-4 relative z-10 ">
        <div className="max-w-5xl mx-auto">
          <motion.div
            ref={titleRef}
            initial="hidden"
            animate={isTitleInView ? "visible" : "hidden"}
            variants={titleVariants}
            className="mb-10"
          >
            {isMobile ? (
              <h1 className="text-2xl md:text-[35px] mb-2 lg:mb-6 uppercase tracking-[5px] lg:tracking-[5px] font-semibold text-center">
                Khách hàng nói về
                <p className="text-primary font-medium ml-2 relative inline-block after:content-[''] after:block after:h-0.5 after:bg-[#d5b78f] after:mt-1 after:w-full">
                  Nguyên Thống JP
                </p>
              </h1>
            ) : (
              <h1 className="text-2xl md:text-[35px] mb-2 lg:mb-6 uppercase tracking-[5px] lg:tracking-[5px] font-semibold text-center">
                Khách hàng nói về
                <span className="text-primary font-medium ml-2 relative inline-block after:content-[''] after:block after:h-0.5 after:bg-[#d5b78f] after:mt-1 after:w-full">
                  Nguyên Thống JP
                </span>
              </h1>
            )}
          </motion.div>

          <div ref={carouselRef} className="relative">
            <motion.div
              key={currentIndex}
              initial="hidden"
              animate="visible"
              variants={testimonialVariants}
              className="bg-[#F1EDE6] p-4 lg:p-10 md:p-16 rounded-none shadow-lg relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#d5b78f] opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#d5b78f] opacity-50"></div>

              <Quote className="h-16 w-16 text-[#d5b78f] opacity-20 absolute top-8 left-8" />

              <div className="flex justify-center mb-3 lg:mb-8">
                <div className="flex space-x-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-[#d5b78f] text-[#d5b78f]"
                    />
                  ))}
                </div>
              </div>

              <blockquote className="text-lg md:text-xl text-center mb-4 lg:mb-10 font-light leading-relaxed text-gray-600  max-w-3xl mx-auto">
                "{currentTestimonial.text}"
              </blockquote>

              <div className="text-center">
                <p className="font-medium text-xl text-neutral-800 mb-1">
                  {currentTestimonial.name}
                </p>
                <p className="text-[#d5b78f]">{currentTestimonial.location}</p>
              </div>

              {/* Progress indicator */}
              <div className="flex justify-center mt-10 space-x-1">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-8 bg-[#d5b78f]"
                        : "w-2 bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>

              <div className="flex justify-between mt-8 absolute bottom-8 left-0 right-0 px-8 md:px-16">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-12 w-12 border border-neutral-300 hover:bg-[#d5b78f] hover:text-white transition-colors"
                  onClick={prevTestimonial}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Previous testimonial</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-12 w-12 border border-neutral-300 hover:bg-[#d5b78f] hover:text-white transition-colors"
                  onClick={nextTestimonial}
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Next testimonial</span>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
