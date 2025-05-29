import { getAllPosts } from "@/lib/api";
import { BASE_URL } from "@/lib/constants";
import { PostsData, PostsDataProps } from "@/types/typeForWordpressData";
import { MetadataRoute } from "next";

export default async function sitemap():Promise<MetadataRoute.Sitemap> {
    const res:PostsData = await getAllPosts(100,"");
    return res?.posts?.edges?.map((post)=>({
        url:`${BASE_URL}/blog/${post.node.slug}`,
        lastModified:post.node.date,
        changeFrequency:'daily',
        priority:1
    }
));
}