import { Input } from '@/components/ui/input'
import React from 'react'
import MainBtn from '../buttons/main-btn'
import { TrackNextIcon } from '@radix-ui/react-icons'

const NewslettersLight = () => {
  return (
    <section className="py-20">
    <div className="container">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4"><span className='underline text-neutral-500'>Subscribe</span> to Our Newsletter</h2>
        <p className="text-neutral-500500 mb-8">
          Nhận những bài viết về kiến trúc với các chủ đề đa dạng của chúng tô<i></i>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:border-transparent"
          />
        <MainBtn 
        text='Subscribe'
        icon={<TrackNextIcon className='w-6 h-6'/>}
        />
        </div>
      </div>
    </div>
  </section>
  )
}

export default NewslettersLight
