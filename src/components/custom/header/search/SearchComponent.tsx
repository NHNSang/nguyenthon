'use client'

import { ChevronLeft, Search } from 'lucide-react'
import SearchDialog from './SearchDialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,

}
  from '@/components/ui/alert-dialog'
import SearchResultBox from './SearchResultBox';
import { EdgesProps, PostsData } from '@/types/typeForWordpressData';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import Loading from '@/app/loading';
import { SkeletonForSearch } from '../../skeleton/SkeletonForSearch';
import { Button } from '@/components/ui/button';
import Link from 'next/link';



interface SearchComponentProps {
  className?: string | null | undefined;
  placeholder?: string,
  initialPosts: PostsData['posts']['edges'];
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  className,
  placeholder = 'Nhập từ khóa...',
  initialPosts
}) => {
  const [term, setTerm] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [posts,setPosts] = useState<PostsData['posts']['edges']>([])

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter()

  const params = new URLSearchParams(searchParams || "")

  // hàm đồng bộ url với truy vấn đầu vào là biến term

  const urlHandleChange = useDebouncedCallback((term: string) => {
    // console.log('check term',term)

    if (term) {
      params.set("query", term) // params lấy chuỗi ký tự sau dấu ? là query=term
    } else params.delete("query")

    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  useEffect(() => {
    setTerm(searchParams?.get("query")?.toString() || '')
    if(typeof window !== 'undefined') {
      window.localStorage.setItem('posts', JSON.stringify(initialPosts));
    }
    // console.log(term)
  }, [searchParams, term,initialPosts])

  useEffect(()=>{
    // check localStorage có dữ liệu hay không, nếu có thì setPosts bằng dữ liệu đó, nếu không thì setPosts bằng initialPosts
    if(typeof window !== 'undefined') {
      const localStoragePosts = window.localStorage.getItem('posts');
      if (localStoragePosts) {
        setPosts(JSON.parse(localStoragePosts));
      } else {
        setPosts(initialPosts);
      }
    }
    },[initialPosts])


  const closeHandleClick = (open: boolean) => {
    setOpen(open)
  }
  // closeHandleClick sử dụng parameter open được truyền từ component con là SearchResultBox lên

  return (
    <div className='relative flex justify-center '>

    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* open và onOpenChange sử dụng để tùy chỉnh trạng thái bật tắt của dialog */}
      <AlertDialogTrigger className={`flex justify-center items-center border-none bg-primary hover:bg-primary-foreground rounded-full shadow-md shadow-primary p-3 px-5 w-full max-w-[250px] focus:outline-none `}>
        {/* <Search className={`hover:text-secondary duration-300 text-neutral-500 w-ful 
           ${className}`} /> */}
        
        <div className='border-r-2 border-neutral-400 pr-5'>
          <p className='text-neutral-100 font-bold text-lg'>Tìm kiếm bài viết</p>
          </div>
        <Search className='ml-3 text-neutral-100   '/>
      </AlertDialogTrigger>
      <AlertDialogContent className='bg-gray-50 w-full h-[90%] md:h-[60vh] rounded-md p-5 flex flex-col justify-start items-center'>
        <AlertDialogHeader className='w-full'>
          <AlertDialogTitle>Tìm kiếm</AlertDialogTitle>
          <Suspense fallback={<SkeletonForSearch />}>
          <SearchDialog
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (term.trim()) {
              router.push(`/blog/search?query=${encodeURIComponent(term)}`);
            }
          }}
            placeholder={placeholder}
            onChange={(e) => urlHandleChange(e.target.value)}
            defaultValue={searchParams?.get("query")?.toString()}
            />
            </Suspense>

          <Suspense fallback={<Loading />}>
          <SearchResultBox
            term={searchParams?.get("query")?.toString() || ''}
            posts={posts}
            closeHandleClick={closeHandleClick}
            />
            </Suspense>
        </AlertDialogHeader>
        <AlertDialogFooter className='relative h-full w-full'>
          <AlertDialogCancel className='absolute w-full bottom-0 bg-primary hover:bg-primary-foreground rounded-md text-neutral-800 border-none duration-300'>
            <ChevronLeft className='text-neutral-700'/>
            <span className='text-lg font-medium'>
            Quay lại
            </span>
            </AlertDialogCancel>
        </AlertDialogFooter>
        {/* <AlertDialogAction>Tìm kiếm</AlertDialogAction> */}
      </AlertDialogContent>
    </AlertDialog>

    </div>

  )
}

export default SearchComponent