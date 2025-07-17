import Image from "next/image";
import { useState } from "react";

const ImgVideoAuto = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="relative w-full h-64 md:h-[400px] lg:h-[500px] max-w-4xl mx-auto my-12">
      {/* Thumbnail image */}
      <Image
        src="https://aqua-pigeon-769011.hostingersite.com/wp-content/uploads/2025/07/IMG_2896.jpg" // 🔁 Thay bằng ảnh thật
        alt="Video thumbnail"
        className="w-full h-full object-cover shadow-lg"
      />

      {/* Play button */}
      <button
        onClick={() => setShowVideo(true)}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 bg-white/80 hover:bg-white/90 rounded-full flex items-center justify-center shadow-lg transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-black"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </button>

      {/* Popup Video */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Background overlay: mờ và blur */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowVideo(false)}
          />

          {/* Video container */}
          <div className="relative w-full max-w-3xl aspect-video z-50">
            {/* Nút đóng (trên phải của video) */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-2 -right-0  text-white text-3xl w-10 h-10 z-50"
            >
              ×
            </button>

            {/* Video element */}
            <iframe
              src="https://www.youtube.com/embed/p2bcBTGttqQ?autoplay=1&mute=1"
              title="YouTube video"
              className="w-full h-full"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImgVideoAuto;
