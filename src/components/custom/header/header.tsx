import Navbar from '@/components/custom/header/navbar'
import { getAllPosts } from '@/lib/api'
import SecondaryHeader from './secondary-header'
import { useWindowSize } from '@/hooks/useWindowSize'

const Header = async () => {
  const posts = await fetchAllPosts() // lấy dữ liệu tất cả bài viết
  return (
    <>
      <SecondaryHeader />
      <Navbar initialPosts={posts} />
    </>
  )
}

export default Header

async function fetchAllPosts() {
  try {
    const res = await getAllPosts(1, '')
    const posts = res?.posts?.edges
    return posts || []
  } catch (error) {
    console.warn('Failed to fetch posts for header:', error);
    return []
  }
}
