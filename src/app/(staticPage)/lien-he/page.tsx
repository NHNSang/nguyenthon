"use client";
import Container from "@/components/custom/container";
import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaBuilding,
  FaUsers,
  FaAward,
  FaProjectDiagram,
} from "react-icons/fa";
import BackgroundForBreadcrumb from "@/components/custom/BackgroundForBreadcrumb";
import BreadcrumbComponent from "@/components/custom/breadcrumb/BreadcrumbComponent";
import { ArchitectureCarousel } from "@/components/custom/carousel/ArchitectureCarousel";
import ContactForm from "@/components/custom/forms/ContactForm";
import ContactFormTest from "@/components/custom/forms/contact-from-test";
import ContactInfor from "@/components/custom/contact-info/contact-infor";
import ContactInforV2 from "@/components/custom/contact-info-v2/contact-info-v2";

const ContactPage = () => {
  const companyInfo = {
    name: "Nguyễn Thông JP",
    address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
    phone: "+84 123 456 789",
    email: "info@nguyenthongarchitects.com",
    socialMedia: {
      facebook: "https://facebook.com/nguyenthongarchitects",
      instagram: "https://instagram.com/nguyenthongarchitects",
      youtube: "https://youtube.com/nguyenthongarchitects",
    },
    stats: {
      years: "15+",
      projects: "200+",
      team: "50+",
      awards: "25+",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <main className="bg-white font-calibri pt-[60px] lg:pt-[80px] ">
      {/* <BackgroundForBreadcrumb titleForPage="Liên hệ" /> */}
      <Container className="">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* <BreadcrumbComponent /> */}
        </motion.div>

        {/* Company Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 mb-6 w-[80%]  mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white border border-primary p-4 shadow-xl text-center  "
          >
            <FaBuilding className="text-primary mx-auto mb-2" size={32} />
            <h3 className="text-3xl  font-semibold text-gray-600">
              {companyInfo.stats.years}
            </h3>
            <p className="text-gray-600">Năm kinh nghiệm</p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-white border border-primary p-4 shadow-xl text-center"
          >
            <FaProjectDiagram className="text-primary mx-auto mb-2" size={32} />
            <h3 className="text-3xl  font-semibold text-gray-600">
              {companyInfo.stats.projects}
            </h3>
            <p className="text-gray-600">Dự án hoàn thành</p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-white border border-primary p-4 shadow-xl text-center"
          >
            <FaUsers className="text-primary mx-auto mb-2" size={32} />
            <h3 className="text-3xl  font-semibold text-gray-600">
              {companyInfo.stats.team}
            </h3>
            <p className="text-gray-600">Thành viên</p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-white border border-primary p-4 shadow-xl text-center"
          >
            <FaAward className="text-primary mx-auto mb-2" size={32} />
            <h3 className="text-3xl  font-semibold text-gray-600">
              {companyInfo.stats.awards}
            </h3>
            <p className="text-gray-600">Giải thưởng</p>
          </motion.div>
        </motion.div>

        {/* Contact Infor v1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6"
        >
          <ContactInforV2 />
        </motion.div>

        {/* Contact Infor v2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6"
        >
          <ContactInfor />
        </motion.div>
      </Container>
    </main>
  );
};

export default ContactPage;
