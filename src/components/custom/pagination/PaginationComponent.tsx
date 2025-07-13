"use client";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import classNames from "classnames";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

interface PaginationProps {
  pageCount: number;
  lengthOfPosts: number;
}
interface PaginationArrowProps {
  direction: "left" | "right";
  href: string;
  isDisabled: boolean;
}

const PaginationArrow: React.FC<PaginationArrowProps> = ({
  direction,
  href,
  isDisabled,
}) => {
  const router = useRouter();
  const isLeft = direction === "left";
  const disabledClassName = isDisabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <Button
      onClick={() => router.push(href)}
      className={` h-12 bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 px-2 text-neutral-100 group flex flex-row items-center justify-center duration-500 ${disabledClassName}`}
      aria-disabled={isDisabled}
      disabled={isDisabled}
    >
      {isLeft ? (
        <>
          {/* Hiện chữ ở desktop */}
          <span className="hidden md:block text-lg text-neutral-100 p-2 uppercase tracking-[1px] font-bold">
            Trang trước
          </span>
          {/* Hiện icon ở mobile */}
          <ArrowLeft className="block md:hidden w-5 h-5 text-neutral-100" />
        </>
      ) : (
        <>
          <span className="hidden md:block text-lg text-neutral-100 p-2 uppercase tracking-[1px] font-bold">
            Trang tiếp theo
          </span>
          <ArrowRight className="block md:hidden w-5 h-5 text-neutral-100" />
        </>
      )}
    </Button>
  );
};

const PaginationComponent = ({
  pageCount,
  lengthOfPosts,
}: Readonly<PaginationProps>) => {
  // truyền vào thông props pageCount là tổng số trang từ component cha
  const pathname = usePathname();
  const searchParams = useSearchParams(); //lấy những gì đằng sau dấu hỏi ? query
  const currentPage = Number(searchParams?.get("page") || 1); //lấy giá trị của tham số query `page` từ url nếu nó tồn tại, mặc định sẽ là số 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams || "");
    params.set("page", pageNumber.toString()); //  params.set("page", "2")
    return `${pathname}?${params.toString()}#posts-body-section`; //>> ?page=2
  };

  return (
    <section className=" py-10">
      <Pagination>
        <PaginationContent>
          <PaginationItem className="">
            {/* <PaginationPrevious href="#" /> */}
            <PaginationArrow
              direction="left"
              href={createPageURL(currentPage - 1)}
              isDisabled={currentPage <= 1}
            />
          </PaginationItem>

          <PaginationItem className="">
            <PaginationLink
              className="border-none font-bold text-lg"
              href={createPageURL(currentPage)}
            >
              {" "}
              {currentPage}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            {/* <PaginationNext href="#" /> */}
            <PaginationArrow
              direction="right"
              href={createPageURL(currentPage + 1)}
              isDisabled={lengthOfPosts <= 3}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default PaginationComponent;
