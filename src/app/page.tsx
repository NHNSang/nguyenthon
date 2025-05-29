

import { Suspense } from "react";
import Loading from "./loading";

import HeroSection from "@/components/custom/hero/hero";
import TestimonialsSection from "@/components/custom/testimonials/Testimonials";
import OurProcessSection from "@/components/custom/our-process/OurProcess";
import CTASection from "@/components/custom/CTA/Cta";
import LatestNewsSection from "@/components/custom/blog-posts/LatestNews";
import { getAllPosts, getAllProjects, getComponents, getLastestPosts } from "@/lib/api";
import Mediashowcase from "@/components/custom/social-media/MediaShowcase";
import OurServices from "@/components/custom/offerServices/our-services";
import ProjectsComponent from "@/components/custom/projects/project-component";
import BackToTopNoClient from "@/components/custom/backToTop/BackToTopNoClient";
import ValuesSection from "@/components/custom/why-us/values-company-section";




export default async function Home() {
  const posts = await fetchAllPosts();// lấy dữ liệu tất cả bài viết 
  const latestArticles = await fetchLastestPosts();
  const components = await fetchComponents();
  const projects = await fetchProjects();

  return (
    <div className="bg-white relative overflow-hidden" >
      <section id='topPage'></section>
      <Suspense fallback={<Loading />}>
        <HeroSection 
        hero={components?.heroComponent}
        posts={latestArticles}
        />
        <ValuesSection valuesComponent={components?.valuesComponent} />
        <Mediashowcase mediaShowcaseComponent={components?.mediaComponent} />
        <OurServices />
        <ProjectsComponent projects={projects} />
        <TestimonialsSection />
        <OurProcessSection />
        <CTASection />
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
