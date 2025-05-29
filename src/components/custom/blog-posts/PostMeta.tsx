import { Calendar, Tag, User } from 'lucide-react'
import React from 'react'
import Date from '../Date'
import { SinglePostData } from '@/lib/api';

interface PostMetaProps {
    author:string;
    publishedDate:string;
    tagsList:SinglePostData['post']['tags']['nodes'];
}

const PostMeta:React.FC<PostMetaProps> = ({
  author,
  publishedDate,
  tagsList
}) => {
  return (
    <div className='flex flex-row items-center justify-start gap-2 pr-4 py-4 '>
        <div className='flex flex-row items-center gap-2'>
          <User className='text-secondary' size={16}/>
          <span className='text-xs text-neutral-500'>{author}</span>
        </div>
        <div className='flex flex-row items-center gap-2'>
          <Calendar className='text-secondary ' size={16} />
          <Date
          dateString={publishedDate}
          />
        </div>
        <div className='flex flex-row items-center gap-2'>
          <Tag className='text-secondary' size={16}/>
          <span className='text-xs text-neutral-500'>
            {tagsList?.length > 0 ?  
            tagsList?.slice(0,1).map((tag)=>(
              <p 
              key={tag.name}>
                {tag.name} 
              </p>
            )) : (<p>Đang cập nhật</p>)
            }
          </span>
        </div>
      </div>
  )
}

export default PostMeta