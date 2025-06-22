"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/custom/container";
import Title from "@/components/custom/title";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MainBtn from "../buttons/main-btn";
import { ArrowDownLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Project, ProjectCategories } from "@/types/typeForWordpressData";

interface ProjectsGridProps {
  projectsArray: Project[];
  projectCategoryArray: ProjectCategories["projectCategories"]["nodes"];
  title: string;
  subtitle?: string;
  islightBg?: boolean;
  text?: string;
  href: string;
  labelOfButton: string;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projectsArray,
  projectCategoryArray,
  title,
  subtitle,
  islightBg,
  text,
  href,
  labelOfButton,
}) => {
  const pathname = usePathname();
  const route = useRouter();
  const [seletedcategory, setSeletedCategory] = useState<string | null>(
    "Tất cả"
  );
  const projects = projectsArray;
  const portfoliosByCategory = projects?.filter(
    (project) => project?.projectFields?.projectCategory[0] === seletedcategory
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className=" ">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="my-8  "
        >
          <Title
            title={title}
            islightBg={islightBg}
            subtitle={subtitle}
            text={text}
          />
        </motion.div>

        {/* Category List */}
        <motion.div
          variants={categoryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full overflow-x-scroll hiddenScrollBar mb-6 "
        >
          <div className="flex flex-row justify-center items-center gap-4 min-w-max px-4 py-1">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#d5b78f" }}
              whileTap={{ scale: 0.95 }}
              className={` bg-[#F5F5F3] border border-primary  px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 
                ${
                  seletedcategory === "Tất cả"
                    ? " font-bold shadow-md"
                    : "text-gray-600 bg-primary"
                }`}
              onClick={() => setSeletedCategory("Tất cả")}
            >
              Tất cả dự án
            </motion.button>
            {projectCategoryArray.map((projectCategory) => (
              <motion.button
                key={projectCategory.slug}
                whileHover={{ scale: 1.05, backgroundColor: "#d5b78f" }}
                whileTap={{ scale: 0.95 }}
                className={`bg-primary px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-sm
                  ${
                    seletedcategory === projectCategory.name
                      ? "bg-primary-foreground text-white font-bold shadow-md"
                      : " text-white "
                  }`}
                onClick={() => setSeletedCategory(projectCategory.name)}
              >
                {projectCategory.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={seletedcategory}
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 px-2 md:px-1 lg:px-0 pb-8"
          >
            {(seletedcategory === "Tất cả"
              ? projects
              : portfoliosByCategory
            )?.map((project) => (
              <motion.div key={project.slug} variants={item} className="group">
                <Link
                  href={`du-an/${project.slug}`}
                  className="bg-[#F5F5F3] block rounded-lg overflow-hidden shadow-2xl hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative aspect-[4/3] overflow-hidden group">
                    <Image
                      src={project.featuredImage?.node.sourceUrl}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className=" group-hover:translate-x-2 group-hover:-translate-y-2 absolute top-3 right-3 p-2 bg-amber-50 rounded-md opacity-90 transition-opacity hover:opacity-100 duration-500 z-30">
                      <ArrowUpRight className="h-4 w-4 text-amber-800" />
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-6"
                    >
                      <ul className="text-white text-center space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <li className="font-medium">
                          Diện tích: {project.projectFields.sizeOfProject} m²
                        </li>
                        <li className="font-medium">
                          Quy mô: {project.projectFields.floor} tầng
                        </li>
                        <li className="font-medium">
                          Loại công trình:{" "}
                          {project.projectFields.projectCategory[0]}
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-medium text-gray-600 group-hover:text-primary transition-colors duration-300 line-clamp-2 text-center">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        {pathname !== "/du-an" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mt-12"
          >
            <MainBtn
              text={labelOfButton}
              href={href}
              icon={<ArrowRight className="w-4 h-4" />}
            />
          </motion.div>
        )}
      </Container>
    </section>
  );
};

export default ProjectsGrid;
