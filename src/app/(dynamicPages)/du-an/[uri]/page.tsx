import Date from '@/components/custom/Date'
import GeneralInformationProject from '@/components/custom/projects/general-information-project'
import MainContentProjectPost from '@/components/custom/projects/main-content-project-post'
import ProjectSidebarComponent from '@/components/custom/sidebar/project-sidebar-component'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { extractHeadings } from '@/hooks/useExtractHeadings'
import { getAllProjects, getSingleProject } from '@/lib/api'
import { BASE_URL } from '@/lib/constants'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

interface Params {
  uri: string
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  try {
    const { uri } = await params
    const projectUri = `/project/${uri}/`
    const res = await getSingleProject(projectUri)

    if (!res) {
      throw new Error(`Post not found for uri: ${projectUri}`)
    }

    const imageUrl = res?.project?.featuredImage?.node?.sourceUrl || ''
    const validImageUrl = imageUrl ? new URL(imageUrl).toString() : ''

    return {
      title: res?.project?.title,
      description: res?.project?.excerpt,
      openGraph: {
        title: res?.project?.title,
        description: res?.project?.excerpt,
        url: `${BASE_URL}/du-an/${uri}`,
        type: 'article',
        images: validImageUrl
          ? [
              {
                url: validImageUrl,
                width: 800,
                height: 600,
                alt: res?.project?.featuredImage?.node?.altText,
              },
            ]
          : [],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
    }
  }
}

// Generate static parameters for dynamic routes
export async function generateStaticParams(): Promise<{ uri: string }[]> {
  try {
    const res = await getAllProjects()

    // Properly format and clean URIs to ensure they work correctly
    return (
      res?.projects?.nodes?.map((item) => {
        let cleanUri = item.uri || ''

        // Remove project prefix and trailing slashes for route parameters
        cleanUri = cleanUri.replace(/^\/project\//, '').replace(/\/$/, '')

        // console.log('Cleaned URI for route:', cleanUri);

        return {
          uri: cleanUri,
        }
      }) || []
    )
  } catch (error) {
    console.error('Error generating static params in du-an:', error)
    return []
  }
}

// Main page component
export default async function SingleProjectPage({
  params,
}: {
  params: Promise<Params>
}) {
  try {
    // Format the URI by adding necessary prefix for WordPress API
    const { uri } = await params
    const projectUri = `/project/${uri}/`
    // console.log('URI of project:', projectUri);

    const res = await getSingleProject(projectUri)
    const project = res?.project

    if (!project || !project.slug) {
      console.error(
        `Error: Post is null or missing slug for uri: ${projectUri}`
      )
      throw new Error('Post not found or invalid')
    }

    const response = await getAllProjects()

    const ProjectsInSameCategory =
      response?.projects?.nodes?.filter(
        (item) =>
          item.projectFields.projectCategory[0] ===
          project.projectFields.projectCategory[0]
      ) || []
    const relevantProject =
      ProjectsInSameCategory.filter((item) => item.slug !== project.slug) || []

    const { headings, updateHtml } = extractHeadings(project.content as string)
    return (
      <div className="flex flex-col min-h-screen relative bg-white pt-[60px] lg:pt-[90px]">
        <main className="flex-1">
          {/* Project Header */}
          <section className="">
            <div className="container">
              {/*Be*/}
              <div className="w-full flex items-center justify-start space-x-4 my-5 px-4 lg:px-0">
                <Link
                  href="/du-an"
                  className="inline-flex items-center justify-center gap-2 text-neutral-700 hover:text-primary-foreground hover:underline"
                >
                  <ArrowLeft className="h-5 w-5 lg:h-7 lg:w-7" />
                  Trở về
                </Link>
                <span className="inline-block px-3 py-1 bg-[#D0AC80] text-white text-sm">
                  Danh mục{' '}
                  {project.projectFields.projectCategory[0] || 'Không xác định'}
                </span>
              </div>

              {/* Nội dung chính, ngày, người tạo */}
              <div className="w-full px-4 lg:px-0">
                <div className=" line-clamp-2 my-2">
                  <h1 className="text-xl md:text-4xl font-bold tracking-tight mb-4">
                    {project.title}
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <Date dateString={project.date} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>6 phút đọc</span>
                  </div>
                </div>
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        project?.author?.node?.avatar?.url ||
                        'https://secure.gravatar.com/avatar/6485eab7a6566369f68f8b9f195655be59c77be8194aea4ff431d44031341af1?s=96&d=mm&r=g'
                      }
                      alt={project?.author?.node?.name || 'Unknown'}
                    />
                    <AvatarFallback>
                      {project?.author?.node?.name || 'N/A'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {project?.author?.node?.name || 'Đang cập nhật'}
                    </p>
                  </div>
                </div>
                {/* General Information */}
                <GeneralInformationProject project={project} />
              </div>
            </div>
          </section>
          {/* Content */}
          <section className="py-4">
            <div className="px-4 lg:px-0 lg:container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Main Content */}
                <MainContentProjectPost
                  project={project}
                  updateHtml={updateHtml}
                  headings={headings}
                />

                {/*Right Sidebar */}
                <ProjectSidebarComponent relevantProjects={relevantProject} />
              </div>
            </div>
          </section>

          {/* Newsletter */}
          {/* <NewslettersLight /> */}
        </main>
      </div>
    )
  } catch (error) {
    console.error('Error loading project:', error)
    return (
      <div>
        <h1>Project Not Found</h1>
        <p>We could not find the project you were looking for.</p>
      </div>
    )
  }
}
