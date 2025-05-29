'use client'
import Link from 'next/link'
import { Search, SquareCheck } from 'lucide-react';
import Image from 'next/image';
import { EdgesProps, PostsData } from '@/types/typeForWordpressData';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';


interface SearchResultBoxProps {
    term: string | null;
    posts: PostsData['posts']['edges'];
    closeHandleClick: (open: boolean) => void;
}
const SearchResultBox: React.FC<SearchResultBoxProps> = ({
    term,
    posts,
    closeHandleClick
}) => {
    // const pathname = usePathname();
    const route = useRouter();

    const [newTerm, setNewTerm] = useState<string>('')
    const [postsWithQuery, setPostsWithQuery] = useState<PostsData['posts']['edges']>([])

    // tạo biến quản lý trạng thái đóng modal AlertDialog searchresult khi handleClick
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    useEffect(() => {
        const termString = term?.toString().toLowerCase()
        setNewTerm(termString || '')
        const newPosts = posts.filter(post => post.node.excerpt.toLowerCase().includes(termString || ''))
        setPostsWithQuery(newPosts)
        // console.dir("check term >>>>", termString)
    }, [term, posts])


    const handleClick = (slug: string) => {
        setOpenDialog(false)
        closeHandleClick(openDialog)
        route.refresh()
        route.push(`/blog/${slug}`)
    }
    // console.log("check initialPosts", posts)

    return (
        <div className='w-full flex flex-col gap-5 mt-5 bg-secondary/20 px-2 py-4 rounded-md'>
            <div className='flex flex-col justify-center'>
                <div className='flex flex-col justify-center items-start w-12/12 gap-3 w-full bg-primary/20 p-3 rounded-md '>
                    {newTerm === '' ?
                        (
                            <p>Không có bài viết nào được tìm kiếm</p>) :
                        (<>
                            <p className='text-sm font-semibold'>{`Có ${postsWithQuery.length} bài viết phù hợp với tìm kiếm`}</p>
                            { postsWithQuery.length <= 7 ? 
                             postsWithQuery?.map((post) => (
                                <div
                                    key={post.node.slug}
                                    onClick={() => handleClick(post.node.slug)}
                                    // href={`blog/${post.slug}`}
                                    className=' w-full cursor-pointer text-sm whitespace-break-spaces mt-3 flex flex-row justify-start items-center gap-3 h-[35px] hover:text-primary overflow-hidden'>
                                    {/* <SquareCheck  className='mx-1 text-neutral-500 text-sm'/> */}
                                    <Image
                                        src={post.node.featuredImage?.node.sourceUrl || ''}
                                        alt={post.node.title}
                                        width={800}
                                        height={800}
                                        className='rounded-md object-cover h-full w-[100px]'
                                    />
                                    <div className='flex flex-col w-full items-start'>
                                        <p className='line-clamp-2 hover:text-primary'>
                                            {post.node.title}
                                        </p>
                                    </div>
                                </div>
                            )) : 
                            
                            postsWithQuery?.splice(0, 7).map((post) => (
                                <div
                                    key={post.node.slug}
                                    onClick={() => handleClick(post.node.slug)}
                                    // href={`blog/${post.slug}`}
                                    className=' w-full cursor-pointer text-sm whitespace-break-spaces mt-3 flex flex-row justify-start items-center gap-3 h-[35px] hover:text-primary overflow-hidden'>
                                    {/* <SquareCheck  className='mx-1 text-neutral-500 text-sm'/> */}
                                    <Image
                                        src={post.node.featuredImage?.node.sourceUrl || ''}
                                        alt={post.node.title}
                                        width={800}
                                        height={800}
                                        className='rounded-md object-cover h-full w-[100px]'
                                    />
                                    <div className='flex flex-col w-full items-start'>
                                        <p className='line-clamp-2'>
                                            {post.node.title}
                                        </p>
                                    </div>
                                </div>
                            ))
                            }
                        </>)
                    }

                </div>
            </div>

        </div>
    )
}

export default SearchResultBox