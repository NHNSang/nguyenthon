'use client'
import Container from '@/components/custom/container'
import { Project, ProjectCategories } from '@/types/typeForWordpressData'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import MainBtn from '../buttons/main-btn'

interface ProjectsGridProps {
  projectsArray: Project[]
  projectCategoryArray: ProjectCategories['projectCategories']['nodes']
  title: string
  subtitle?: string
  islightBg?: boolean
  text?: string
  href: string
  labelOfButton: string
}

// Hàm tiện ích để chuẩn hóa chuỗi, đảm bảo so sánh chính xác
const normalizeString = (str: string | null) => {
  if (!str) return '';
  return str.trim().toLowerCase()
    .replace(/[–—−-]/g, '-') // Thay tất cả các loại gạch ngang bằng dấu gạch ngang thường (-)
    .replace(/\s+/g, ' ');   // Chuẩn hóa khoảng trắng
};

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
  const pathname = usePathname()
  const route = useRouter()
  const [seletedcategory, setSeletedCategory] = useState<string | null>(
    'Tất cả'
  )


  const projects = projectsArray

  // Logic lọc dự án theo danh mục đã chọn với chuẩn hóa tên danh mục
  const projectsByCategory = projects?.filter(
    (project) => {
      // Kiểm tra nếu project và projectFields tồn tại
      if (!project?.projectFields?.projectCategory) return false;

      // Kiểm tra nếu seletedcategory là null
      if (seletedcategory === null) return false;

      // Tạo một hàm so sánh sử dụng hàm chuẩn hóa
      const categoryMatches = (cat: string) => {
        if (!cat || !seletedcategory) return false;

        const normalizedCat = normalizeString(cat);
        const normalizedSelected = normalizeString(seletedcategory);

        return normalizedCat === normalizedSelected;
      };

      // Kiểm tra xem danh mục đã chọn có trong mảng danh mục của dự án không
      return project.projectFields.projectCategory.some(categoryMatches);
    }
  )

  // Không còn cần debug sau khi chức năng đã hoạt động đúng

  // Không cần useEffect debug sau khi chức năng đã hoạt động đúng
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  const categoryVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className=" ">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-4 lg:mt-8 mb:8 lg:mb-10  "
        >
          {/* <Title
            title={title}
            islightBg={islightBg}
            subtitle={subtitle}
            text={text}
          /> */}
          <h1 className="text-2xl md:text-[48px] mb-2 lg:mb-8 uppercase tracking-[5px] lg:tracking-[8px] font-semibold text-center">
            Khám phá dự án <span className="text-primary"> nổi bật</span>
          </h1>
        </motion.div>

        {/* Category List */}
        <motion.div
          variants={categoryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full overflow-x-scroll hiddenScrollBar mb-6 "
        >
          <div className="flex flex-row justify-center items-center gap-1 min-w-max px-4 border-b border-primary">
            {/* Nút Tất cả dự án */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`uppercase px-14 py-3 text-sm transition-all duration-300 border border-primary  bg-primary  font-bold
      ${seletedcategory === 'Tất cả'
                  ? 'text-white'
                  : 'text-black bg-white border-primary'
                }`}
              onClick={() => setSeletedCategory('Tất cả')}
            >
              Tất cả dự án
            </motion.button>

            {/* Các nút còn lại */}
            {projectCategoryArray.map((projectCategory) => (
              <motion.button
                key={projectCategory.slug}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`uppercase px-14 py-3 text-sm transition-all duration-300 border border-primary0 bg-primary font-bold
        ${normalizeString(seletedcategory) === normalizeString(projectCategory.name)
                    ? 'text-white'
                    : 'text-black bg-white border-primary'
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

            {(seletedcategory === 'Tất cả'
              ? projects
              : projectsByCategory
            )?.map((project) => (
              <motion.div
                key={project.slug}
                variants={item}
                className="group mx-5 lg:mx-0"
              >
                <Link
                  href={`du-an/${project.slug}`}
                  className="bg-[#F5F5F3] block overflow-hidden shadow-2xl hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative aspect-[4/3] overflow-hidden group">
                    <Image
                      src={project.featuredImage?.node.sourceUrl}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="border border-primary group-hover:translate-x-2 group-hover:-translate-y-2 absolute top-3 right-3 p-2 bg-amber-50 opacity-90 transition-opacity hover:opacity-100 duration-500 z-30">
                      <ArrowUpRight className="h-4 w-4 text-amber-800" />
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-6"
                    >
                      <ul className="text-white text-center space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ">
                        <li className="font-semibold">
                          Diện tích: {project.projectFields.sizeOfProject} m²
                        </li>
                        <li className="font-semibold">
                          Quy mô: {project.projectFields.floor} tầng
                        </li>
                        <li className="font-semibold">
                          Loại công trình:{' '}
                          {project.projectFields.projectCategory[0]}
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                  <div className="p-2 border-r border-l border-b border-primary">
                    <p className="text-black text-base px-0 lg:text-base line-clamp-2 uppercase tracking-[1px] font-semibold">
                      {project.title}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        {pathname !== '/du-an' && (
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
  )
}

export default ProjectsGrid
