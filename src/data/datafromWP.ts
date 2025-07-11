import { getAbout, getAllPosts, getDetailPage, getHero, getLogo, getServices, getSinglePost, getSingleService } from "@/lib/api";
import { hero, Services } from "@/types/typeForWordpressData";

export async function fetchAllPosts(first: number, after: string) {
 try {
  const res = await getAllPosts(first, after);
  const posts = res?.posts?.edges;
  const pageInfo = res?.posts?.pageInfo;
  return { posts, pageInfo }; // Return the posts;
 } catch (error) {
  console.error('Error in fetchAllPosts:', error);
 }
}

export async function fetchSinglePost(slug:string) {
  const res = await getSinglePost(slug);
  return res.post;
}
export async function allServices() {
  const data: Services = await getServices();
  const serviceArr = data.edges.map(edge => edge.node)
  return serviceArr;
}

export async function singleService(id:string) {
  const data = await getSingleService(id)
  return data.service;
}
export async function herofromWP() {
  const res: hero = await getHero();
  return res?.heros?.nodes;
}


export async function aboutFromWP() {
  const res = await getAbout();
  const about = res.abouts.nodes
  return about;
}


export async function reCruitPageFromWP(id: string) {
  const res = await getDetailPage(id)
  return res;
}
