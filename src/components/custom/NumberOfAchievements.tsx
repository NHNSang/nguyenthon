"use client";
import React from "react";
import { motion } from "framer-motion";
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

const NumberOfAchievements = () => {
  return (
    <div className=" bg-[#F5F5F5] w-full py-10">
      <h2 className="text-center text-3xl md:text-4xl font-light leading-10 mb-5">
        Tại sao chọn chúng tôi
      </h2>

      <motion.div
        whileInView={{ opacity: 1, translateX: 0 }}
        initial={{ opacity: 0, translateX: 100 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className=" grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5 px-2 lg:px-2 w-[1000px] mx-auto text-red-600 "
      >
        {archievementArr.map((item, index) => (
          <NumberCounter
            key={index}
            title={item.title}
            from={0}
            to={item.number}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default NumberOfAchievements;
