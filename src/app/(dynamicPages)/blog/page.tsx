import Loading from "@/app/loading";
import PaginationComponent from "@/components/custom/pagination/PaginationComponent";
import { getAllPosts, getPostsForBlogHub } from "@/lib/api";
import { DEFAULT_COMPANY_NAME } from "@/lib/constants";
import LastestBlogPost from "@/components/custom/blog-posts/lastest-blog-post";
import BlogCard from "@/components/custom/blog-posts/blog-card";
import { Suspense } from "react";
import type { Metadata } from "next";

// Define the expected shape of resolved searchParams
type SearchParams = {
  page?: string;
  query?: string;
};

// Define props to match Next.js expectations
interface SearchParamsProps {
  searchParams?:
    | Promise<{ [key: string]: string | string[] | undefined }>
    | undefined;
}

// Function to fetch all posts
async function fetchAllPosts() {
  const res = await getAllPosts(100, "");
  const posts = res?.posts?.edges ?? [];
  const pageInfo = res?.posts?.pageInfo ?? {};
  return { posts, pageInfo };
}

// BlogpostPage component
const BlogpostPage = async ({ searchParams }: SearchParamsProps) => {
  // Resolve searchParams and cast to expected shape
  const resolvedSearchParams = (await searchParams) as SearchParams | undefined;

  const currentPage = Number(resolvedSearchParams?.page || 1);
  const amountOfPostPerPage = 10;
  const res = await getPostsForBlogHub(amountOfPostPerPage, currentPage);

  const filteredPostsByPagination = res?.posts?.edges ?? [];
  const pageCount = res?.posts?.pageInfo.offsetPagination?.total ?? 0;

  const { posts } = await fetchAllPosts();
  // console.log("filteredPostsByPagination", filteredPostsByPagination);

  return (
    <div className="bg-[#F1EDE6] pt-[140px]">
      <Suspense fallback={<Loading />}>
        <main className="flex-1">
          {/* Bai viet moi */}
          <LastestBlogPost posts={posts} />
          {/* Blog Posts */}
          {filteredPostsByPagination && (
            <section id="posts-body-section" className=" bg-[#F1EDE6] ">
              <div className="mt-8 container">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl md:text-4xlfont-light">
                    Các bài viết mới
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredPostsByPagination?.map((post) => (
                    <BlogCard key={post?.node?.slug} post={post} />
                  ))}
                </div>
              </div>
            </section>
          )}

          <div>
            {/* Pagination Component */}
            <PaginationComponent
              lengthOfPosts={filteredPostsByPagination?.length}
              pageCount={pageCount}
            />
          </div>

          {/* Newsletter */}
          {/* <NewslettersLight /> */}

          {/* CTA Section */}
          {/* <section className="py-20 bg-gradient-to-r from-primary/90 to-primary">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center text-white">
                <h2 className="text-3xl font-bold mb-4">
                  Kết nối với đội ngũ thiết kế tại của {DEFAULT_COMPANY_NAME}
                </h2>
                <p className="text-white/90 mb-8">Đặt lịch hẹn, nhận tư vấn miễn phí</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="w-full bg-neutral-100 text-neutral-800 hover:bg-neutral-200 rounded-md text-base">
                    Liên hệ ngay
                    <MousePointerClick />
                  </Button>
                  <Button
                    variant="link"
                    className="underline text-neutral-100 hover:bg-white/10"
                  >
                    Xem chi tiết
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section> */}
        </main>
      </Suspense>
    </div>
  );
};

// Generate metadata for SEO
export async function generateMetadata({
  searchParams,
}: SearchParamsProps): Promise<Metadata> {
  const resolvedSearchParams = (await searchParams) as SearchParams | undefined;

  const page = resolvedSearchParams?.page || "1";
  const query = resolvedSearchParams?.query || "";

  return {
    title: `Trang blog và tin tức kiến trúc - Trang ${page}${query ? ` | Tìm kiếm: ${query}` : ""}`,
    description: `Khám phá các bài viết mới nhất về kiến trúc và thiết kế từ ${DEFAULT_COMPANY_NAME}. Trang ${page}.${query ? ` Kết quả tìm kiếm cho: ${query}.` : ""}`,
  };
}

export default BlogpostPage;
