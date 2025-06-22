'use client'

import { motion } from 'framer-motion'
import { FaPhone, FaClock, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import Link from 'next/link'

type SecondaryHeaderProps = {
  textColor: string;
}
const SecondaryHeader = ({textColor }: SecondaryHeaderProps) => {
  const contactInfo = [
    {
      icon: <FaPhone className="text-primary" />,
      text: "(+84)0912842727",
      link: "tel:+840912842727"
    },
    {
      icon: <FaEnvelope className="text-primary" />,
      text: "info@nguyenthongjp.com",
      link: "mailto:info@nguyenthongjp.com"
    },
    // {
    //   icon: <FaClock className="text-primary" />,
    //   text: "Thứ 2 - Chủ nhật: 8:00 - 18:00",
    //   link: null
    // }
  ]

  const socialLinks = [
    {
      icon: <FaFacebook />,
      link: "https://facebook.com/nguyenthongjp",
      label: "Facebook"
    },
    {
      icon: <FaInstagram />,
      link: "https://instagram.com/nguyenthongjp",
      label: "Instagram"
    },
    {
      icon: <FaLinkedin />,
      link: "https://linkedin.com/company/nguyenthongjp",
      label: "LinkedIn"
    }
  ]

  return (
    <div className=" hidden md:block bg-transparent border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-3">
          {/* Contact Information */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 mb-4 md:mb-0">
            {contactInfo.map((item, index) => (
              // <motion.div
              //   key={index}
              //   initial={{ opacity: 0, y: 20 }}
              //   animate={{ opacity: 1, y: 0 }}
              //   transition={{ duration: 0.5, delay: index * 0.1 }}
              //   className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
              // >
              //   {item.icon}
              //   {item.link ? (
              //     <Link href={item.link} className="text-sm hover:text-primary transition-colors">
              //       {item.text}
              //     </Link>
              //   ) : (
              //     <span className="text-sm">{item.text}</span>
              //   )}
              // </motion.div>
              <div key={index} className={`flex items-center gap-2 ${textColor}  hover:text-primary `}>
                {item.icon}
                {item.link ? (
                  <Link href={item.link} className="text-base hover:text-primary transition-colors">
                    {item.text}
                  </Link>
                ) : (
                  <span className="text-sm">{item.text}</span>
                )}
              </div>
            ))}
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              // <motion.a
              //   key={index}
              //   href={social.link}
              //   target="_blank"
              //   rel="noopener noreferrer"
              //   initial={{ opacity: 0, scale: 0.8 }}
              //   animate={{ opacity: 1, scale: 1 }}
              //   transition={{ duration: 0.5, delay: index * 0.1 }}
              //   className="text-gray-400 hover:text-primary transition-colors"
              //   aria-label={social.label}
              // >
              //   <span className="text-lg">{social.icon}</span>
              // </motion.a>
              <div key={index} className=" hover:text-primary transition-colors">
                <Link href={social.link} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                  <span className={`text-xl ${textColor}`}>{social.icon}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecondaryHeader
