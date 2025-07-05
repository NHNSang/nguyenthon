"use client";

import Logo from "@/components/custom/header/logo";
import { MapPin, PhoneIcon } from "lucide-react";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";

const SecondaryHeader = () => {
  const informationCompany = [
    {
      icon: <MapPin className="text-primary w-10 h-10" />,
      title: "Địa Chỉ:",
      Content: <p>119 Lê Ấm, Quận Cẩm Lệ, TP. Đà Nẵng</p>,
    },
    {
      icon: <PhoneIcon className="w-10 h-10 text-primary" />,
      title: "Hotline:",
      Content: <Link href="tel:0905 123 456">0912842727</Link>,
    }
  ]

  const socialLinks = [
    {
      icon: <FaFacebook />,
      link: "https://facebook.com/nguyenthongjp",
      label: "Facebook",
    },
    {
      icon: <FaInstagram />,
      link: "https://instagram.com/nguyenthongjp",
      label: "Instagram",
    },
    {
      icon: <FaLinkedin />,
      link: "https://linkedin.com/company/nguyenthongjp",
      label: "LinkedIn",
    },
  ];

  return (
    <div className="bg-white flex flex-row juss' lg:justify-around  items-center px-10 py-1 lg:py-5">
      {/* logo */}
      <Logo />
      <div className="gap-2 items-center justify-center hidden lg:flex flex-row">
        <div className="grid grid-cols-2 gap-12">
          {/* address */}
          {informationCompany.map((info, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-start gap-10 cursor-pointer">
              <div className="w-10 h-10">
                {info.icon}
              </div>
              <div className="flex flex-col items-start justify-start">
                <span className="text-primary text-[16px] font-bold">
                  {info.title}
                </span>
                <div
                  className="hover:text-primary text-[16px] font-extrabold curosr-pointer">
                  {info.Content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondaryHeader;
