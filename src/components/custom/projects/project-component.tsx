"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  motion,
  AnimatePresence,
  useInView,
  useAnimation,
} from "framer-motion";
import {
  BuildingIcon,
  ChevronLeft,
  ChevronRight,
  Currency,
} from "lucide-react";
import MainBtn from "../buttons/main-btn";
import { Projects } from "@/types/typeForWordpressData";
import { useRouter } from "next/navigation";

interface OurProjectsComponentProps {
  projects: Projects["projects"]["nodes"];
}

const ProjectsComponent: React.FC<OurProjectsComponentProps> = ({
  projects,
}) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const itemsPerPage = 3;
  const maxIndex = projects.length - itemsPerPage;

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.4, once: true });
  const fadeControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      fadeControls.start("visible");
    }
  }, [isInView, fadeControls]);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const visibleItems = projects.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="bg-[#FFFAF4] py-10">
      <div className="container mx-auto px-0 my-5 h-full ">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:gap-6 pb-6">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1"
          >
            {/* Nội dung bên trái */}
            <div className="flex flex-col items-center gap-1 lg:gap-5 lg:items-start max-w-2xl text-center lg:text-left">
              <h1 className="text-2xl md:text-[38px] uppercase tracking-[5px] lg:tracking-[8px] font-semibold">
                Các dự án <span className="text-primary">nổi bật</span>
              </h1>
              <p className="text-[#5f5c5c] text-base px-5 lg:px-0 lg:text-lg line-clamp-2 lg:line-clamp-3 uppercase tracking-[1px] font-normal">
                "Xem các dự án được thực hiện bởi đội ngũ Nguyên Thống JP"
              </p>
            </div>
          </motion.div>

          {/* Nút bên phải */}
          <div className="flex-0">
            <MainBtn
              className="w-[160px] lg:w-[200px] my-4 lg:my-0"
              href="/du-an"
              text="XEM THÊM"
              icon={<Currency className="w-5 h-5" />}
            />
          </div>
        </div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Navigation Buttons */}
            <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10 bg-primary hover:bg-primary text-white"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10 bg-primary hover:bg-primary text-white"
                onClick={handleNext}
                disabled={currentIndex === maxIndex}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Slides */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                {visibleItems.map((item) => (
                  <motion.div
                    key={item.title}
                    className="group relative overflow-hidden lg:shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer h-[350px] lg:h-[400px] px-6 lg:px-0"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => router.push(`/du-an/${item.slug}`)}
                  >
                    <div className="relative h-[70%] w-full">
                      <Image
                        src={item.featuredImage.node.sourceUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          variant="link"
                          className="bg-transparent text-white text-xl underline hover:text-primary"
                        >
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-white h-[30%] border-2 border-[#e1e1e1]">
                      <h3 className="text-xl font-semibold uppercase">
                        {item.projectFields.projectCategory[0]}
                      </h3>
                      <h3 className="text-[#5f5c5c] ">{item.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: projects.length - itemsPerPage + 1 }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-10 h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index ? "bg-primary w-14" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsComponent;
