import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Project } from '@/types/typeForWordpressData'
import { MousePointerClick, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ContactInfoModal from '../contact-infor-modal/contact-infor-modal'

interface SidebarComponentProps {
  relevantProjects: Project[] // Define the type of relevantProjects
}

const ProjectSidebarComponent: React.FC<SidebarComponentProps> = ({
  relevantProjects,
}) => {
  return (
    <div className="lg:col-span-4">
      <div className="sticky top-24">
        {/* Author Card */}
        <Card className="border-none shadow-md mb-4 ">
          <CardContent className="p-6 bg-white border border-primary">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20   flex items-center justify-center">
                <User className="h-10 w-10 text-gray-500" />
              </div>
              {/* <h3 className="font-bold text-lg mb-1">{project?.author?.node?.name}</h3> */}

              <p className="text-base font-medium text-neutral-500 mb-4">
                Trao đổi với đội ngũ thiết kế hơn 10 năm kinh nghiệm của Nguyên
                Thống JP
              </p>
              <Link
                href="https://www.facebook.com/nguyenthongjpconstruction?mibextid=wwXIfr&rdid=ua7VBEiweZR13aUN&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1MY6oUDHJ3%2F%3Fmibextid%3DwwXIfr#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block bg-primary hover:bg-primary/90 uppercase text-lg text-white text-center py-2"
              >
                FACEBOOK NGUYÊN THỐNG JP
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        <div className="">
          <h3 className="text-2xl md:text-[40px] my-5 lg:my-10 uppercase tracking-[5px] lg:tracking-[5px] font-semibold text-center">
            Bài viết <span className="text-primary">liên quan</span>
          </h3>
          <div className="grid grid-cols-1 gap-0 mx-auto">
            {relevantProjects.map((project) => (
              <Link key={project.id} href={`/du-an/${project.slug}`}>
                <div className="group flex flex-row my-2 lg:my-5">
                  <div className=" h-[150px] w-[200px] flex-shrink-0  ">
                    <Image
                      src={project.featuredImage.node.sourceUrl}
                      alt={project.title}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full "
                    />
                  </div>

                  <div className='bg-white w-full h-full" line-clamp-2 border-t border-b border-r border-primary '>
                    <h4 className="font-medium  group-hover:text-primary line-clamp-2 transition-colors px-2 pt-2">
                      {project.title}
                    </h4>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: project.excerpt || '',
                      }}
                      className="text-sm text-gray-600 line-clamp-4 px-2"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <Card className="bg-white border border-primary">
          <CardContent className="p-6   ">
            <h3 className="font-bold text-lg mb-2">
              Cần hỗ trợ tư vấn từ đội ngũ chúng tôi
            </h3>
            <p className="text-base text-neutral-500 mb-4">
              Chúng tôi ở đây để giúp bạn thực hiện hóa ý tưởng của mình một
              cách chân thực nhất.Đừng ngần ngại! Gọi hoặc để lại thông tin và
              chúng tôi sẽ hổ trọ
            </p>
            <ContactInfoModal />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProjectSidebarComponent
