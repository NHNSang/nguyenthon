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
    <motion.section
      ref={sectionRef}
      variants={fadeInVariants}
      initial="hidden"
      animate={fadeControls}
      className="mx-auto py-10 overflow-hidden bg-[#F1EDE6]"
    >
      <div className="w-full flex flex-col md:flex-row justify-between items-center">
        <div className="w-full overflow-hidden rounded-lg px-0">
          <div className="w-full container mx-auto px-2">
            {/* Header */}
            <div className="w-full flex flex-col items-center justify-center gap-5 lg:flex-row lg:justify-between lg:items-center mb-5 text-black">
              <div className="w-full lg:w-8/12 text-center lg:text-left max-w-[80%]">
                <h2 className="text-3xl md:text-4xl font-light mb-4 text-black">
                  Các dự án nổi bật của chúng tôi
                </h2>
                <p className="text-gray-600 text-lg line-clamp-3">
                  Xem các dự án được thực hiện bởi đội ngũ Nguyên Thống JP
                </p>
              </div>

              <div className="flex flex-col gap-10 justify-start items-start">
                <MainBtn
                  href="/du-an"
                  text="Our Portfolios"
                  icon={<BuildingIcon className="h-4 w-4 ml-2" />}
                />
              </div>
            </div>

            {/* Carousel */}
            <div className="relative">
              {/* Navigation Buttons */}
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-10 w-10 bg-white hover:bg-gray-100"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-10 w-10 bg-white hover:bg-gray-100"
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
                      className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer h-[400px]"
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

                      <div className="p-6 bg-white h-[30%]">
                        <span className="text-lg font-light block">
                          {item.projectFields.projectCategory[0]}
                        </span>
                        <h3 className="text-gray-600 text-base mb-2 line-clamp-2">
                          {item.title}
                        </h3>
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
                        currentIndex === index
                          ? "bg-primary w-14"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectsComponent;
