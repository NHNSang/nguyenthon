'use client'

import Loading from '@/app/loading';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { PostsData } from '@/types/typeForWordpressData';
import { ChevronLeft, Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { SkeletonForSearch } from '../../skeleton/SkeletonForSearch';
import SearchDialog from './SearchDialog';
import SearchResultBox from './SearchResultBox';



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
  const [posts, setPosts] = useState<PostsData['posts']['edges']>([])

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
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('posts', JSON.stringify(initialPosts));
    }
    // console.log(term)
  }, [searchParams, term, initialPosts])

  useEffect(() => {
    // check localStorage có dữ liệu hay không, nếu có thì setPosts bằng dữ liệu đó, nếu không thì setPosts bằng initialPosts
    if (typeof window !== 'undefined') {
      const localStoragePosts = window.localStorage.getItem('posts');
      if (localStoragePosts) {
        setPosts(JSON.parse(localStoragePosts));
      } else {
        setPosts(initialPosts);
      }
    }
  }, [initialPosts])


  const closeHandleClick = (open: boolean) => {
    setOpen(open)
  }
  // closeHandleClick sử dụng parameter open được truyền từ component con là SearchResultBox lên

  console.log("Posts in SearchComponent:", posts);
  return (
    <div className='relative flex justify-center '>

      <AlertDialog open={open} onOpenChange={setOpen}>
        {/* open và onOpenChange sử dụng để tùy chỉnh trạng thái bật tắt của dialog */}
        <AlertDialogTrigger >
          <Search className='ml-3 text-neutral-100  w-7 h-7 ' />
        </AlertDialogTrigger>
        <AlertDialogContent
          className='bg-gray-50 w-full h-[90%] md:h-[60vh] p-5 flex flex-col justify-start items-center'>
          <AlertDialogHeader className='w-full'>
            <AlertDialogTitle className='text-2xl'>Mục tìm kiếm</AlertDialogTitle>
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
            <AlertDialogCancel className='absolute w-full bottom-0 bg-primary hover:bg-primary/80 text-neutral-800 border-none duration-300 py-6'>
              <ChevronLeft className=' w-10 h-10' strokeWidth='1' />
              <span className='text-2xl font-medium'>
                Trở về
              </span>
            </AlertDialogCancel>
          </AlertDialogFooter>
          {/* <AlertDialogAction>Tìm kiếm</AlertDialogAction> */}
        </AlertDialogContent>
      </AlertDialog>

    </div>

  )
}

export default SearchComponent;

