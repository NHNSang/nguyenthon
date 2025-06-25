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
      "https://aqua-pigeon-769011.hostingersite.com/wp-content/uploads/2025/06/494738081_2448967692124256_2050038420089772221_n.jpg",
    title: "Kiến Tạo Không Gian - Nâng Tầm Giá Trị Sống",
    description:
      "Chúng tôi đồng hành cùng bạn trong hành trình xây dựng tổ ấm bền vững và tinh tế",
    titleAnimation: "fadeInUp",
    descriptionAnimation: "slideInRight",
    buttonAnimation: "bounceIn",
  },
  {
    id: 2,
    image:
      "https://aqua-pigeon-769011.hostingersite.com/wp-content/uploads/2025/06/494183796_2448964915457867_6537993737425744723_n.jpg",
    title: "Thiết Kế - Thi Công Trọn Gói ",
    description:
      "Từ ý tưởng đến thực tế - tất cả đều được thực hiện chỉ trong một quy trình khép kín, minh bạch.",
    titleAnimation: "slideInLeft",
    descriptionAnimation: "fadeInDown",
    buttonAnimation: "flipInX",
  },
  {
    id: 3,
    image:
      "https://aqua-pigeon-769011.hostingersite.com/wp-content/uploads/2025/06/494086837_2449583722062653_8773621874885749778_n.jpg",
    title: "Vững Kỹ Thuật - Bền Công Trình",
    description:
      "Chúng tôi đặt chất lượng lên hàng đầu, cam kết thi công đúng tiêu chuẩn, đúng tiến độ",
    titleAnimation: "rotateIn",
    descriptionAnimation: "zoomIn",
    buttonAnimation: "slideInUp",
  },
  {
    id: 4,
    image:
      "https://aqua-pigeon-769011.hostingersite.com/wp-content/uploads/2025/06/494225417_2449347278752964_5546362461091261188_n.jpg",
    title: "Uy tín - niềm tin",
    description:
      "Chúng tôi tự hào là lựa chọn của nhiều gia chủ, doanh nghiệp và đối tác trong suốt những năm qua.",
    titleAnimation: "flipInY",
    descriptionAnimation: "slideInLeft",
    buttonAnimation: "pulseScale",
  },
  {
    id: 5,
    image:
      "https://aqua-pigeon-769011.hostingersite.com/wp-content/uploads/2025/06/485681024_2409068762780816_8601693155627799306_n.jpg",
    title: "Bảo Trì - Hỗ Trợ",
    description:
      "Dịch vụ bảo trì định kỳ và hỗ trợ khách hàng 24/7, đảm bảo công trình luôn trong tình trạng tốt nhất.",
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
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[900px] overflow-hidden bg-gray-900">
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
            transform: perspective(400px) rotateY(90deg);
          }
          40% {
            transform: perspective(400px) rotateY(-20deg);
          }
          60% {
            transform: perspective(400px) rotateY(10deg);
          }
          80% {
            transform: perspective(400px) rotateY(-5deg);
          }
          100% {
            opacity: 1;
            transform: perspective(400px) rotateY(0deg);
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
          <div className="relative z-20 h-full flex items-center justify-center">
            <div className="text-center text-white px-2 max-w-6xl">
              {/* Title with Specific Animation */}
              <h1
                className={`font-calibri text-4xl md:text-5xl lg:text-5xl font-light mb-8 leading-tight ${
                  index === currentSlide && isAnimating
                    ? `animate-title-${slide.titleAnimation}`
                    : "opacity-0"
                }`}
              >
                {slide.title}
              </h1>

              {/* Description with Different Animation */}
              <div
                className={`flex items-center justify-center text-white text-lg md:text-xl lg:text-xl mb-10 max-w-4xl mx-auto ${
                  index === currentSlide && isAnimating
                    ? `animate-desc-${slide.descriptionAnimation}`
                    : "opacity-0"
                }`}
              >
                <div className="flex-grow h-px bg-white"></div>
                <span className="px-4 whitespace-nowrap">
                  {slide.description}
                </span>
                <div className="flex-grow h-px bg-white"></div>
              </div>

              {/* Button with Another Different Animation */}
              <div
                className={`${
                  index === currentSlide && isAnimating
                    ? `animate-btn-${slide.buttonAnimation}`
                    : "opacity-0"
                }`}
              >
                <Link href="/du-an">
                  <button className=" h-12 border border-primary bg-transparent hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 rounded-full px-6 text-neutral-100 group items-center justify-center inline-flex duration-500">
                    Xem sản phẩm
                    {/* <span className="flex items-center gap-3">
                      <Phone size={24} />
                      Xem sản phẩm
                    </span> */}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/30 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 hover:scale-110 border border-white/30 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight size={32} />
      </button> */}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-4">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-4 rounded-full transition-all duration-300 hover:scale-125 border border-white/30 ${
              index === currentSlide
                ? "bg-primary  w-12 shadow-lg shadow-primary/50 "
                : "bg-white/30 hover:bg-white/50 w-4"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
