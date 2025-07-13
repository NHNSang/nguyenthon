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

const LastestBlogPost: React.FC<LastestBlogPostProps> = ({ posts }) => {
    const lastestPost = posts[0]
    return (
        <section className="">
            <div className="container ">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center border-t border-r border-b border-primary ">
                    <div className="relative h-[220px] md:h-[400px] overflow-hidden shadow-2xl">
                        <Image
                            src={lastestPost.node.featuredImage?.node?.sourceUrl || ""}
                            alt="Featured blog post"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className='  h-full lg:p-4 shadow-2xl flex flex-col justify-center items-left text-left'>
                        <Link href={`/blog/${lastestPost.node.slug}`}
                        >
                            <h2 className="text-2xl md:text-[28px] mb-2 lg:mb-3 uppercase tracking-[3px] font-semibold">
                                {lastestPost.node.title}
                            </h2>
                        </Link>
                        <div dangerouslySetInnerHTML={{ __html: lastestPost.node.excerpt || "" }}
                            className="text-[#5f5c5c] text-base lg:px-0 lg:text-lg line-clamp-2 lg:line-clamp-3 mb-3 font-normal" />

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-600" />
                                <Date dateString={lastestPost.node.date} />
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-gray-600" />
                                <span className="text-sm text-gray-600">
                                    {lastestPost.node.author.node.name}
                                </span>
                            </div>
                            <span className="text-sm text-gray-500">5 phút đọc</span>
                        </div>
                        <MainBtn text='Xem thêm' href={`/blog/${lastestPost.node.slug}`} icon={<ArrowUpRight className='w-6 h-6' />} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LastestBlogPost
