"use client"

import { useState, useEffect, useRef } from "react"

interface YouTubeEmbedProps {
  url: string
  className?: string
  aspectRatio?: "16:9" | "4:3" | "1:1"
  muted?: boolean
  isFullyVisible?: boolean
}

 const YouTubeEmbed:React.FC<YouTubeEmbedProps> = ({ url, className = "", aspectRatio = "16:9", muted = true }) => {
  const [videoId, setVideoId] = useState<string | null>(null)
  const [isInView, setIsInView] = useState(false)
  const videoRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Extract video ID from different YouTube URL formats
    const extractVideoId = (url: string): string | null => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      return match && match[2].length === 11 ? match[2] : null
    }

    setVideoId(extractVideoId(url))
  }, [url])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
      },
    )
    const container = containerRef.current
    if (container) {
      observer.observe(container)
    }

    return () => {
      if (container) {
        observer.unobserve(container)
      }
    }
  }, [videoId])

  // Set aspect ratio class
  const aspectRatioClass = {
    "16:9": "aspect-video",
    "4:3": "aspect-[4/3]",
    "1:1": "aspect-square",
  }[aspectRatio]

  if (!videoId) {
    return <div className={`bg-gray-100 ${aspectRatioClass} ${className}`}></div>
  }

  // Parameters to completely hide all YouTube UI elements:
  // - controls=0: Hide player controls
  // - showinfo=0: Hide video title and uploader info
  // - rel=0: Hide related videos
  // - iv_load_policy=3: Hide video annotations
  // - modestbranding=1: Hide YouTube logo (minimal branding)
  // - disablekb=1: Disable keyboard controls
  // - fs=0: Disable fullscreen button
  // - autoplay=1: Autoplay when loaded
  // - mute=1: Mute by default to allow autoplay
  // - loop=1: Loop the video
  // - playlist={videoId}: Required for loop to work
  // - playsinline=1: Play inline on mobile devices
  // - enablejsapi=0: Disable JavaScript API
  // - origin=1: Prevent cross-origin issues
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${
    isInView ? "1" : "0"
  }&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&mute=${
    muted ? "1" : "0"
  }&loop=1&playlist=${videoId}&playsinline=1&enablejsapi=0&origin=1&color=white`

  return (
    <div ref={containerRef} className={`w-full flex flex-col items-center justify-center overflow-hidden ${className}`}>
      <div className={`relative ${aspectRatioClass} w-full`}>
        <iframe
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full"
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={false}
          frameBorder="0"
          title="Embedded video"
        />
        {/* Overlay div to prevent interaction with the iframe */}
        <div
          className="absolute inset-0 z-10"
          onClick={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
        ></div>
      </div>
    </div>
  )
}

export default YouTubeEmbed

