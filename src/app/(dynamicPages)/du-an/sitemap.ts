import { getAllProjects } from '@/lib/api';
import { BASE_URL } from '@/lib/constants'
import { MetadataRoute } from 'next'
 

export default async function sitemap():Promise<MetadataRoute.Sitemap> {
    const res = await getAllProjects();
    const projects = res.projects.nodes || []
    return projects?.map((project)=>({
        url:`${BASE_URL}/du-an/${project.slug}`,
        lastModified:project.date,
        changeFrequency:'weekly',
        priority:0.8,
    }))
}