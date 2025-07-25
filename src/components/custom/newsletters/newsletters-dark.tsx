import { Button } from '@/components/ui/button'
import React from 'react'

const NewslettersDark = () => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-6">Bản tin</h4>
      <p className="text-gray-400 mb-4">
        Đăng ký nhận bản tin để không bỏ lỡ các cập nhật và ưu đãi mới nhất từ
        chúng tôi.
      </p>
      <form className="space-y-3">
        <input
          type="email"
          placeholder="Your email address"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d5b78f]"
        />
        <Button
          type="submit"
          className="w-full bg-[#d5b78f] hover:bg-[#c5a77f] text-black font-medium py-2 px-4 rounded-md"
        >
          Đăng ký
        </Button>
      </form>
    </div>
  )
}

export default NewslettersDark
