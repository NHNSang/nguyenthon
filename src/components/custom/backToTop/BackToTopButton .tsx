"use client"
import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [isPointingUp, setIsPointingUp] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 800px
      if (window.scrollY > 800) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }

      // Calculate scroll progress (0 to 1)
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = window.scrollY / scrollHeight
      setScrollProgress(currentProgress)

      // Check if we're near the bottom (within 50px)
      const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50
      setIsAtBottom(nearBottom)

      // Update arrow direction based on scroll position
      // If we're more than halfway through the page, point up
      setIsPointingUp(currentProgress > 0.5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = () => {
    if (isPointingUp) {
      // Scroll to top when arrow points up
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    } else {
      // Scroll to bottom when arrow points down
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      })
    }
  }

  // Calculate the circle circumference
  const circleRadius = 18
  const circleCircumference = 2 * Math.PI * circleRadius
  const strokeDashoffset = circleCircumference * (1 - scrollProgress)

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          className="fixed z-50 bottom-10 right-5 w-12 h-12 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
        >
          {/* Background circle */}
          <motion.div
            className="absolute w-12 h-12 rounded-full bg-primary shadow-md shadow-neutral-500"
            animate={{
              backgroundColor: isPointingUp ? "#d0ac80" : "#000000",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Progress circle */}
          <svg className="absolute w-12 h-12" viewBox="0 0 50 50">
            <motion.circle
              cx="25"
              cy="25"
              r={circleRadius}
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 25 25)"
              className="opacity-80"
            />
          </svg>

          {/* Icon */}
          <motion.div
            className="relative text-white z-10"
            animate={{
              rotate: isPointingUp ? 0 : 180,
              y: isPointingUp ? 0 : 2,
            }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUp size={20} />
          </motion.div>

          {/* Text indicator */}
          <motion.span
            className="absolute -bottom-6 text-xs font-medium text-primary whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {isPointingUp ? "Back to top" : "Go to bottom"}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default BackToTopButton
