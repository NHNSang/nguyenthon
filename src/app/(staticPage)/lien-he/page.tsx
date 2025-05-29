'use client'
import Container from '@/components/custom/container'
import React from 'react'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaYoutube, FaBuilding, FaUsers, FaAward, FaProjectDiagram } from 'react-icons/fa'
import BackgroundForBreadcrumb from '@/components/custom/BackgroundForBreadcrumb'
import BreadcrumbComponent from '@/components/custom/breadcrumb/BreadcrumbComponent'
import { ArchitectureCarousel } from '@/components/custom/carousel/ArchitectureCarousel'
import ContactForm from '@/components/custom/forms/ContactForm'
import ContactFormTest from '@/components/custom/forms/contact-from-test'

const ContactPage = () => {
  const companyInfo = {
    name: 'Nguyễn Thông JP',
    address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
    phone: '+84 123 456 789',
    email: 'info@nguyenthongarchitects.com',
    socialMedia: {
      facebook: 'https://facebook.com/nguyenthongarchitects',
      instagram: 'https://instagram.com/nguyenthongarchitects',
      youtube: 'https://youtube.com/nguyenthongarchitects'
    },
    stats: {
      years: '15+',
      projects: '200+',
      team: '50+',
      awards: '25+'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <main className='bg-[#f5f5f3]'>
      <BackgroundForBreadcrumb 
        titleForPage='Liên hệ'
      />
      <Container className='py-20'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BreadcrumbComponent />
        </motion.div>

        {/* Company Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 mb-16'
        >
          <motion.div variants={itemVariants} 
          className='bg-white p-6 rounded-lg shadow-lg text-center '>
            <FaBuilding className='text-primary mx-auto mb-4' size={32} />
            <h3 className='text-3xl font-light text-gray-800 mb-2'>{companyInfo.stats.years}</h3>
            <p className='text-gray-600'>Năm kinh nghiệm</p>
          </motion.div>
          <motion.div variants={itemVariants} className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <FaProjectDiagram className='text-primary mx-auto mb-4' size={32} />
            <h3 className='text-3xl font-light text-gray-800 mb-2'>{companyInfo.stats.projects}</h3>
            <p className='text-gray-600'>Dự án hoàn thành</p>
          </motion.div>
          <motion.div variants={itemVariants} className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <FaUsers className='text-primary mx-auto mb-4' size={32} />
            <h3 className='text-3xl font-light text-gray-800 mb-2'>{companyInfo.stats.team}</h3>
            <p className='text-gray-600'>Thành viên</p>
          </motion.div>
          <motion.div variants={itemVariants} className='bg-white p-6 rounded-lg shadow-lg text-center'>
            <FaAward className='text-primary mx-auto mb-4' size={32} />
            <h3 className='text-3xl font-light text-gray-800 mb-2'>{companyInfo.stats.awards}</h3>
            <p className='text-gray-600'>Giải thưởng</p>
          </motion.div>
        </motion.div>

        {/* Architecture Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='mb-16'
        >
          <ArchitectureCarousel />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className='grid grid-cols-1 lg:grid-cols-2 gap-12'
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className='space-y-8'>
            <motion.div variants={itemVariants}>
              <h2 className='text-3xl font-light mb-4 text-gray-800'>
                Liên hệ với <span className='text-gray-400'>{companyInfo.name}</span>
              </h2>
              <p className='text-gray-600 mb-8'>
                Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy để lại thông tin, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className='space-y-6'>
              <div className='flex items-start space-x-4'>
                <FaMapMarkerAlt className='text-gray-400 mt-1' size={20} />
                <div>
                  <h3 className='text-lg font-medium text-gray-800'>Địa chỉ</h3>
                  <p className='text-gray-600'>{companyInfo.address}</p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <FaPhone className='text-gray-400 mt-1' size={20} />
                <div>
                  <h3 className='text-lg font-medium text-gray-800'>Điện thoại</h3>
                  <p className='text-gray-600'>{companyInfo.phone}</p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <FaEnvelope className='text-gray-400 mt-1' size={20} />
                <div>
                  <h3 className='text-lg font-medium text-gray-800'>Email</h3>
                  <p className='text-gray-600'>{companyInfo.email}</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className='pt-6'>
              <h3 className='text-lg font-medium text-gray-800 mb-4'>Kết nối với chúng tôi</h3>
              <div className='flex space-x-4'>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={companyInfo.socialMedia.facebook}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-600 hover:text-blue-600 transition-colors'
                >
                  <FaFacebook size={24} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={companyInfo.socialMedia.instagram}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-600 hover:text-pink-600 transition-colors'
                >
                  <FaInstagram size={24} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={companyInfo.socialMedia.youtube}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-600 hover:text-red-600 transition-colors'
                >
                  <FaYoutube size={24} />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          
          {/* <ContactForm 
          labelOfForm="Gửi thông tin"
          /> */}

          <ContactFormTest 
          labelOfForm='Gửi thông tin'
          />


        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className='mt-16'
        >
          <h3 className='text-2xl font-light text-gray-800 mb-6'>Vị trí văn phòng</h3>
          <div className='h-[400px] rounded-lg overflow-hidden shadow-lg'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4245999999997!2d106.69999999999999!3d10.7769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b00000000%3A0x0!2zMTAuNzc2OSwgMTA2LjcwMDAw!5e0!3m2!1svi!2s!4v1234567890'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </motion.div>
      </Container>
    </main>
  )
}

export default ContactPage