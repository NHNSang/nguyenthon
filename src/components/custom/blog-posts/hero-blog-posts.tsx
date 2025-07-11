'use client';
import { Input } from '@/components/ui/input'
import { DEFAULT_COMPANY_NAME } from '@/lib/constants'
import { Search } from 'lucide-react'
import React from 'react'
import SearchComponent from '../header/search/SearchComponent'
import { PostsData } from '@/types/typeForWordpressData';

interface HeroBlogPostsProps {
    initialPosts: PostsData['posts']['edges'] // Array of initial posts   
}

const HeroBlogPosts: React.FC<HeroBlogPostsProps> = ({ initialPosts }) => {
    // console.log("check initialPosts", initialPosts)
    return (
        <section className="pt-48 pb-20 bg-gradient-to-r from-primary/10 to-[#00A699]/10">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        {DEFAULT_COMPANY_NAME}
                        <span className="text-primary"> BLOG.</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Cập nhật xu hướng kiến trúc, thiết kế nội thất từ các chủ đề của chúng tôi
                    </p>
                    <div className="relative max-w-xl mx-auto w-full">
                        {/* <Input placeholder="Tìm kiếm bài viết..." className="pl-10 py-6 text-base" /> */}
                        {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" /> */}

                        <SearchComponent
                            initialPosts={initialPosts}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:border-none"
                            placeholder='Tìm kiếm bài viết...'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroBlogPosts
