"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, useAnimation } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)
  const innerDotControls = useAnimation()
  const circleControls = useAnimation()

  // Shared animation parameters for consistent behavior
  const sharedAnimationParams = useMemo(() => ({
    type: "spring",
    mass: 1.2,
    damping: 35,
    stiffness: 70,
    velocity: 2,
    restDelta: 0.001,
    duration: 0.5,
  }), [])

  // Shared wobble effect parameters
  const getWobbleEffect = (isClose: boolean) => {
    return {
      rotate: isClose ? [0, -2, 3, -2, 0] : 0,
      scale: isClose ? [1, 1.05, 0.98, 1.02, 1] : 1,
    }
  }

  useEffect(() => {
    setIsClient(true)

    const updateMousePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setMousePosition(newPosition)

      // Inner dot animation with 0.2s delay
      setTimeout(() => {
        // Calculate distance to cursor for wobble effect
        const innerDotDistance = 5
        const isClose = innerDotDistance < 10

        innerDotControls.start({
          x: newPosition.x - 6,
          y: newPosition.y - 6,
          ...getWobbleEffect(isClose),
          transition: sharedAnimationParams,
        })
      }, 200) // 0.2 second delay

      // Circle animation with 0.5s delay
      setTimeout(() => {
        // Calculate distance to cursor for wobble effect
        const circleDistance = 5
        const isClose = circleDistance < 10

        circleControls.start({
          x: newPosition.x - 32,
          y: newPosition.y - 32,
          ...getWobbleEffect(isClose),
          transition: sharedAnimationParams,
        })
      }, 500) // 0.5 second delay
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [innerDotControls, circleControls, sharedAnimationParams])

  if (!isClient) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Inner dot with 0.2s delay */}
      <motion.div
        className="w-3 h-3 rounded-full bg-primary-foreground fixed top-0 left-0"
        initial={{ x: 0, y: 0 }}
        animate={innerDotControls}
      />

      {/* Outer circle with 0.5s delay */}
      <motion.div
        className="w-16 h-16 rounded-full border-[1px]  border-primary fixed top-0 left-0"
        initial={{ x: 0, y: 0 }}
        animate={circleControls}
      />
    </div>
  )
}
