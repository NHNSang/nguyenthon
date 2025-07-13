import Date from "@/components/custom/Date";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { extractHeadings } from "@/hooks/useExtractHeadings";
import { BASE_URL } from "@/lib/constants";
import NewslettersLight from "@/components/custom/newsletters/newsletters-light";
import { fetchAllPosts, fetchSinglePost } from "@/data/datafromWP";
import ContentBlogPostProps from "@/components/custom/blog-posts/content-blogpost";
import PostSidebarComponent from "@/components/custom/sidebar/post-sidebar-component";

interface Params {
  slug: string;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await fetchSinglePost(slug);

    const imageUrl = post?.featuredImage?.node.sourceUrl || "";
    const validImageUrl = imageUrl ? new URL(imageUrl).toString() : "";

    return {
      title: post?.title,
      description: post?.excerpt,
      openGraph: {
        title: post?.title,
        description: post?.excerpt,
        url: `${BASE_URL}/blog/${slug}`,
        type: "article",
        images: validImageUrl
          ? [{ url: validImageUrl, width: 800, height: 600, alt: post?.title }]
          : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Post Not Found",
      description: "The post you are looking for does not exist.",
    };
  }
}

// Generate static parameters for dynamic routes
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const res = await fetchAllPosts(1000, "");
    // Ensure we return an array, even if res or res.posts is undefined
    return res?.posts?.map((post) => ({ slug: post.node.slug })) || [];
  } catch (error) {
    console.error("Error generating static params in blog:", error);
    return [];
  }
}

// Main page component
export default async function SinglePostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  try {
    const { slug } = await params;
    const post = await fetchSinglePost(slug);
    console.log("Slug of blog:", slug);

    if (!post?.slug) {
      console.error("Error: post.slug is undefined");
      throw new Error("Post slug is undefined");
    }

    const response = await fetchAllPosts(10, "");
    const PostsInSameCategory =
      response?.posts?.filter(
        (item) =>
          item.node.categories.nodes[0]?.name === post.categories.nodes[0]?.name
      ) || [];
    const relevantPost =
      PostsInSameCategory.filter((item) => item.node.slug !== post.slug) || [];

    const { headings, updateHtml } = extractHeadings(post.content as string);

    return (
      <div className="flex flex-col min-h-screen relative bg-white pt-[60px] lg:pt-[90px] px-4 mb-4 lg:mb-0">
        <main className="flex-1">
          {/* Blog Post Header */}
          <section className=" ">
            <div className="container">
              <div className="w-full flex items-center justify-start space-x-4 my-5">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 text-neutral-600 hover:text-primary-foreground hover:underline"
                >
                  <ArrowLeft className="h-7 w-7" />
                  Trở về
                </Link>
                <span className="inline-block px-3 py-1 bg-[#D0AC80] text-white text-sm">
                  Danh mục {post.categories.nodes[0]?.name || "Không xác định"}
                </span>
              </div>

              {/* Post Header */}
              <div className="w-full">
                <div className="line-clamp-2">
                  <h1 className="text-xl md:text-4xl font-bold tracking-tight mb-4">
                    {post.title}
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-base text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <Date dateString={post.date} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>6 phút đọc</span>
                  </div>
                </div>
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        post?.author?.node?.avatar?.url ||
                        "https://secure.gravatar.com/avatar/6485eab7a6566369f68f8b9f195655be59c77be8194aea4ff431d44031341af1?s=96&d=mm&r=g"
                      }
                      alt={post?.author?.node?.name || "Unknown"}
                    />
                    <AvatarFallback>
                      {post?.author?.node?.name || "N/A"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {post?.author?.node?.name || "Đang cập nhật"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="py-1">
            <div className="px-2 lg:container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <ContentBlogPostProps
                  headings={headings}
                  updateHtml={updateHtml}
                  post={post}
                />

                {/* Sidebar */}
                <PostSidebarComponent relevantPost={relevantPost} />
              </div>
            </div>
          </section>

          {/* Newsletter */}
          {/* <NewslettersLight /> */}
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error loading post:", error);
    return (
      <div>
        <h1>Post Not Found</h1>
        <p>We could not find the post you were looking for.</p>
      </div>
    );
  }
}
