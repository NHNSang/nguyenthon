import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Project } from '@/types/typeForWordpressData'
import { MousePointerClick, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


interface SidebarComponentProps {
    relevantProjects: Project[]; // Define the type of relevantProjects
  }

const ProjectSidebarComponent:React.FC<SidebarComponentProps> = ({relevantProjects}) => {
    return (
        <div className="lg:col-span-4">
            <div className="sticky top-24">
                {/* Author Card */}
                <Card className="border-none shadow-md mb-8 ">
                    <CardContent className="p-6 bg-primary/20 rounded-md text-neutral-100">
                        <div className="flex flex-col items-center text-center">
                            <div className="h-20 w-20 rounded-full bg-primary/30 flex items-center justify-center mb-4">
                                <User className="h-10 w-10 text-gray-500" />
                            </div>
                            {/* <h3 className="font-bold text-lg mb-1">{project?.author?.node?.name}</h3> */}

                            <p className="text-base font-medium text-neutral-500 mb-4">
                                Trao đổi với đội ngũ thiết kế hơn 10 năm kinh nghiệm của Nguyên Thống JP
                            </p>
                            <Button className="w-full bg-primary hover:bg-primary/90 rounded-md text-lg">Nhắn tin facebook</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Related Posts */}
                <div className="mb-8">
                    <h3 className="font-bold text-lg mb-4">Bài viết liên quan</h3>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-10 lg:gap-0 mx-auto">
                        {relevantProjects.map((project) => (
                            <Link key={project.id} href={`/du-an/${project.slug}`}>
                                <div className="group flex flex-col md:flex-row gap-4 items-start my-5">
                                    <div className="relative h-[100px] w-[200px] flex-shrink-0 rounded-md overflow-hidden">
                                        <Image
                                            src={project.featuredImage.node.sourceUrl}
                                            alt={project.title}
                                            width={400}
                                            height={400}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-medium group-hover:text-primary line-clamp-2 transition-colors">{project.title}</h4>
                                        <div dangerouslySetInnerHTML={{ __html: project.excerpt || "" }} className="text-sm text-gray-500 line-clamp-2" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* CTA Card */}
                <Card className="border-none shadow-md bg-gradient-to-br from-[#FF5A5F]/5 to-[#00A699]/5">
                    <CardContent className="p-6  bg-primary/20 rounded-md">
                        <h3 className="font-bold text-lg mb-2">Cần hổ trợ tư vấn từ đội ngũ chúng tôi</h3>
                        <p className="text-sm text-neutral-500 mb-4">
                            Chúng tôi ở đây để giúp bạn thực hiện hóa ý tưởng của mình một cách chân thực nhất.Đừng ngần ngại! Gọi hoặc để lại thông tin và chúng tôi sẽ hổ trọ
                        </p>
                        <Button className="w-full bg-primary hover:bg-primary/90 rounded-md text-base ">
                            Để lại thông tin
                            <MousePointerClick />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ProjectSidebarComponent;
