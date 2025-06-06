import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, CirclePlus, Link, Plus, User } from 'lucide-react'
import Image from 'next/image'
import Date from '../Date'
import { PageInfo, PostsData } from '@/types/typeForWordpressData'
import MainBtn from '../buttons/main-btn'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'



interface BlogPostsProps {
    posts: PostsData['posts']['edges']
}

const BlogPosts:React.FC<BlogPostsProps> =  ({posts}) => {
    
    return (
        <section
        id='posts-body-section'
        className="py-16 bg-gray-50 ">
            <div className="container">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold">Các bài viết mới</h2>
                    
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts?.map((post) => (
                        <Card 
                        key={post?.node?.slug}
                            className="border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                            <div className="relative h-52 w-full overflow-hidden rounded-lg">
                                <Image
                                    src={`${post?.node?.featuredImage?.node?.sourceUrl}`}
                                    alt={post?.node?.featuredImage?.node?.altText || ""}
                                    fill
                                    className="object-cover rounded-t-lg filter brightness-90 hover:scale-110 transition-all duration-300 ease-in-out"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-primary-foreground text-neutral-100  text-xs font-medium rounded-full">
                                        {post?.node?.categories?.nodes[0]?.name || 'Chưa phân loại'}
                                    </span>
                                </div>
                            </div>
                            <CardHeader className="pt-6">
                                <CardTitle className="text-xl line-clamp-2">{post?.node?.title}</CardTitle>
                                <CardDescription className="flex items-center gap-4 mt-2">
                                    <Date
                                        dateString={post?.node?.date}
                                    />
                                    <span className="text-sm text-gray-500">{post?.node.customPost?.readtime || 5} phút đọc</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className="text-gray-600 line-clamp-2 "
                                    dangerouslySetInnerHTML={{ __html: post?.node?.excerpt || "" }} />
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    {/* <User className="h-6 w-6 text-gray-500" /> */}
                    <Avatar>
                      <AvatarImage
                      className='rounded-full'
                       src={post?.node.author?.node?.avatar?.url || "https://secure.gravatar.com/avatar/6485eab7a6566369f68f8b9f195655be59c77be8194aea4ff431d44031341af1?s=96&d=mm&r=g"}
                        alt={post?.node.author?.node?.name} />
                      <AvatarFallback>{post?.node.author?.node?.name}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="font-medium text-base text-neutral-700">{post?.node.author?.node?.name || "Đang cập nhật"}</p>
                  </div>
                </div>
                                <MainBtn
                                    text="Xem chi tiết"
                                    icon={<ArrowUpRight className='h-6 w-6' />}
                                    href={`/blog/${post?.node?.slug}`} />
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                
            </div>
        </section>
    )
}

export default BlogPosts
