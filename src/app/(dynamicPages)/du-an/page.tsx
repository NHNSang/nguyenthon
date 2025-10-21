import Loading from '@/app/loading'
import { Suspense } from 'react'

import ProjectsGrid from '@/components/custom/projects/ProjectsGrid'
import { getAllProjects, getProjectCategories } from '@/lib/api'

export default async function ProjectsPage() {
  const projects = await fetchProjects()
  const projectsCategoryArray = await fetchProjectCategories()
  // console.log(projects)

  return (
    <main className="pt-[60px] lg:pt-[90px] bg-white">
      <Suspense fallback={<Loading />}>
        <ProjectsGrid
          projectsArray={projects}
          projectCategoryArray={projectsCategoryArray}
          title="Khám phá các dự án nổi bật của chúng tôi"
          text="Mỗi dự án là một câu chuyện độc đáo, một hành trình sáng tạo mà chúng tôi đã thực hiện cùng với khách hàng của mình. Hãy cùng khám phá những dự án nổi bật nhất của Nguyên Thống JP"
          islightBg
          href="/du-an"
          labelOfButton="Xem thêm"
        />
      </Suspense>
    </main>
  )
}

async function fetchProjects() {
  try {
    const res = await getAllProjects()
    const projects = res?.projects?.nodes
    return projects || []
  } catch (error) {
    console.warn('Failed to fetch projects:', error);
    return []
  }
}

async function fetchProjectCategories() {
  try {
    const res = await getProjectCategories()
    const projectCategories = res?.projectCategories?.nodes
    return projectCategories || []
  } catch (error) {
    console.warn('Failed to fetch project categories:', error);
    return []
  }
}
