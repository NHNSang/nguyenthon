'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/custom/container'
import BackgroundForBreadcrumb from '@/components/custom/BackgroundForBreadcrumb'
import BreadcrumbComponent from '@/components/custom/breadcrumb/BreadcrumbComponent'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const constructionProjects = [
  {
    id: 1,
    title: 'Dự án Biệt thự Vinhomes',
    location: 'Hà Nội',
    startDate: '01/2023',
    endDate: '12/2023',
    status: 'Hoàn thành',
    featuredImage: 'https://images.unsplash.com/photo-1581094794327-e6646c0f095d?auto=format&fit=crop&w=800&q=80',
    gridImages: [
      'https://images.unsplash.com/photo-1581094794327-e6646c0f095d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581094794327-e6646c0f095d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581094794327-e6646c0f095d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581094794327-e6646c0f095d?auto=format&fit=crop&w=800&q=80'
    ],
    phases: [
      {
        name: 'Giai đoạn 1: Chuẩn bị mặt bằng',
        date: '01/2023 - 02/2023',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1581094794327-e6646c0f095d?auto=format&fit=crop&w=800&q=80',
            alt: 'Chuẩn bị mặt bằng',
            description: 'Công tác san lấp và chuẩn bị mặt bằng'
          },
          {
            src: 'https://images.unsplash.com/photo-1581094794327-e6646c0f095d?auto=format&fit=crop&w=800&q=80',
            alt: 'Đào móng',
            description: 'Thi công phần móng'
          }
        ]
      },
      {
        name: 'Giai đoạn 2: Thi công phần thô',
        date: '03/2023 - 06/2023',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1581094794327-e6646c0f095d?auto=format&fit=crop&w=800&q=80',
            alt: 'Xây dựng khung',
            description: 'Thi công khung nhà'
          },
          {
            src: 'https://images.unsplash.com/photo-1581094794327-e6646c0f095d?auto=format&fit=crop&w=800&q=80',
            alt: 'Lắp đặt hệ thống',
            description: 'Lắp đặt hệ thống điện nước'
          }
        ]
      },
      {
        name: 'Giai đoạn 3: Hoàn thiện',
        date: '07/2023 - 12/2023',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1581094794327-e6646c0f095d?auto=format&fit=crop&w=800&q=80',
            alt: 'Hoàn thiện nội thất',
            description: 'Lắp đặt nội thất và hoàn thiện'
          },
          {
            src: 'https://images.unsplash.com/photo-1581094794327-e6646c0f095d?auto=format&fit=crop&w=800&q=80',
            alt: 'Cảnh quan',
            description: 'Hoàn thiện cảnh quan'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Dự án Chung cư cao cấp',
    location: 'TP.HCM',
    startDate: '03/2023',
    endDate: 'Đang thi công',
    status: 'Đang thi công',
    featuredImage: 'https://images.unsplash.com/photo-1581094794327-e6646c0f095d?auto=format&fit=crop&w=800&q=80',
    phases: [
      {
        name: 'Giai đoạn 1: Chuẩn bị mặt bằng',
        date: '03/2023 - 04/2023',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1581094794327-e6646c0f095d?auto=format&fit=crop&w=800&q=80',
            alt: 'Chuẩn bị mặt bằng',
            description: 'Công tác san lấp và chuẩn bị mặt bằng'
          }
        ]
      },
      {
        name: 'Giai đoạn 2: Thi công phần thô',
        date: '05/2023 - Hiện tại',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1581094794327-e6646c0f095d?auto=format&fit=crop&w=800&q=80',
            alt: 'Xây dựng khung',
            description: 'Thi công khung nhà'
          }
        ]
      }
    ]
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

export default function ConstructionDiaryPage() {
  const [selectedProject, setSelectedProject] = useState<typeof constructionProjects[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleProjectClick = (project: typeof constructionProjects[0]) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const handleNextImage = () => {
    if (selectedProject) {
      const allImages = selectedProject.phases.flatMap(phase => phase.images)
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
    }
  }

  const handlePrevImage = () => {
    if (selectedProject) {
      const allImages = selectedProject.phases.flatMap(phase => phase.images)
      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
    }
  }

  return (
    <main className='bg-[#f5f5f3]'>
      <BackgroundForBreadcrumb 
        titleForPage='Nhật ký công trình'
      />
      <Container className='py-20'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BreadcrumbComponent />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className='grid grid-cols-1 gap-16 mt-12'
        >
          {constructionProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className='bg-white rounded-lg shadow-lg overflow-hidden'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
                {/* Large main image */}
                <div 
                  className='relative h-[500px] cursor-pointer rounded-lg overflow-hidden'
                  onClick={() => handleProjectClick(project)}
                >
                  <Image
                    src={project.featuredImage}
                    alt={project.title}
                    fill
                    className='object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'>
                    <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                      <h2 className='text-3xl font-light mb-2'>
                        {project.title}
                      </h2>
                      <p className='text-gray-200'>
                        {project.location} • {project.startDate} - {project.endDate}
                      </p>
                    </div>
                  </div>
                  <span className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium ${
                    project.status === 'Hoàn thành' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Grid of smaller images */}
                <div className='grid grid-cols-2 gap-4 h-[500px]'>
                  {project.phases.slice(0, 4).flatMap(phase => phase.images.slice(0, 1)).map((image, index) => (
                    <div 
                      key={index}
                      className='relative rounded-lg overflow-hidden cursor-pointer'
                      onClick={() => handleProjectClick(project)}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className='object-cover'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'>
                        <div className='absolute bottom-0 left-0 right-0 p-4 text-white'>
                          <p className='text-sm font-medium'>{image.alt}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-light">
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedProject && (
            <div className="relative">
              <div className="relative h-[500px] w-full">
                {selectedProject.phases.flatMap(phase => phase.images)[currentImageIndex] && (
                  <Image
                    src={selectedProject.phases.flatMap(phase => phase.images)[currentImageIndex].src}
                    alt={selectedProject.phases.flatMap(phase => phase.images)[currentImageIndex].alt}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-medium mb-2">
                      {selectedProject.phases.flatMap(phase => phase.images)[currentImageIndex]?.alt}
                    </h3>
                    <p className="text-gray-200">
                      {selectedProject.phases.flatMap(phase => phase.images)[currentImageIndex]?.description}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {selectedProject.phases.flatMap(phase => phase.images).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
