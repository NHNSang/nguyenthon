'use client';
import { DEFAULT_COMPANY_NAME } from '@/lib/constants';
import { FacebookShareButton } from 'next-share';
import React from 'react'


interface  FacebookShareBtnProps {
    url: string;
    title: string;
    summary:string
}
const FacebookShareBtn: React.FC<FacebookShareBtnProps> = ({ ...props }) => {
    return (
        <FacebookShareButton 
        url={props.url} 
        quote={props.title}
        hashtag={`${DEFAULT_COMPANY_NAME}`}
        aria-label='Share to Facebook'
        >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
        </FacebookShareButton>

    )
}

export default FacebookShareBtn
