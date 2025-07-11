"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface TitleProps {
  title: string;
  subtitle?: string;
  text?: string;
  islightBg?: boolean;
  isLeftPosition?: boolean;
}

const Title: React.FC<TitleProps> = ({
  title,
  subtitle,
  text,
  islightBg,
  isLeftPosition,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className={`w-full mb-5 flex flex-col lg:w-[80%] mx-auto 
    ${isLeftPosition ? "items-start justify-end" : "items-center justify-center "}
    `}
    >
      <div
        className={`
        ${isLeftPosition ? "items-start justify-start" : "items-center justify-center mx-auto"}
        flex flex-col w-12/12 md:w-9/12 gap-1`}
      >
        {/* <p className={`text-primary text-center md:text-left text-sm font-[700] border-l-[2px] border-secondary inline-block pl-2 py-1
          `}>
          {subtitle}
        </p> */}
        <h2
          className={`bg-[#D5B78F] w-full py-1 text-center text-3xl md:text-2xl font-[300px] rounded-t-lg uppercase
          ${islightBg ? "" : "text-white"}
          `}
        >
          {title}
        </h2>
        <p
          className={` bg-[#F5F5F3] w-full  py-1  text-gray-600 text-lg  line-clamp-2  shadow-xl
          ${islightBg ? "text-gray-600" : "text-white"}
          ${isLeftPosition ? "text-left" : "text-center"}
        `}
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
};

export default Title;
