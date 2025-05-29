'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion'
import { BuildingIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import MainBtn from '../buttons/main-btn'
import { Projects } from '@/types/typeForWordpressData'
import { useRouter } from 'next/navigation'
import { JetBrains_Mono } from 'next/font/google'


interface OurProjectsComponentProps {
  projects: Projects['projects']['nodes']
}

const ProjectsComponent: React.FC<OurProjectsComponentProps> = ({ projects }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const itemsPerPage = 3

  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  // Split projects into groups of 3
  const projectGroups = []
  const itemsPerGroup = 3

  for (let i = 0; i < projects.length; i += itemsPerGroup) {
    projectGroups.push(projects.slice(i, Math.min(i + itemsPerGroup, projects.length)))
  }

  // Create refs for each project group
  const groupRefs = useRef<(HTMLDivElement | null)[]>(Array(projectGroups.length).fill(null))

  // Check if 30% of the component is in view
  const isInView = useInView(sectionRef, { amount: 0.5, once: true })
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 })
  const isSubheadingInView = useInView(subheadingRef, { once: true, amount: 0.5 })
  const isButtonInView = useInView(buttonRef, { once: true, amount: 0.5 })

  // Track which group is currently in view
  const [visibleGroups, setVisibleGroups] = useState<boolean[]>(Array(projectGroups.length).fill(false))

  // Controls for animations
  const headingControls = useAnimation()
  const subheadingControls = useAnimation()
  const buttonControls = useAnimation()

  // Auto-scroll when 30% of component is visible
  useEffect(() => {
    if (isInView && sectionRef.current) {
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      })
    }
  }, [isInView])

  // Heading animation
  useEffect(() => {
    if (isHeadingInView) {
      headingControls.start("visible")
    }
  }, [isHeadingInView, headingControls])

  // Subheading animation
  useEffect(() => {
    if (isSubheadingInView) {
      subheadingControls.start("visible")
    }
  }, [isSubheadingInView, subheadingControls])

  // Button animation
  useEffect(() => {
    if (isButtonInView) {
      buttonControls.start("visible")
    }
  }, [isButtonInView, buttonControls])

  // Set up intersection observers for each project group
  useEffect(() => {
     const currentGroupRefs = groupRefs.current;
    const observers = groupRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibleGroups((prev) => {
            const newState = [...prev]
            newState[index] = entry.isIntersecting
            return newState
          })
        },
        { threshold: 0.3 }, // Trigger when 30% of the group is visible
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer, index) => {
        if (observer && currentGroupRefs[index]) {
        observer.disconnect();
      }
      })
    }
  }, [])

  // Create array of characters from text for character-by-character animation
  const createLetterArray = (text: string) => {
    return Array.from(text)
  }

  // Heading variants
  const headingVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  }

  // Subheading character variants
  const letterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
  }

  // Subheading container variants
  const subheadingVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.5,
      },
    },
  }

  // Button variants
  const buttonVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 1,
      },
    },
  }

  

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentIndex((prevIndex: number) =>
  //       (prevIndex + 1) % (projects.length - itemsPerPage + 1)
  //     )
  //   }, 5000) // Change slide every 5 seconds

  //   return () => clearInterval(timer)
  // }, [projects.length])

  const visibleItems = projects.slice(currentIndex, currentIndex + itemsPerPage)
  const maxIndex = projects.length - itemsPerPage

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  return (
    <section className=" mx-auto lg:p-10  overflow-hidden">
      <div className="w-full flex flex-col md:flex-row justify-between items-center">
        <div className="w-full py-16  overflow-hidden rounded-lg px-0">
          <div className="w-full container mx-auto px-2">
            {/* Header */}
            <div className="w-full flex flex-col items-center justify-center gap-5 lg:flex-row lg:justify-between lg:items-center mb-5">
              <div className="w-full lg:w-8/12 text-center lg:text-left max-w-[80%]">
                <motion.h2
                  ref={headingRef}
                  className={`text-3xl lg:text-4xl font-bold mb-4`}
                  variants={headingVariants}
                  initial="hidden"
                  animate={headingControls}
                >
                  Các dự án nổi bật của chúng tôi
                </motion.h2>

                <motion.p
                  ref={subheadingRef}
                  className={`text-neutral-500 text-xl hidden lg:block `}
                  variants={subheadingVariants}
                  initial="hidden"
                  animate={subheadingControls}
                >
                  {createLetterArray(
                    "Xem các dự án được thực hiện bởi đội ngũ Nguyên Thống JP",
                  ).map((char, index) => (
                    <motion.span key={index} variants={letterVariants}>
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.p>
              </div>

              <motion.div
                ref={buttonRef}
                className="flex flex-col gap-10 justify-start items-start"
                variants={buttonVariants}
                initial="hidden"
                animate={buttonControls}
              >
                <MainBtn href="/du-an" text="Our Portfolios" icon={<BuildingIcon className="h-4 w-4 ml-2" />} />
              </motion.div>
            </div>

            {/* Portfolio Carousel */}
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

              <AnimatePresence mode="wait">
                <motion.div
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
                      {/* Project Image */}
                      <div className="relative h-[70%] w-full">
                        <Image
                          src={item.featuredImage.node.sourceUrl}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button 
                          variant={"link"}
                          className=" bg-primary bg-transparent text-white underline hover:text-primary ">  
                            Xem chi tiết
                          </Button>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="p-6 bg-white h-[30%]">
                        <span className="text-sm text-gray-500 mb-2 block">{item.projectFields.projectCategory[0]}</span>
                        <h3 className="text-base font-medium mb-2 line-clamp-2">{item.title}</h3>
                        {/* <p className="text-gray-600 text-sm">{item.description}</p> */}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: projects.length - itemsPerPage + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-10 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-primary w-14' : 'bg-gray-300'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              className="text-center mt-16"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >

            </motion.div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default ProjectsComponent; 