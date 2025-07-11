'use client'
import React from 'react'
import Container from '@/components/custom/container'
import Image from 'next/image'
import { AboutType } from '@/types/typeForWordpressData'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import MainBtn from '../buttons/main-btn'
import { ChevronRight } from 'lucide-react'

const AboutUs = ({ about }: { about: AboutType['abouts']['nodes'] }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    })

    return (
        <section className='relative py-16 md:py-24 bg-gradient-to-b from-white to-neutral-50'>
            <Container className='relative'>
                {about?.map((item, index) => (
                    <div
                        key={index}
                        ref={ref}
                        className='flex flex-col lg:flex-row items-center gap-12 lg:gap-20'
                    >
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='flex-1 space-y-6 lg:max-w-[600px]'
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className='inline-block'
                            >
                                <span className='text-secondary font-semibold text-lg tracking-wider uppercase'>
                                    {item.aboutComponent.subtitle}
                                </span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className='text-4xl md:text-5xl font-bold text-neutral-900 leading-tight'
                            >
                                {item.aboutComponent.title}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className='text-neutral-600 text-lg leading-relaxed'
                            >
                                {item.aboutComponent.bodytext}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 1 }}
                            >
                                <MainBtn 
                                    text='Xem thêm'
                                    icon={<ChevronRight className='w-5 h-5' />}
                                    href='/gioi-thieu'
                                />
                            </motion.div>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className='relative flex-1 w-full max-w-[500px] aspect-square'
                        >
                            <div className='relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group'>
                                <div className='absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10' />
                                <Image
                                    src={item.aboutComponent.image.node.sourceUrl}
                                    alt={item.aboutComponent.image.node.altText}
                                    fill
                                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                ))}
            </Container>
        </section>
    )
}

export default AboutUs