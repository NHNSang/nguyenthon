'use client'; // Required for client-side interactivity with Framer Motion

import { LastestPosts } from '@/types/typeForWordpressData';
import { set } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

// fetch latest posts here




interface LastestArticleForHeroProps {
  posts: LastestPosts['posts']['edges'];
}

const LastestArticleForHero: React.FC<LastestArticleForHeroProps> = ({ posts }) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // create images array from lastest articles
  const images = posts.map((post) => post.node.featuredImage.node.sourceUrl)
  // Cycle through images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);


  // Progress bar animation variants
  const progressBarVariants = {
    initial: { width: '0%' },
    animate: { width: '100%', transition: { duration: 5, ease: 'linear' } },
  };

  // Image animation variants
  const imageVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <>
      <div className="absolute z-10 group w-full lg:right-20 bottom-14 bg-black/80 backdrop:blur-sm rounded-2xl  lg:w-[400px] h-[100px] lg:h-[150px] flex flex-col items-center justify-around gap-5 shadow-md shadow-neutral-200/50 cursor-pointer">
        {/* Image Slideshow */}
        <div className="flex flex-row w-full h-[150px] overflow-hidden rounded-md">
          {/* image slideshow */}
          <AnimatePresence initial={false}>
            <motion.img
              key={currentImageIndex} // Key ensures animation triggers on image change
              src={images[currentImageIndex]}
              alt={`Slide ${currentImageIndex + 1}`}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="object-cover w-[40%] mx-w-[100px] h-full"
            />
          </AnimatePresence>

          {/* text */}
          {
            posts[currentImageIndex] && (
              <div
                onClick={() => router.push("/blog/" + posts[currentImageIndex].node.uri)}
                className="h-full flex flex-col justify-center bg-primary/20 shadow-lg shadow-neutral-200  p-4 w-[60%]">
                <h2 className="text-sm text-white md:text-base font-semibold line-clamp-4 group-hover:text-primary duration-300">{posts[currentImageIndex].node.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: posts[currentImageIndex].node.excerpt }}
                  className="hidden md:blocktext-neutral-500 line-clamp-2"></div>
              <Link
              href={"/blog/" + posts[currentImageIndex].node.uri}
              className='mt-2 text-sm text-white underline group-hover:text-primary flex flex-row items-center gap-1 duration-300'
              >đọc thêm
              <ArrowRight className='w-4 h-4'/>
              </Link>
              </div>
            )
          }
        </div>

        {/* Progress Bar */}
      </div>
      <div className=" absolute bottom-7 right-0 w-full mx-auto h-2 bg-primary/20 rounded-full overflow-hidden shadow-xl shadow-primary">
        <motion.div
          variants={progressBarVariants}
          initial="initial"
          animate="animate"
          key={currentImageIndex} // Reset animation on image change
          className="h-full bg-primary/80"
        />
      </div>

    </>

  );
};

export default LastestArticleForHero;