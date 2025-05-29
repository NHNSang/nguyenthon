import { Button } from '@/components/ui/button'
import { PostsData } from '@/types/typeForWordpressData'
import { ArrowUpRight, Calendar, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Date from '../Date'
import Link from 'next/link'
import MainBtn from '../buttons/main-btn'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

interface LastestBlogPostProps {
    posts: NonNullable<PostsData['posts']['edges']>
}

const LastestBlogPost:React.FC<LastestBlogPostProps> = ({posts}) => {
    const lastestPost = posts[0]
    return (
        <section className="py-16">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                    <div className="relative h-[220px] md:h-[400px] rounded-xl overflow-hidden">
                        <Image
                            src={lastestPost.node.featuredImage?.node?.sourceUrl || ""}
                            alt="Featured blog post"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className='max-w-2xl'>
                        <span className="inline-block px-3 py-1 bg-primary-foreground text-neutral-100 text-sm font-medium rounded-md mb-4">
                            Bài viết mới
                        </span>
                        <h2 className="text-3xl font-bold mb-4">{lastestPost.node.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: lastestPost.node.excerpt || ""}} 
                        className="text-gray-600 mb-6"/>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <Date dateString={lastestPost.node.date} />
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-500">
                                    {lastestPost.node.author.node.name}
                                </span>
                            </div>
                            <span className="text-sm text-gray-500">5 phút đọc</span>
                        </div>
                        <MainBtn text='Xem thêm' href={`/blog/${lastestPost.node.slug}`} icon={<ArrowUpRight className='w-6 h-6'/>}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LastestBlogPost
