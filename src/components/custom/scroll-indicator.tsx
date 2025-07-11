"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function ScrollIndicator() {
  return (
    <div className="translate-y-12 flex flex-col items-center justify-center absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-white">
      <motion.div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-sm font-light mb-2 opacity-80">Scroll Down</p>
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </div>
  )
}
