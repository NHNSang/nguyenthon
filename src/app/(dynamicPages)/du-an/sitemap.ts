import { getAllProjects } from '@/lib/api';
import { BASE_URL } from '@/lib/constants';
import { MetadataRoute } from 'next';


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        const res = await getAllProjects();
        const projects = res.projects.nodes || [];

        if (projects.length === 0) {
            // Return empty sitemap if no projects
            return [];
        }

        return projects.map((project) => ({
            url: `${BASE_URL}/du-an/${project.slug}`,
            lastModified: project.date,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));
    } catch (error) {
        console.warn('Failed to generate projects sitemap:', error);
        // Return empty sitemap on error to prevent build failure
        return [];
    }
}