"use client";

import HambugerMenu2 from "@/components/custom/header/hambugerMenu2";
import SearchComponent from "@/components/custom/header/search/SearchComponent";
import { useWindowSize } from "@/hooks/useWindowSize";
import { PostsData } from "@/types/typeForWordpressData";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface NavbarProps {
  initialPosts: PostsData['posts']['edges']
}
// mobile menu
export const navbarItems = [
  { href: "/", label: "Trang Chủ" },
  // { href: "/gioi-thieu-chung", label: "Giới thiệu chung" },
  { href: "/du-an", label: "Mẫu nhà đẹp" },
  { href: "/blog", label: "Cẩm nang" },
  { href: "/lien-he", label: "Liên hệ" },
  { href: "/tuyen-dung", label: "Tuyển dụng" },
];
const Navbar: React.FC<NavbarProps> = ({
  initialPosts
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useWindowSize();
  const [isFixed, setIsFixed] = useState(false);
  const [scrollY, setScrollY] = useState(0);



  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const scrollTop = window.scrollY;
        setScrollY(scrollTop);
        if (scrollTop > 50) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    // Chạy handler một lần khi component mount để thiết lập trạng thái ban đầu
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    // Cleanup event listener khi component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  // Hàm xử lý khi hover vào NavItem
  const handleHover = (href: string | null) => {
    setHoveredItem(href);
  };
  // Smooth scroll effect with Framer Motion
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let rafId: number;
    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Animate the scroll position
          document.body.style.scrollBehavior = "auto";
          window.scrollTo({
            top: currentScrollY,
            behavior: "smooth",
          });
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
      document.body.style.scrollBehavior = "smooth";
    };
  }, []);


  return (
    <motion.nav
      ref={navRef}
      initial={false}
      animate={isFixed ? "fixed" : "absolute"}
      variants={{
        fixed: {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 50,
        },
        absolute: {
          position: "absolute",
          // top: isMobile ? "55px" : "90px",
          left: 0,
          width: "100%",
          zIndex: 50,
        }
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`${isFixed
        ? "fixed top-0 left-0 w-full z-50"
        : "absolute left-0 top-[55px] md:top-[56px] lg:top-[90px] z-50 bg-transparent"} 
        mx-auto lg:px-0 xl:px-32 px-6 transition-all duration-300`}
    >
      <div className={`border-l-primary border-l-[6px] bg-[#1E1E1E] flex flex-row justify-between items-center xl:px-32 h-[60px] lg:h-[80px] ${isFixed ? "shadow-md" : ""}`}>
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-20 flex-auto">
          {navbarItems.map((item, index) => (
            <NavItem
              onMouseEnter={() => handleHover(item.href)}
              onMouseLeave={() => handleHover(null)}
              key={index}
              href={item.href}
              label={item.label}
              active={pathname === item.href}
              hasDropdown={false}
              isHovered={hoveredItem === item.href}
            />
          ))}

        </div>
        <div className="mx-10 lg:mx-1 flex items-center flex-row justify-between lg:justify-center gap-4 w-full lg:flex-none lg:w-[100px]">
          <SearchComponent
            initialPosts={initialPosts}
          />
          <HambugerMenu2 />
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;

function NavItem({
  href,
  label,
  hasDropdown = false,
  active = false,
  isHovered = false,
  onMouseEnter,
  onMouseLeave
}: {
  href: string;
  label: string;
  hasDropdown?: boolean;
  active?: boolean;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <Link
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={` relative text-xl font-calibri flex items-center transition-colors duration-200 uppercase px-8 py-10 ${active || isHovered
        ? " text-primary bg-neutral-800 before:absolute before:top-0 before:left-0 before:w-full before:h-[7px] before:bg-primary "
        : "text-white hover:text-primary"
        }`}
    >
      {label}
      {hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
    </Link>
  );
}
