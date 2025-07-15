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
import Logo from "./logo";

interface NavbarProps {
  initialPosts: PostsData["posts"]["edges"];
}
// mobile menu
export const navbarItems = [
  { href: "/", label: "Trang Chủ" },
  // { href: "/gioi-thieu-chung", label: "Giới thiệu chung" },
  { href: "/du-an", label: "Dự án" },
  { href: "/blog", label: "Tin tức & Sự Kiện" },
  { href: "/lien-he", label: "Liên hệ" },
  { href: "/tuyen-dung", label: "Tuyển dụng" },
];
const Navbar: React.FC<NavbarProps> = ({ initialPosts }) => {
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

    window.addEventListener("scroll", handleScroll);
    // Cleanup event listener khi component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          top: isMobile ? "0" : "70px",
          left: 0,
          width: "100%",
          zIndex: 50,
        },
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`${
        isFixed
          ? "fixed top-0 left-0 w-full z-50"
          : "absolute left-0 top-[0px] md:top-[56px] lg:top-[72px] z-50 bg-transparent"
      } 
    transition-all duration-300 `}
    >
      <div className="container mx-auto">
        <div
          className={`border-l-primary border-l-[5px] border-r-primary border-r-[5px] bg-[#1E1E1E] h-[60px] lg:h-[80px] ${
            isFixed ? "shadow-md" : ""
          }`}
        >
          <div className="flex items-center justify-between h-full">
            {/* Left - Logo */}
            <div className="flex items-center px-8">
              <Logo />
            </div>

            {/* Center - Menu */}
            <div className="hidden lg:flex items-center space-x-20">
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

            {/* Right - Hamburger / Search */}
            <div className="flex items-center gap-4 px-8">
              <HambugerMenu2 />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

function NavItem({
  href,
  label,
  hasDropdown = false,
  active = false,
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
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
      className={` relative text-xl font-bold  flex items-center transition-colors duration-200 uppercase px-8 min-h-[60px] lg:min-h-[80px] ${
        active || isHovered
          ? " text-primary bg-neutral-800 before:absolute before:top-0 before:left-0 before:w-full before:h-[7px] before:bg-primary "
          : "text-white hover:text-primary"
      }`}
    >
      {label}
      {hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
    </Link>
  );
}
