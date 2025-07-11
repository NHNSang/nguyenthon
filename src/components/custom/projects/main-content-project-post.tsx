import { Button } from '@/components/ui/button'
import { Bookmark, Share2, ThumbsUp } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { SingleProject } from '@/types/typeForWordpressData'
import TableOfContent from '../table-of-content'
import { BASE_URL } from '@/lib/constants'
import ShareFacebookBtn from '../buttons/share-facebook-btn'
import ShareTwitterBtn from '../buttons/share-twitter-btn'

import { TwitterShareButton, TwitterIcon } from 'next-share';
import LinkedinShareBtn from '../buttons/share-linkedin-btn'

interface MainContentProjectPostProps {
    project: SingleProject["project"];
    updateHtml: string;
    headings: {
        id: string;
        text: string;
        level: number;
    }[]
}
const MainContentProjectPost: React.FC<MainContentProjectPostProps> = ({ project, updateHtml, headings }) => {
    const shareUrl = `${BASE_URL}/du-an/${project.slug}`
    const shareTitle = `${project.title}`
    const shareExcerpt = `${project.excerpt}`
    return (
        <div className="lg:col-span-8">
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
                <Image
                    src={project.featuredImage.node.sourceUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className='flex-none w-full'>
                <TableOfContent headings={headings} />
            </div>

            <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: updateHtml as string | TrustedHTML || '' }} />
            </div>

            {/* Social Sharing */}
            <div className="mt-12 pt-8 border-t flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                    </Button>
                    <ShareFacebookBtn
                        url={shareUrl}
                        title={shareTitle}
                        summary={shareExcerpt}
                    />
                    <ShareTwitterBtn
                        title={shareTitle}
                        url={shareUrl}
                    />
                    <LinkedinShareBtn
                        url={shareUrl}
                        title={shareTitle}
                        summary={shareExcerpt}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4" />
                        <span>Like</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Bookmark className="h-4 w-4" />
                        <span>Save</span>
                    </Button>
                    
                </div>
            </div>
        </div>
    )
}

export default MainContentProjectPost;
