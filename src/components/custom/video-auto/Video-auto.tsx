import React, { useRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const VideoAuto = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true, // chỉ kích hoạt một lần
    threshold: 0.5, // 50% video nằm trong màn hình mới chạy
  });

  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    if (inView && videoSrc === "") {
      // Khi video trong khung nhìn → set src có autoplay
      setVideoSrc(
        "https://www.youtube.com/embed/p2bcBTGttqQ?autoplay=1&mute=1"
      );
    }
  }, [inView, videoSrc]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="aspect-video w-full max-w-3xl mx-auto mt-10"
    >
      {videoSrc && (
  <iframe
    ref={iframeRef}
    width="100%"
    height="100%"
    src={videoSrc}
    allow="autoplay; encrypted-media"
    allowFullScreen
    title="YouTube Video"
    className="w-full h-full"
  ></iframe>
)}
    </motion.div>
  );
};

export default VideoAuto;
