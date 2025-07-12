"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import NumberCounter from "./NumberCounter";

const archievementArr = [
  {
    title: "Số năm kinh nghiệm",
    number: 9,
  },
  {
    title: "Dự án triển khai",
    number: 200,
  },
  {
    title: "Công trình hoàn thành",
    number: 50,
  },
  {
    title: "Mức độ hài lòng (%)",
    number: 100,
  },
];
const stats = [
  { number: 300, label: "CÔNG TRÌNH", sublabel: "ĐÃ HOÀN THÀNH" },
  { number: 97, label: "TỶ LỆ KHÁCH HÀNG", sublabel: "HÀI LÒNG TUYỆT ĐỐI" },
  { number: 80, label: "DỰ ÁN THỰC HIỆN", sublabel: "TRONG & NGOÀI NƯỚC" },
  { number: 40, label: "THÀNH VIÊN", sublabel: "CHUYÊN NGHIỆP & TẬN TÂM" },
];
const projects = [
  {
    title: "Tư vấn khách hàng",
    content:
      "Chúng tôi lắng nghe yêu cầu của bạn và đưa ra những tư vấn chuyên môn về giải pháp tối ưu nhất cho nhu cầu và không gian của bạn.",
  },
  {
    title: "Thiết kế phương án",
    content:
      "Đội ngũ thiết kế của chúng tôi sẽ tạo ra bản vẽ chi tiết, phù hợp với yêu cầu cụ thể của bạn.",
  },
  {
    title: "Thi công công trình",
    content:
      "Công trình được thi công bởi đội ngũ thợ lành nghề, sử dụng vật liệu chất lượng cao và quy trình thi công chuyên nghiệp.",
  },
  {
    title: "Hoàn thiện & Bàn giao",
    content:
      "Đội ngũ chuyên gia của chúng tôi sẽ hoàn thiện công trình một cách nhanh chóng và hiệu quả, đảm bảo chất lượng.",
  },
];

const NumberOfAchievements = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState(stats.map(() => 0));

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      const duration = 1000; // ms
      const frameRate = 30; // fps
      const totalFrames = Math.round(duration / (1000 / frameRate));

      stats.forEach((stat, index) => {
        let frame = 0;
        const increment = stat.number / totalFrames;

        const interval = setInterval(() => {
          frame++;
          setAnimatedNumbers((prev) => {
            const newValues = [...prev];
            newValues[index] = Math.min(
              Math.round(increment * frame),
              stat.number
            );
            return newValues;
          });

          if (frame >= totalFrames) clearInterval(interval);
        }, 1000 / frameRate);
      });

      setHasAnimated(true);
    }
  }, [inView, hasAnimated, stats]);
  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <div className="w-full  flex flex-col justify-center items-center bg-white">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-2xl md:text-[48px] mb-2 lg:mb-6 uppercase tracking-[5px] lg:tracking-[8px] font-semibold">
            Tại sao chọn <span className="text-primary">chúng tôi</span>
          </h1>
        </motion.div>
      </div>
      <section className="w-full pt-8 bg-white" ref={ref}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center"
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute text-[75px] md:text-[75px] font-bold text-stroke-gray select-none">
                  {animatedNumbers[index]}
                </span>
                <span className="text-5xl font-bold text-black z-10">
                  {animatedNumbers[index]}
                </span>
              </div>
              <div className="mt-2 uppercase text-lg md:text-xl font-semibold text-[#AC7A49]">
                {item.label}
              </div>
              <div className="text-sm text-gray-700 font-medium">
                {item.sublabel}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
        {/* LEFT: Image or Video */}
        <div className="relative w-full h-64 md:h-[400px] lg:h-[500px] max-w-4xl mx-auto my-12">
          {/* Thumbnail image */}
          <img
            src="https://aqua-pigeon-769011.hostingersite.com/wp-content/uploads/2025/07/IMG_2896.jpg" // 🔁 Thay bằng ảnh thật
            alt="Video thumbnail"
            className="w-full h-full object-cover shadow-lg object-fill"
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
                  src="https://www.youtube.com/embed/p2bcBTGttqQ"
                  title="YouTube video"
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Title + Accordion */}
        <div className="flex flex-col justify-center mr-0 lg:mr-[50px] mb-5 lg:mb-0">
          <h1 className="text-2xl md:text-[35px] mb-2 lg:mb-6 uppercase tracking-[5px] lg:tracking-[8px] font-semibold text-center lg:text-left">
            Quy trình <span className="text-primary">làm việc</span>
          </h1>
          <ul className="space-y-4">
            {projects.map((proj, idx) => (
              <li key={idx} className="border-b border-gray-300 pt-4">
                <div
                  className="flex justify-between items-center cursor-pointer text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => toggleIndex(idx)}
                >
                  <span className="text-[#5f5c5c] text-base px-5 lg:px-0 lg:text-lg line-clamp-2 lg:line-clamp-3 uppercase tracking-[1px] font-medium">
                    {proj.title}
                  </span>
                  <span className="text-2xl select-none">
                    {openIndex === idx ? "−" : "+"}
                  </span>
                </div>
                {openIndex === idx && (
                  <div className="text-[#5f5c5c] text-base px-5 lg:px-0 lg:text-base line-clamp-2 lg:line-clamp-3 tracking-[1px] font-normal">
                    {proj.content}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default NumberOfAchievements;
