"use client";

import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Post, PostsData, Project } from "@/types/typeForWordpressData";
import { Avatar } from "@radix-ui/react-avatar";
import { MousePointerClick, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ContactInfoModal from "../contact-infor-modal/contact-infor-modal";

interface SidebarComponentProps {
  relevantPost: NonNullable<PostsData["posts"]["edges"]> | undefined; // Define the type of relevantProjects
}

const PostSidebarComponent: React.FC<SidebarComponentProps> = ({
  relevantPost,
}) => {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.open(
        "https://www.facebook.com/nguyenthongjpconstruction/",
        "_blank"
      );
    }
  };
  return (
    <div className="lg:col-span-4">
      <div className="">
        {/* Author Card */}
        <Card className="border-none shadow-md mb-8 ">
          <CardContent className="p-6 bg-[#F5F5F3] rounded-md ">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full shadow-2xl flex items-center justify-center mb-4">
                {/* <User className="h-10 w-10 text-gray-500" /> */}
                <Avatar>
                  <AvatarImage
                    className="rounded-full"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              {/* <h3 className="font-bold text-lg mb-1">{project?.author?.node?.name}</h3> */}

              <p className="text-base font-medium text-neutral-600 mb-4">
                Trao đổi với đội ngũ thiết kế hơn 10 năm kinh nghiệm của Nguyên
                Thống JP
              </p>
              <Button
                onClick={() => handleClick()}
                className="w-full bg-primary hover:bg-primary/90 rounded-md text-lg"
              >
                Nhắn tin facebook
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-4">Bài viết liên quan</h3>
          <div className="space-y-4 ">
            {relevantPost?.map((item) => (
              <Link key={item.node.slug} href={`/du-an/${item.node.slug}`}>
                <div className="group flex flex-col items-start my-5 shadow-2xl">
                  <div className="relative h-[180px] w-full flex-shrink-0 rounded-t-md overflow-hidden bg-[#F5F5F3 ">
                    <Image
                      src={item?.node?.featuredImage?.node.sourceUrl || ""}
                      alt={item?.node?.featuredImage?.node.altText || ""}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="bg-[#F5F5F3] w-full p-2">
                    <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2 text-neutral-600">
                      {item.node.title}
                    </h4>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.node.excerpt || "",
                      }}
                      className="hidden text-sm text-gray-500"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Card className="border-none ">
          <CardContent className="p-6  bg-[#F5F5F3] shadow-2xl rounded-md">
            <h3 className="font-bold text-lg mb-2">
              Cần hổ trợ tư vấn từ đội ngũ chúng tôi
            </h3>
            <p className="text-base text-neutral-600 mb-4">
              Chúng tôi ở đây để giúp bạn thực hiện hóa ý tưởng của mình một
              cách chân thực nhất.Đừng ngần ngại! Gọi hoặc để lại thông tin và
              chúng tôi sẽ hổ trọ
            </p>
            {/* <Button className="w-full bg-primary hover:bg-primary/90 rounded-md text-base ">
                            Để lại thông tin
                            <MousePointerClick />
                        </Button> */}
            <ContactInfoModal />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostSidebarComponent;
