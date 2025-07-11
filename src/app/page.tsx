

import { Suspense } from "react";
import { getAllPosts, getAllProjects, getComponents, getLastestPosts } from "@/lib/api";

import Loading from "./loading";
import TestimonialsSection from "@/components/custom/testimonials/Testimonials";
import OurProcessSection from "@/components/custom/our-process/OurProcess";
import LatestNewsSection from "@/components/custom/blog-posts/LatestNews";
import OurServices from "@/components/custom/offerServices/our-services";
import ProjectsComponent from "@/components/custom/projects/project-component";
import BackToTopNoClient from "@/components/custom/backToTop/BackToTopNoClient";
import ValuesSection from "@/components/custom/why-us/values-company-section";
import CarouselSlide from "@/components/custom/carousel/carousel";
import NumberOfAchievements from "@/components/custom/NumberOfAchievements";

export default async function Home() {
  const posts = await fetchAllPosts();// lấy dữ liệu tất cả bài viết 
  const components = await fetchComponents();
  const projects = await fetchProjects();

  return (
    <div className="bg-white relative overflow-hidden" >
      <section id='topPage'></section>
      <Suspense fallback={<Loading />}>
        <CarouselSlide/>
        <ValuesSection valuesComponent={components?.valuesComponent} />
        <OurServices />
        <NumberOfAchievements/>
        {/* <OurProcessSection /> */}
        <ProjectsComponent projects={projects} />
        <TestimonialsSection />
        <LatestNewsSection lastestArticles={posts} />
        <BackToTopNoClient />
      </Suspense>
    </div>
  );
}


async function fetchLastestPosts() {
  const res = await getLastestPosts(4);
  const latestArticles = res?.posts?.edges;
  return latestArticles;
}

// take data from WP for using all components in Homepage
async function fetchComponents() {
  const res = await getComponents();
  const components = res?.nextjsPage.components;
  return components;
}

async function fetchProjects () {
  const res = await getAllProjects();
  const projects = res?.projects?.nodes;
  return projects;
}

async function fetchAllPosts(){
  const res = await getAllPosts(6,"");
  const posts = res?.posts?.edges;
  return posts;
}
