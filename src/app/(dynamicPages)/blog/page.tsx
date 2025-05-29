import Loading from "@/app/loading";
import BackgroundForBreadcrumb from "@/components/custom/BackgroundForBreadcrumb";
import PaginationComponent from "@/components/custom/pagination/PaginationComponent";
import { Button } from "@/components/ui/button";
import { getAllPosts, getPostsForBlogHub } from "@/lib/api";
import { DEFAULT_COMPANY_NAME } from "@/lib/constants";
import { ArrowRight, MousePointerClick } from "lucide-react";
import HeroBlogPosts from "@/components/custom/blog-posts/hero-blog-posts";
import LastestBlogPost from "@/components/custom/blog-posts/lastest-blog-post";
import BlogPosts from "@/components/custom/blog-posts/blog-posts";
import { Suspense } from "react";
import NewslettersLight from "@/components/custom/newsletters/newsletters-light";
import type { Metadata } from "next";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, CirclePlus, Link, Plus, User } from 'lucide-react'
import Image from 'next/image'
import { PageInfo, PostsData } from '@/types/typeForWordpressData'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Date from "@/components/custom/Date";
import MainBtn from "@/components/custom/buttons/main-btn";

// Define the expected shape of resolved searchParams
type SearchParams = {
  page?: string;
  query?: string;
};

// Define props to match Next.js expectations
interface SearchParamsProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | undefined;
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
  const amountOfPostPerPage = 6;
  const res = await getPostsForBlogHub(amountOfPostPerPage, currentPage);

  const filteredPostsByPagination = res?.posts?.edges ?? [];
  const pageCount = res?.posts?.pageInfo.offsetPagination?.total ?? 0;

  const { posts } = await fetchAllPosts();
  console.log("filteredPostsByPagination", filteredPostsByPagination);

  return (
    <div className="bg-gray-50">
      <Suspense fallback={<Loading />}>
        <BackgroundForBreadcrumb titleForPage="Trang blog và tin tức kiến trúc" />
        <main className="flex-1">
          {/* Hero Section */}
          <HeroBlogPosts initialPosts={posts} />

          {/* Bai viet moi */}
          <LastestBlogPost posts={posts} />

          {/* Blog Posts */}
          {
            filteredPostsByPagination && (

              <section
                id='posts-body-section'
                className="py-16 bg-gray-50 ">
                <div className="container">
                  <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-bold">Các bài viết mới</h2>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPostsByPagination?.map((post) => (
                      <Card
                        key={post?.node?.slug}
                        className="border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                        <div className="relative h-52 w-full overflow-hidden rounded-lg">
                          <Image
                            src={`${post?.node?.featuredImage?.node?.sourceUrl}`}
                            alt={post?.node?.featuredImage?.node?.altText || ""}
                            fill
                            className="object-cover rounded-t-lg filter brightness-90 hover:scale-110 transition-all duration-300 ease-in-out"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-primary-foreground text-neutral-100  text-xs font-medium rounded-full">
                              {post?.node?.categories?.nodes[0]?.name || 'Chưa phân loại'}
                            </span>
                          </div>
                        </div>
                        <CardHeader className="pt-6">
                          <CardTitle className="text-xl line-clamp-2">{post?.node?.title}</CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-2">
                            <Date
                              dateString={post?.node?.date}
                            />
                            <span className="text-sm text-gray-500">{post?.node.customPost?.readtime || 5} phút đọc</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div
                            className="text-gray-600 line-clamp-2 "
                            dangerouslySetInnerHTML={{ __html: post?.node?.excerpt || "" }} />
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                              {/* <User className="h-6 w-6 text-gray-500" /> */}
                              <Avatar>
                                <AvatarImage
                                  className='rounded-full'
                                  src={post?.node.author?.node?.avatar?.url || "https://secure.gravatar.com/avatar/6485eab7a6566369f68f8b9f195655be59c77be8194aea4ff431d44031341af1?s=96&d=mm&r=g"}
                                  alt={post?.node.author?.node?.name} />
                                <AvatarFallback>{post?.node.author?.node?.name}</AvatarFallback>
                              </Avatar>
                            </div>
                            <div>
                              <p className="font-medium text-base text-neutral-700">{post?.node.author?.node?.name || "Đang cập nhật"}</p>
                            </div>
                          </div>
                          <MainBtn
                            text="Xem chi tiết"
                            icon={<ArrowUpRight className='h-6 w-6' />}
                            href={`/blog/${post?.node?.slug}`} />
                        </CardFooter>
                      </Card>
                    ))}
                  </div>


                </div>
              </section>
            )
          }



          <div>
            {/* Pagination Component */}
            <PaginationComponent
              lengthOfPosts={filteredPostsByPagination?.length}
              pageCount={pageCount}
            />
          </div>

          {/* Newsletter */}
          <NewslettersLight />

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-primary/90 to-primary">
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
          </section>
        </main>
      </Suspense>
    </div>
  );
};

// Generate metadata for SEO
export async function generateMetadata({ searchParams }: SearchParamsProps): Promise<Metadata> {
  const resolvedSearchParams = (await searchParams) as SearchParams | undefined;

  const page = resolvedSearchParams?.page || "1";
  const query = resolvedSearchParams?.query || "";

  return {
    title: `Trang blog và tin tức kiến trúc - Trang ${page}${query ? ` | Tìm kiếm: ${query}` : ""}`,
    description: `Khám phá các bài viết mới nhất về kiến trúc và thiết kế từ ${DEFAULT_COMPANY_NAME}. Trang ${page}.${query ? ` Kết quả tìm kiếm cho: ${query}.` : ""}`,
  };
}

export default BlogpostPage;