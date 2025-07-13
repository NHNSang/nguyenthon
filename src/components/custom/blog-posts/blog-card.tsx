"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Date from "@/components/custom/Date";
import { ArrowUpRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import MainBtn from "@/components/custom/buttons/main-btn";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  post: any;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/blog/${post?.node?.slug}`);
  };

  return (
    <Card
      key={post?.node?.slug}
      className=" hover:shadow-xl transition-shadow cursor-pointer lg:shadow-2xl h-full mx-5 lg-mx-0 border border-primary"
      onClick={handleCardClick}
    >
      <div className="relative h-[180px] w-full overflow-hidden b">
        <Image
          src={`${post?.node?.featuredImage?.node?.sourceUrl}`}
          alt={post?.node?.featuredImage?.node?.altText || ""}
          fill
          className="object-cover filter brightness-90 hover:scale-110 transition-all duration-300 ease-in-out"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary-foreground text-neutral-100 text-xs font-medium ">
            {post?.node?.categories?.nodes[0]?.name || "Chưa phân loại"}
          </span>
        </div>
      </div>
      <CardHeader className="">
        <CardTitle className="md:text-xl  uppercase lg:tracking-[1px] font-semibold line-clamp-1">
          {post?.node?.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-4">
          <Date dateString={post?.node?.date} />
          <span className="text-sm text-gray-500">
            {post?.node.customPost?.readtime || 5} phút đọc
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="text-[#5f5c5c] text-base lg:px-0 lg:text-lg line-clamp-2 lg:line-clamp-2 font-normal"
          dangerouslySetInnerHTML={{
            __html: post?.node?.excerpt || "",
          }}
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center m-3">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <Avatar>
              <AvatarImage
                className="rounded-full"
                src={
                  post?.node.author?.node?.avatar?.url ||
                  "https://secure.gravatar.com/avatar/6485eab7a6566369f68f8b9f195655be59c77be8194aea4ff431d44031341af1?s=96&d=mm&r=g"
                }
                alt={post?.node.author?.node?.name}
              />
              <AvatarFallback>{post?.node.author?.node?.name}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p className="font-medium text-base text-neutral-700">
              {post?.node.author?.node?.name || "Đang cập nhật"}
            </p>
          </div>
        </div>
        {/* <MainBtn
          text="Xem chi tiết"
          icon={<ArrowUpRight className="h-6 w-6" />}
          href={`/blog/${post?.node?.slug}`}
        /> */}
        <Button className="px-4 bg-[#D5B78F] text-white hover:scale-105 uppercase duration-500">
          <Link href={`/blog/${post?.node?.slug}`}>Xem Chi Tiết</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
