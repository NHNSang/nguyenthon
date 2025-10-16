'use client'
import Container from '@/components/custom/container'
import { Project, ProjectCategories } from '@/types/typeForWordpressData'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
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

// Hàm chuẩn hoá chuỗi
const normalizeString = (str: string | null) => {
  if (!str) return ''
  return str
    .trim()
    .toLowerCase()
    .replace(/[–—−-]/g, '-')
    .replace(/\s+/g, ' ')
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
  const pathname = usePathname()
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả')

  // 👉 Dùng object để lưu trang hiện tại cho từng danh mục
  const [pageByCategory, setPageByCategory] = useState<Record<string, number>>({
    'Tất cả': 1,
  })

  const projectsPerPage = 10

  // lọc theo danh mục
  const projects = projectsArray
  const projectsByCategory = projects?.filter((project) => {
    if (!project?.projectFields?.projectCategory) return false
    if (!selectedCategory) return false

    const categoryMatches = (cat: string) =>
      normalizeString(cat) === normalizeString(selectedCategory)

    return project.projectFields.projectCategory.some(categoryMatches)
  })

  // chọn dữ liệu hiển thị tuỳ theo filter
  const visibleProjects =
    selectedCategory === 'Tất cả' ? projects : projectsByCategory

  // lấy số trang hiện tại tương ứng với danh mục đang chọn
  const currentPage = pageByCategory[selectedCategory] || 1

  // tính toán phân trang
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = visibleProjects?.slice(
    indexOfFirstProject,
    indexOfLastProject
  )

  const totalPages = Math.ceil(visibleProjects.length / projectsPerPage)

  // chuyển trang
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPageByCategory((prev) => ({
        ...prev,
        [selectedCategory]: page,
      }))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // reset về trang 1 khi đổi danh mục (nếu danh mục chưa có trong pageByCategory)
  useEffect(() => {
    setPageByCategory((prev) => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory] || 1,
    }))
  }, [selectedCategory])

  // Animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section>
      <Container>
        {/* Tiêu đề */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-4 lg:mt-8 mb:8 lg:mb-10"
        >
          <h1 className="text-2xl md:text-[48px] mb-2 lg:mb-8 uppercase tracking-[5px] lg:tracking-[8px] font-semibold text-center">
            Khám phá dự án <span className="text-primary"> nổi bật</span>
          </h1>
        </motion.div>

        {/* Danh mục */}
        <div className="w-full overflow-x-scroll hiddenScrollBar mb-6">
          <div className="flex flex-row justify-center items-center gap-1 min-w-max px-4 border-b border-primary">
            <button
              className={`uppercase px-14 py-3 text-sm border font-bold transition-all duration-300 ${
                selectedCategory === 'Tất cả'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-black border-primary'
              }`}
              onClick={() => setSelectedCategory('Tất cả')}
            >
              Tất cả dự án
            </button>

            {projectCategoryArray.map((cat) => (
              <button
                key={cat.slug}
                className={`uppercase px-14 py-3 text-sm border font-bold transition-all duration-300 ${
                  normalizeString(selectedCategory) ===
                  normalizeString(cat.name)
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-black border-primary'
                }`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Lưới dự án */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${currentPage}`}
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 px-2 md:px-1 lg:px-0 pb-8"
          >
            {currentProjects?.map((project) => (
              <motion.div key={project.slug} variants={item}>
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
                  </div>
                  <div className="p-2 border-r border-l border-b border-primary h-[65px]">
                    <p className="text-black text-base uppercase tracking-[1px] font-semibold line-clamp-2">
                      {project.title}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 py-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-1 border border-primary text-primary rounded hover:bg-primary hover:text-white disabled:opacity-40"
            >
              Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded border ${
                  currentPage === i + 1
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-black border-primary'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-1 border border-primary text-primary rounded hover:bg-primary hover:text-white disabled:opacity-40"
            >
              Sau
            </button>
          </div>
        )}

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
