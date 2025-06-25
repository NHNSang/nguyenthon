"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Post } from "@/types/typeForWordpressData"
import { useRouter } from "next/navigation"
import MainBtn from "../buttons/main-btn"
import { motion, useAnimation, useInView } from "framer-motion"

interface PostsProps {
  lastestArticles: Post[]
  className?: string
}

const LatestNewsSection: React.FC<PostsProps> = ({ lastestArticles, className }) => {
  const router = useRouter()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  // Animation controls
  const headingControls = useAnimation()
  const cardsControls = useAnimation()
  const buttonControls = useAnimation()

  // Animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2 + index * 0.1, // Staggered delay
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.6, // Appears after cards
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Arrow icon animation
  const arrowVariants = {
    rest: { x: 0 },
    hover: { x: 5, transition: { duration: 0.3, ease: "easeInOut" } },
  }

  // Trigger animations when section comes into view
  useEffect(() => {
    if (isInView) {
      headingControls.start("visible")
      cardsControls.start("visible")
      buttonControls.start("visible")
    }
  }, [isInView, headingControls, cardsControls, buttonControls])

  return (
    <motion.section
      ref={sectionRef}
      className={cn("py-8 px-4 md:px-6 lg:px-8 bg-[#F1EDE6]", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto p-0 ">
        {/* <motion.div
          className="flex items-center justify-center lg:justify-start mb-8"
          initial="hidden"
          animate={headingControls}
          variants={headingVariants}
        >
          <h2 className="text-3xl md:text-4xl font-light">Bài viết mới nhất</h2>
        </motion.div> */}
        
          <h2 className="text-3xl md:text-4xl font-light text-center mb-10">Bài viết mới nhất</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-full">
          {lastestArticles.map((item, index) => (
            <motion.div
              key={item.node.slug}
              custom={index}
              initial="hidden"
              animate={cardsControls}
              variants={cardVariants}
              // whileHover={{ y: 0, transition: { duration: 0.3 } }}
              onClick={() => router.push(`/blog/${item.node.slug}`)}
              className="group flex flex-col cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-[380px]"
            >
              <div className="relative overflow-hidden rounded-lg mb-4 h-[75%]">
                <Image
                  src={item.node.featuredImage?.node.sourceUrl || "/placeholder.svg"}
                  alt={item.node.title}
                  width={400}
                  height={300}
                  className="w-full h-[300px]  aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <motion.div
                  className="absolute top-3 right-3 p-2 bg-amber-50 rounded-md opacity-90"
                  whileHover={{
                    opacity: 1,
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                >
                  <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 45, transition: { duration: 0.3 } }}>
                    <ArrowUpRight className="h-4 w-4 text-amber-800" />
                  </motion.div>
                </motion.div>
              </div>
              <div className="px-4 pb-4 h-[25%]">
                <motion.h3
                  className=" mb-2 font-light text-lg line-clamp-2 text-black"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {item.node.title}
                </motion.h3>
                <p className="text-sm text-gray-500">4 phút đọc</p>
              </div>
            </motion.div>
          ))}
        </div>
{/* button */}
        <motion.div
          className="w-full flex justify-center mt-10"
          initial="hidden"
          animate={buttonControls}
          variants={buttonVariants}
          whileHover="hover"
        >
          <div className="relative">
            <MainBtn
              href="/blog"
              text="Xem tất cả"
              icon={
                <motion.div variants={arrowVariants}>
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              }
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default LatestNewsSection
