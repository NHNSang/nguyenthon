import { getAllPosts } from "@/lib/api";
import { BASE_URL } from "@/lib/constants";
import { PostsData } from "@/types/typeForWordpressData";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        const res: PostsData = await getAllPosts(100, "");

        if (!res?.posts?.edges || res.posts.edges.length === 0) {
            // Return empty sitemap if no posts
            return [];
        }

        return res.posts.edges.map((post) => ({
            url: `${BASE_URL}/blog/${post.node.slug}`,
            lastModified: post.node.date,
            changeFrequency: 'daily' as const,
            priority: 1
        }));
    } catch (error) {
        console.warn('Failed to generate blog sitemap:', error);
        // Return empty sitemap on error to prevent build failure
        return [];
    }
}