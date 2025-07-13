"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Contact, Phone } from "lucide-react";
import MainBtn from "../buttons/main-btn";
import Link from "next/link";

// Dữ liệu carousel với animation riêng cho từng element
const carouselSlides = [
  {
    id: 1,
    image:
      "https://aqua-pigeon-769011.hostingersite.com/wp-content/uploads/2025/07/IMG_4624.jpg",
    title: "Không Gian Sống Đẹp & Tiện Nghi",
    description: "Cùng bạn xây dựng tổ ấm hoàn hảo",
    titleAnimation: "fadeInUp",
    descriptionAnimation: "slideInRight",
    buttonAnimation: "bounceIn",
  },
  {
    id: 2,
    image:
      "https://aqua-pigeon-769011.hostingersite.com/wp-content/uploads/2025/07/IMG_2900.jpg",
    title: "Thiết Kế & Thi Công Trọn Gói",
    description: "Một quy trình khép kín, rõ ràng",
    titleAnimation: "slideInLeft",
    descriptionAnimation: "fadeInDown",
    buttonAnimation: "flipInX",
  },
  {
    id: 3,
    image:
      "https://aqua-pigeon-769011.hostingersite.com/wp-content/uploads/2025/07/IMG_9044.jpg",
    title: "Vững Kỹ Thuật - Bền Công Trình",
    description: "Cam kết chất lượng và tiến độ",
    titleAnimation: "rotateIn",
    descriptionAnimation: "zoomIn",
    buttonAnimation: "slideInUp",
  },
  {
    id: 4,
    image:
      "https://aqua-pigeon-769011.hostingersite.com/wp-content/uploads/2025/07/6cb7d9c34fb532308f21252ba56933f2.jpg",
    title: "Uy Tín Là Niềm Tin Của Chúng Tôi",
    description: "Được tin chọn bởi hàng ngàn khách",
    titleAnimation: "flipInY",
    descriptionAnimation: "slideInLeft",
    buttonAnimation: "pulseScale",
  },
  {
    id: 5,
    image:
      "https://aqua-pigeon-769011.hostingersite.com/wp-content/uploads/2025/07/IMG_2857.jpg",
    title: "TƯ VẤN - HỖ TRỢ & BẢO TRÌ 24/7 ",
    description: "NGUYÊN THỐNG JP luôn sẵn sàng cùng bạn",
    titleAnimation: "typeWriter",
    descriptionAnimation: "fadeInScale",
    buttonAnimation: "shakeIn",
  },
];

export default function MultiAnimationCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === carouselSlides.length - 1 ? 0 : prev + 1
      );
    }, 7000); // 9 giây để có thời gian xem đầy đủ animation

    return () => clearInterval(interval);
  }, []);

  // Reset animation when slide changes
  useEffect(() => {
    setIsAnimating(false);
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === carouselSlides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselSlides.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full h-[320px] md:h-[500px] lg:h-[750px] overflow-hidden mt-[60px] lg:mt-0">
      {/* Custom CSS for different animations */}
      <style jsx>{`
        /* TITLE ANIMATIONS */
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(60px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes rotateIn {
          0% {
            opacity: 0;
            transform: rotate(-200deg) scale(0.5);
          }
          100% {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }

        @keyframes flipInY {
          0% {
            opacity: 0;
            transform: translateY(60px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes typeWriter {
          0% {
            width: 0;
            opacity: 1;
          }
          100% {
            width: 100%;
            opacity: 1;
          }
        }

        /* DESCRIPTION ANIMATIONS */
        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(80px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoomIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* BUTTON ANIMATIONS */
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes flipInX {
          0% {
            opacity: 0;
            transform: perspective(400px) rotateX(90deg);
          }
          40% {
            transform: perspective(400px) rotateX(-20deg);
          }
          60% {
            transform: perspective(400px) rotateX(10deg);
          }
          80% {
            transform: perspective(400px) rotateX(-5deg);
          }
          100% {
            opacity: 1;
            transform: perspective(400px) rotateX(0deg);
          }
        }

        @keyframes slideInUp {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseScale {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shakeIn {
          0% {
            opacity: 0;
            transform: translateX(-10px);
          }
          25% {
            opacity: 0.5;
            transform: translateX(10px);
          }
          50% {
            opacity: 0.8;
            transform: translateX(-8px);
          }
          75% {
            opacity: 0.9;
            transform: translateX(6px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Apply animations with different durations and delays */
        .animate-title-fadeInUp {
          animation: fadeInUp 1s ease-out 0.3s forwards;
          opacity: 0;
        }
        .animate-title-slideInLeft {
          animation: slideInLeft 1s ease-out 0.3s forwards;
          opacity: 0;
        }
        .animate-title-rotateIn {
          animation: rotateIn 1.2s ease-out 0.3s forwards;
          opacity: 0;
        }
        .animate-title-flipInY {
          animation: flipInY 1s ease-out 0.3s forwards;
          opacity: 0;
        }
        .animate-title-typeWriter {
          animation: typeWriter 2s ease-out 0.3s forwards;
          opacity: 0;
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid white;
        }

        .animate-desc-slideInRight {
          animation: slideInRight 1s ease-out 0.8s forwards;
          opacity: 0;
        }
        .animate-desc-fadeInDown {
          animation: fadeInDown 1s ease-out 0.8s forwards;
          opacity: 0;
        }
        .animate-desc-zoomIn {
          animation: zoomIn 1s ease-out 0.8s forwards;
          opacity: 0;
        }
        .animate-desc-slideInLeft {
          animation: slideInLeft 1s ease-out 0.8s forwards;
          opacity: 0;
        }
        .animate-desc-fadeInScale {
          animation: fadeInScale 1s ease-out 0.8s forwards;
          opacity: 0;
        }

        .animate-btn-bounceIn {
          animation: bounceIn 0.8s ease-out 1.3s forwards;
          opacity: 0;
        }
        .animate-btn-flipInX {
          animation: flipInX 0.8s ease-out 1.3s forwards;
          opacity: 0;
        }
        .animate-btn-slideInUp {
          animation: slideInUp 0.8s ease-out 1.3s forwards;
          opacity: 0;
        }
        .animate-btn-pulseScale {
          animation: pulseScale 0.8s ease-out 1.3s forwards;
          opacity: 0;
        }
        .animate-btn-shakeIn {
          animation: shakeIn 0.8s ease-out 1.3s forwards;
          opacity: 0;
        }
      `}</style>

      {/* Slides */}
      {carouselSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40" />
          </div>

          {/* Content Overlay */}
          <div className="relative z-20 h-full flex items-center justify-center lh:mt-0">
            <div className="text-center text-white px-2 max-w-7xl">
              <p
                className={`font-Oswald uppercase text-base md:text-3xl lg:text-5xl font-medium lg:font-bold mb-4 tracking-[3px] pt-4 ${
                  index === currentSlide && isAnimating
                    ? `animate-title-${slide.titleAnimation}`
                    : "opacity-0"
                }`}
              >
                {slide.title}
              </p>
              <div
                className={`flex items-center justify-center text-white text-lg md:text-xl lg:text-xl mb-0 lg:mb-10 max-w-4xl mx-auto ${
                  index === currentSlide && isAnimating
                    ? `animate-desc-${slide.descriptionAnimation}`
                    : "opacity-0"
                }`}
              >
                <p className="font-Oswald uppercase text-sm md:text-lg lg:text-2xl font-medium mb-8 tracking-[2px] text-primary">
                  "{slide.description}"
                </p>
              </div>
              <div
                className={`${
                  index === currentSlide && isAnimating
                    ? `animate-btn-${slide.buttonAnimation}`
                    : "opacity-0"
                }`}
              >
                <Link href="/du-an">
                  <button className="font-Oswald uppercase h-10 lg:h-12 border border-white bg-transparent hover:bg-primary/90 hover:shadow-lg shadow-lg shadow-primary hover:shadow-primary/50 w-[35%] md:w-[40%]  lg:w-[30%] text-neutral-100 group items-center justify-center inline-flex duration-500 text-sm lg:text-base">
                    Xem sản phẩm
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-3">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
        h-3 w-3 md:h-4 md:w-4
        rounded-full
        transition-all duration-300
        hover:scale-110
        border border-white/30
        ${
          index === currentSlide
            ? "bg-primary w-8 md:w-[45px] shadow-md shadow-primary/50"
            : "bg-white/30 hover:bg-white/50"
        }
      `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
