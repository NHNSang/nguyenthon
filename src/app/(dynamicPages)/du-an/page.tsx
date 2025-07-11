import Container from "@/components/custom/container";
import { Suspense } from "react";
import Loading from "@/app/loading";

import BreadcrumbComponent from "@/components/custom/breadcrumb/BreadcrumbComponent";
import { getAllProjects, getProjectCategories } from "@/lib/api";
import ProjectsGrid from "@/components/custom/projects/ProjectsGrid";

export default async function ProjectsPage() {
  const projects = await fetchProjects();
  const projectsCategoryArray = await fetchProjectCategories();
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
  );
}

async function fetchProjects() {
  const res = await getAllProjects();
  const projects = res?.projects?.nodes;
  return projects;
}

async function fetchProjectCategories() {
  const res = await getProjectCategories();
  const projectCategories = res?.projectCategories?.nodes;
  return projectCategories;
}
