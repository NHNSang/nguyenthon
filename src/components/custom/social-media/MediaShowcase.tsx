"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import YouTubeEmbed from "../our-categories/YoutubeEmbed"
import { JetBrains_Mono } from "next/font/google"
import type { MediaComponent } from "@/types/typeForWordpressData"
import { ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

interface GridBackgroundProps {
  isDarkMode: boolean
}

const GridBackground: React.FC<GridBackgroundProps> = ({ isDarkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div className={`absolute inset-0 opacity-10 bg-grid ${
        isDarkMode ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'
      }`}></div>

      {/* Light streak effect */}
      <div className="absolute -inset-[10%] opacity-20">
        <div className="absolute top-1/4 left-0 w-full h-40 bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-3xl transform -rotate-6 translate-y-24"></div>
        <div className="absolute top-2/3 right-0 w-full h-32 bg-gradient-to-l from-transparent via-primary/20 to-transparent blur-3xl transform rotate-6 -translate-y-12"></div>
      </div>
    </div>
  )
}

interface MediaShowcaseProps {
  mediaShowcaseComponent: MediaComponent
}


const MediaShowcase: React.FC<MediaShowcaseProps> = ({ mediaShowcaseComponent }) => {
  const router = useRouter()

  // Refs and hooks for animation
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.8, once: false })
  const isFullyInView = useInView(sectionRef, { amount: 1, once: false })
  const isVideoInView = useInView(videoRef, { amount: 0.8 })
  const controls = useAnimation()
  const textControls = useAnimation()

  // State management
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isVideoExpanded, setIsVideoExpanded] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Safe props access
  const title = mediaShowcaseComponent?.title ?? ""
  const youtubeUrl = mediaShowcaseComponent?.youtubeUrl ?? ""
  const label = mediaShowcaseComponent?.label ?? ""
  const description = mediaShowcaseComponent?.description ?? ""

  // Animation and scroll behavior
  useEffect(() => {
    if (!isMobile && isInView && sectionRef.current) {
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: sectionTop, behavior: "smooth" })
    }
    // Always trigger animations regardless of device
    controls.start("visible")
    textControls.start("visible")
  }, [isInView, controls, textControls, isMobile])

  // Video expansion logic
  useEffect(() => {
    if (isMobile) {
      setIsVideoExpanded(true) // Always expanded on mobile
    } else {
      setIsVideoExpanded(!isFullyInView)
    }
  }, [isFullyInView, isMobile])

  // Dark mode handling
  useEffect(() => {
    if (isMobile) {
      setIsDarkMode(isInView) // Dark mode based on section visibility on mobile
    } else {
      setIsDarkMode(isVideoInView) // Dark mode based on video visibility on desktop
    }
  }, [isVideoInView, isInView, isMobile])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  // Text animation - staggered appearance of characters
  const createTextVariants = (text: string | undefined) => {
    if (!text) return { hidden: {}, visible: {} }

    return {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.03,
        },
      },
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  // Create an array of characters from text
  const createLetterArray = (text: string | undefined) => {
    if (!text) return []
    return Array.from(text)
  }

  // Scroll button handler
  const scrollToContent = () => {
    if (sectionRef.current) {
      const sectionBottom = sectionRef.current.getBoundingClientRect().bottom + window.scrollY
      window.scrollTo({
        top: sectionBottom,
        behavior: "smooth",
      })
    }
  }
  return (
    <motion.section
      ref={sectionRef}
      className={`py-20 -mb-10 transition-colors duration-700 h-fit lg:h-[100vh] overflow-hidden relative
         ${isDarkMode ? "bg-black" : "bg-secondary"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <GridBackground isDarkMode={isDarkMode} />
      {/* Overlay for dark mode */}      <AnimatePresence>
        {isDarkMode && (
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* media */}
      <div className="container mx-auto px-0 mt-10 relative z-[1]">
        <motion.div
          className={`w-full ${isDarkMode ? "bg-black text-white" : "bg-[#F5F3ED]"} transition-colors duration-700`}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="mb-4 text-center lg:text-left">
            {/* Title with staggered character appearance */}
            <motion.h2
              className={` text-4xl md:text-5xl font-bold ${
                isDarkMode ? "text-white" : "text-neutral-800"
              } overflow-hidden`}
              variants={createTextVariants(title)}
              initial="hidden"
              animate={textControls}
            >
              {createLetterArray(title).map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h2>
          </div>

          <div className="rounded-lg overflow-hidden flex flex-col items-center justify-center md:flex-row">
            <motion.div
              ref={videoRef}
              className="w-full md:w-1/2 h-[300px] rounded-lg overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative h-[300px] md:h-full">
                {/* Pass isFullyVisible prop to YouTubeEmbed */}
                <YouTubeEmbed
                  url={youtubeUrl || ""}
                  aspectRatio="16:9"
                  className="absolute top-0 left-0 w-full h-full rounded-md"
                  isFullyVisible={isVideoExpanded}
                />
              </div>
            </motion.div>
            {/* Scroll button - desktop */}
            <motion.div
              className="flex justify-center mt-8 lg:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <motion.button
                onClick={scrollToContent}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  isDarkMode ? " text-primary/80" : "bg-gray-800 text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                scroll down
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
                  <ChevronDown className="h-5 w-5" />
                </motion.div>
              </motion.button>
            </motion.div>

            <motion.div
              className={`w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center ${isDarkMode ? "text-white" : ""}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h4
                className={` text-center lg:text-left text-2xl lg:text-3xl font-medium 
              ${isDarkMode ? "text-white" : "text-neutral-800"} mb-4`}
              >
                {label}
              </h4>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-neutral-500"
                } text-base lg:text-2xl mb-6 leading-7 my-10 text-neutral-400 text-center lg:text-left `}
              >
                {description}
              </p>
            </motion.div>
          </div>
        </motion.div>
        {/* scroll down - for mobile */}
        <motion.div
          className="lg:flex items-center justify-center mt-8 hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.button
            onClick={scrollToContent}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              isDarkMode ? " text-primary/80" : "bg-gray-800 text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            scroll down
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default MediaShowcase
