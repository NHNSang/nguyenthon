"use client"
import type React from "react"
import { JetBrains_Mono } from "next/font/google"
import Image from "next/image"
import MainBtn from "../buttons/main-btn"
import { Book } from "lucide-react"
import LastestArticleForHero from "./lastest-article-for-hero"
import type { Hero, LastestPosts } from "@/types/typeForWordpressData"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import ScrollIndicator from "../scroll-indicator"

const font = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

interface HeroSectionProps {
  hero: Hero
  posts: LastestPosts["posts"]["edges"]
}

const HeroSection: React.FC<HeroSectionProps> = ({ hero, posts }) => {
  // State to control when animations should start
  const [isLoaded, setIsLoaded] = useState(false)

  // Set isLoaded to true after component mounts
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Animation variants for background image
  const imageVariants = {
    initial: {
      scale: 1.2,
      x: 0,
    },
    animate: {
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  }

  // Animation variants for the button
  const buttonVariants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 3.2, // Start after text animation completes
        ease: "easeOut",
      },
    },
  }

  // Animation variants for the latest articles
  const articlesVariants = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 4, // Start after button animation
        ease: "easeOut",
      },
    },
  }

  // Split the title into individual characters for animation
  const titleChars = hero.titleOfHero.split("")

  return (
    <section className="relative max-w-[95%] h-[80vh] md:h-[600px] mx-auto rounded-3xl overflow-hidden mt-0 md:mt-10 lg:mt-16">
      {/* Hero Image with animation */}
      <motion.div
        className="absolute left-0 top-0 inset-0 rounded-xl w-full h-full"
        variants={imageVariants}
        initial="initial"
        animate={isLoaded ? "animate" : "initial"}
      >
        <Image
          src={hero.imgSource?.node?.sourceUrl || "/placeholder.svg"}
          alt={hero.titleOfHero}
          height={1200}
          width={1920}
          className="object-cover w-full h-full"
          priority
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45"></div>

      {/* Content */}
      <div
        className="w-full absolute top-[25%] lg:top-[20%] z-10 lg:px-20 
            flex flex-col justify-end items-start md:text-start 
            px-4 group group-hover:backdrop-blur-sm transition duration-300 text-center tracking-wider"
      >
        {/* tiêu đề banner */}
        <div className="w-full flex flex-col justify-center">
          <h2 className="flex flex-row justify-center items-center lg:justify-start text-xl lg:text-5xl font-light text-white  max-w-6xl text-center lg:text-left">
            {/* <span className={`${font.className} text-center font-semibold flex flex-wrap`}> */}
            <span className='text-center font-calibri flex flex-wrap'>
              {titleChars.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{
                    duration: 0.1,
                    delay: index * (3 / titleChars.length), // Distribute the 3s across all characters
                    ease: "easeOut",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </h2>
        </div>
        <div className="w-full flex flex-col gap-2 text-center lg:text-left">
          {/* <h2 className="text-4xl lg:text-6xl font-extrabold text-primary"> */}
          <h2 className="text-4xl lg:text-6xl font-calibri text-primary">
            {hero.companyName}
          </h2>
        </div>




      </div>
      {/* button CTA */}
      <div className="absolute w-full bottom-[50%] flex flex-row justify-center lg:justify-start lg:px-2">
        <motion.div
          className="flex flex-col justify-center lg:justify-start sm:flex-row gap-4 mt-10 w-8/12 lg:px-20"
          variants={buttonVariants}
          initial="initial"
          animate={isLoaded ? "animate" : "initial"}
        >
          <MainBtn text={hero.btnLabel} icon={<Book className="w-5 h-5" />} href={hero.btnSlug} />
        </motion.div>
      </div>
      {/* /* Scroll Indicator */}
      <ScrollIndicator />

      {/* Latest articles with animation */}
      <motion.div variants={articlesVariants} initial="initial" animate={isLoaded ? "animate" : "initial"}>
        <LastestArticleForHero posts={posts} />
      </motion.div>
    </section>
  )
}

export default HeroSection
