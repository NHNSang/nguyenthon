"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Book, Currency } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, useAnimationControls, useInView } from "framer-motion";
import MainBtn from "../buttons/main-btn";

const ourCategories = [
  {
    name: "Nhà Phố",
    description:
      "Thiết kế nhà phố hiện đại với không gian tối ưu, kết hợp công năng và thẩm mỹ.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
  },
  {
    name: "Biệt thự Villa",
    description:
      "Biệt thự cao cấp với thiết kế độc đáo, không gian rộng rãi và tiện nghi.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop",
  },
  {
    name: "Homestay & Căn hộ",
    description:
      "Thiết kế căn hộ và homestay với phong cách hiện đại, đáp ứng nhu cầu lưu trú.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
  },
  {
    name: "Cải tạo công trình",
    description:
      "Dịch vụ cải tạo và nâng cấp công trình hiện có, tối ưu không gian và công năng.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop",
  },
  {
    name: "Văn phòng",
    description:
      "Thiết kế văn phòng hiện đại, tạo môi trường làm việc chuyên nghiệp và hiệu quả.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop",
  },
  {
    name: "Nhà hàng & Cafe",
    description:
      "Thiết kế không gian ẩm thực độc đáo, tạo trải nghiệm thương hiệu ấn tượng.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
  },
  {
    name: "Khách sạn & Resort",
    description:
      "Thiết kế khách sạn và resort cao cấp, mang đến trải nghiệm nghỉ dưỡng tuyệt vời.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
  },
  {
    name: "Công trình công cộng",
    description:
      "Thiết kế công trình công cộng với tính bền vững và thân thiện với môi trường.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop",
  },
];

const OurServices = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [arrowRotation, setArrowRotation] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const controls = useAnimationControls();
  const itemsControls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Check if 30% of the component is in view
  const isInView = useInView(sectionRef, { amount: 0.3, once: true });

  // Duplicate categories for infinite scroll effect
  const duplicatedCategories = [...ourCategories, ...ourCategories];

  // Auto-scroll to show 100% of the component when 30% is visible
  // useEffect(() => {
  //   if (isInView && sectionRef.current) {
  //     const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY

  //     window.scrollTo({
  //       top: sectionTop,
  //       behavior: "smooth",
  //     })

  //     // Start the staggered animation for carousel items
  //     itemsControls.start("visible")
  //   }
  // }, [isInView, itemsControls])

  // Tự động scroll khi component hiển thị
  useEffect(() => {
    if (isInView) {
      itemsControls.start("visible");
    }
  }, [isInView, itemsControls]);

  // Start the carousel auto-scroll after all items have appeared ............................
  useEffect(() => {
    if (animationComplete && !isHovered) {
      controls.start({
        x: [0, -1000],
        transition: {
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        },
      });
    } else if (isHovered) {
      controls.stop();
    }
  }, [animationComplete, isHovered, controls]);

  // Set animation complete after all items have appeared (1.5s)............................
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 1500); // Total animation time for all items

      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setArrowRotation(45);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setArrowRotation(0);
  };

  // Variants for staggered animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: 50,
      y: 10,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
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
      className="py-[15px] lg:py-[80px] h-fit md:h-[600px] lg:h-[calc(100vh-100px)] xl:h-fit bg-white "
    >
      <div className="container mx-auto px-0 my-5 h-full">
        <div className="flex flex-col justify-center items-center w-full">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[80%_20%] w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-center gap-1 lg:gap-5 lg:items-start max-w-2xl text-center lg:text-left ">
              <h1 className="text-2xl md:text-[38px] uppercase tracking-[5px] lg:tracking-[8px] font-semibold">
                công trình <span className="text-primary">thiết kế</span>
              </h1>
              <p className="text-[#5f5c5c] text-base px-5 lg:px-0 lg:text-lg line-clamp-2 lg:line-clamp-3 uppercase tracking-[1px] font-normal">
                "Với kinh nghiệm thiết kế đa dạng nhiều loại hình công trình,
                Nguyên Thống JP có thể đáp ứng được hầu hết các loại kế hoạch
                thiết kế"
              </p>
            </div>
            <MainBtn
              className="w-[160px] lg:w-[200px] mx-auto my-4 lg:my-10"
              href="/du-an"
              text="Tư vấn báo giá"
              icon={<Currency className="w-5 h-5" />}
            />
          </motion.div>
        </div>

        <div className="relative overflow-hidden mx-4 lg:mx-0">
          <motion.div
            ref={containerRef}
            className="flex space-x-4"
            animate={controls}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="flex space-x-4"
              variants={containerVariants}
              initial="hidden"
              animate={itemsControls}
              onAnimationComplete={() => setAnimationComplete(true)}
            >
              {duplicatedCategories.map((category, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-[260px] lg:w-[300px] bg-white border border-primary group cursor-pointer shadow-xl my-0 lg:my-5"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  custom={index}
                >
                  <div className="relative h-[180px] w-full">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                    <motion.div
                      className="absolute top-2 right-2 p-1 bg-white border border-primary group-hover:translate-x-2 duration-300"
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="h-4 w-4 text-black " />
                    </motion.div>
                  </div>
                  <div className="p-2 lg:p-4">
                    <h3 className="text-lg  tracking-[2px] font-semibold mb-0 lg:mb-2 uppercase">
                      {category.name}
                    </h3>
                    <p className="text-[#5f5c5c] text-sm line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
