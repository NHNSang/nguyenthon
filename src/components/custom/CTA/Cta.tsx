"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DEFAULT_COMPANY_NAME } from "@/lib/constants"
import MainBtn from "../buttons/main-btn"
import { Contact } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, useAnimation, useInView } from "framer-motion"

export default function CTASection() {
  const router = useRouter()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  // Animation controls
  const containerControls = useAnimation()
  const headingControls = useAnimation()
  const companyNameControls = useAnimation()
  const paragraphControls = useAnimation()
  const buttonsControls = useAnimation()

  // Trigger animations when section comes into view
  useEffect(() => {
    if (isInView) {
      // Start animations in sequence
      containerControls.start("visible")

      // Heading animation
      setTimeout(() => {
        headingControls.start("visible")
      }, 300)

      // Company name highlight
      setTimeout(() => {
        companyNameControls.start("visible")
      }, 800)

      // Paragraph animation
      setTimeout(() => {
        paragraphControls.start("visible")
      }, 1000)

      // Buttons animation
      setTimeout(() => {
        buttonsControls.start("visible")
      }, 1300)
    }
  }, [isInView, containerControls, headingControls, companyNameControls, paragraphControls, buttonsControls])

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Heading variants
  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Company name variants
  const companyNameVariants = {
    hidden: { opacity: 0.5, scale: 1 },
    visible: {
      opacity: 1,
      scale: [1, 1.05, 1],
      color: ["#9ca3af", "#d5b78f", "#9ca3af"],
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  }

  // Paragraph variants
  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Button variants
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  }

  // Secondary button variants
  const secondaryButtonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.section
      className="py-20 container bg-primary/30 rounded-md"
      ref={sectionRef}
      initial="hidden"
      animate={containerControls}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-light mb-6"
            initial="hidden"
            animate={headingControls}
            variants={headingVariants}
          >
            Bạn đang cần hổ trợ tư vấn bởi đội ngũ kiến trúc sư{" "}
            <motion.span
              className="text-gray-400"
              initial="hidden"
              animate={companyNameControls}
              variants={companyNameVariants}
            >
              {`${DEFAULT_COMPANY_NAME}`}
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto"
            initial="hidden"
            animate={paragraphControls}
            variants={paragraphVariants}
          >
            Liên hệ với chúng tôi ngay hôm nay nếu bạn đang cần hổ trợ tư vấn thiết kế, mọi chi phí đều miễn phí đến khi
            bạn tìm được phương án phù nhất cho dự án của mình
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div 
            className="flex flex-col justify-center"
            initial="hidden" animate={buttonsControls} variants={buttonVariants} whileHover="hover">
              <MainBtn href="lien-he" text="Liên hệ" icon={<Contact className="w-4 h-4" />} />
            </motion.div>

            <motion.div
              initial="hidden"
              animate={buttonsControls}
              variants={secondaryButtonVariants}
              whileHover="hover"
            >
              <Button
                variant="link"
                onClick={() => router.push("/du-an")}
                className="underline border-black text-black hover:text-primary rounded-full px-8 py-6 text-lg"
              >
                Xem các dự án
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
