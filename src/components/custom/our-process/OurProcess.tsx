"use client"

import { useRef, useState, useEffect } from "react"
import ImageCarousel from "../carousel/ImageCarousel"
import { motion, useAnimation, useInView, type Variants } from "framer-motion"
import MainBtn from "../buttons/main-btn"
import { PersonIcon } from "@radix-ui/react-icons"

const steps = [
  {
    number: "01",
    title: "Tư vấn khách hàng",
    description:
      "Chúng tôi lắng nghe yêu cầu của bạn và đưa ra những tư vấn chuyên môn về giải pháp tối ưu nhất cho nhu cầu và không gian của bạn.",
  },
  {
    number: "02",
    title: "Thiết kế phương án",
    description: "Đội ngũ thiết kế của chúng tôi sẽ tạo ra bản vẽ chi tiết, phù hợp với yêu cầu cụ thể của bạn.",
  },
  {
    number: "03",
    title: "Thi công công trình",
    description:
      "Công trình được thi công bởi đội ngũ thợ lành nghề, sử dụng vật liệu chất lượng cao và quy trình thi công chuyên nghiệp.",
  },
  {
    number: "04",
    title: "Hoàn thiện & Bàn giao",
    description:
      "Đội ngũ chuyên gia của chúng tôi sẽ hoàn thiện công trình một cách nhanh chóng và hiệu quả, đảm bảo chất lượng.",
  },
]

// Letter animation variants
const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.05, // Base delay + staggered delay per letter
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function OurProcessSection() {
  const [activeStep, setActiveStep] = useState(0)

  // Refs for viewport detection
  const sectionRef = useRef(null)
  const part1Ref = useRef(null)
  const part2Ref = useRef(null)
  const part3Ref = useRef(null)

  // Check if elements are in viewport
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const part1InView = useInView(part1Ref, { once: true, amount: 0.5 })
  const part2InView = useInView(part2Ref, { once: true, amount: 0.3 })
  const part3InView = useInView(part3Ref, { once: true, amount: 0.3 })

  // Animation controls
  const part1Controls = useAnimation()
  const part2Controls = useAnimation()
  const part3Controls = useAnimation()
  const carouselControls = useAnimation()
  const textControls = useAnimation()
  const buttonControls = useAnimation()

  // Split text for letter animation
  const taglineText = "rõ ràng và chuyên nghiệp"
  const taglineLetters = taglineText.split("")

  // Trigger animations when elements come into view
  useEffect(() => {
    if (part1InView) {
      part1Controls.start("visible")

      // Trigger part 2 animation after part 1 with delay
      setTimeout(() => {
        part2Controls.start("visible")
      }, 700) // 0.5s + some buffer
    }
  }, [part1InView, part1Controls, part2Controls])

  useEffect(() => {
    if (part2InView) {
      // Trigger part 3 animations after part 2 with delay
      setTimeout(() => {
        carouselControls.start("visible")
        textControls.start("visible")

        // Button appears last
        setTimeout(() => {
          buttonControls.start("visible")
        }, 400)
      }, 300)
    }
  }, [part2InView, carouselControls, textControls, buttonControls])

  return (
    <section className="py-10 bg-[#F5F5F5]"  ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* part 1 */}
        <div className="max-w-3xl mx-auto text-center mb-2" ref={part1Ref}>
          <motion.h2
            className="text-3xl md:text-4xl font-light mb-8 text-black"
            initial={{ opacity: 0, y: -30 }}
            animate={part1Controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            Quy trình làm việc
          </motion.h2>
          {/* <div className="text-2xl text-neutral-500 -translate-y-6 overflow-hidden">
            <motion.span className="inline-block" initial="hidden" animate={part1Controls}>
              {" "}
              {taglineLetters.map((letter, index) => (
                <motion.span key={index} custom={index} variants={letterVariants} className="inline-block">
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.span>
          </div> */}
        </div>

        {/* part 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" ref={part2Ref}>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={part2Controls}
              variants={{
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.3, // Staggered delay
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              className="p-6 rounded-lg cursor-pointer"
              style={{
                backgroundColor: activeStep === index ? "#d5b78f" : "#F1EDE6",
                color: activeStep === index ? "white" : "inherit",
              }}
              onClick={() => setActiveStep(index)}
            >
              <motion.div
                className="text-4xl font-bold mb-4"
                animate={{ color: activeStep === index ? "white" : "#d5b78f" }}
                transition={{ duration: 0.3 }}
              >
                - {step.number}
              </motion.div>
              <h3 className="text-xl font-light mb-3">{step.title}</h3>
              <p className="text-gray-600 text-lg font-light">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* part 3 */}
        {/* <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8" ref={part3Ref}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={carouselControls}
            variants={{
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            <ImageCarousel onSlideChange={setActiveStep} />
          </motion.div>

          <div className="flex flex-col justify-center items-center lg:items-start">
            <motion.div
              className="flex flex-col justify-around lg:justify-start my-5 text-center lg:text-left gap-5"
              initial={{ opacity: 0, x: 50 }}
              animate={textControls}
              variants={{
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <h2 className="text-3xl md:text-4xl mb-6 text-primary-foreground font-bold">Chất lượng thiết kế</h2>
              <span className="text-2xl text-neutral-500">"luôn được đặt lên hàng đầu"</span>
            </motion.div>

            <motion.p
              className="text-gray-600 text-lg mb-6 text-center lg:text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={textControls}
              variants={{
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.8,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              Tại Nguyên Thống JP, chúng tôi tự hào về chất lượng công trình kiến trúc. Mỗi dự án đều được thực hiện bởi
              đội ngũ kỹ sư, kiến trúc sư giàu kinh nghiệm, sử dụng vật liệu cao cấp.
            </motion.p>

            <motion.p
              className="text-gray-600 text-lg text-center lg:text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={textControls}
              variants={{
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              Chúng tôi tập trung vào việc tạo ra những không gian đẹp, tiện dụng và bền vững. Sự chú ý đến từng chi
              tiết và cam kết về chất lượng đảm bảo rằng công trình của bạn sẽ là một tài sản giá trị cho gia đình trong
              nhiều năm tới.
            </motion.p>

            <motion.div
              className="w-[250px] mt-10 flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={buttonControls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <MainBtn
                icon={<PersonIcon />}
                text="Đặt lịch tư vấn"
                href="https://www.facebook.com/nguyenthongjpconstruction/"
              />
            </motion.div>
          </div>
        </div> */}
      </div>
    </section>
  )
}
