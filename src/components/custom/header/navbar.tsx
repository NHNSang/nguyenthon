"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronDown, Contact, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./logo";
import MainBtn from "../buttons/main-btn";
import DownloadBrochures from "../buttons/download-brochures";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

type NavbarProps = {
  textColor: string;
};
export default function Navbar({ textColor }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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

  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.open(
        "https://www.facebook.com/nguyenthongjpconstruction/",
        "_blank"
      );
    }
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <nav className="container mx-auto bg-transparent px-6 md:px-10 sticky top-0 z-50 h-[50px] lg:h-[65px]">
      <div className="flex justify-between items-center h-[65px]">
        {/* logo */}
        <Logo />
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-20">
          <NavItem href="/" label="Trang chủ" active={pathname === "/"} />
          <NavItem
            href="/he-thong"
            label="Hệ thống"
            active={pathname.startsWith("/he-thong")}
          />
          <NavItem
            href="/du-an"
            label="Mẫu nhà đẹp"
            active={pathname.startsWith("/du-an")}
          />
          {/* <NavItem href="/showcase" label="Showcase" active={pathname.startsWith("/showcase")} /> */}
          <NavItem
            href="/blog"
            label="Cẩm nang"
            active={pathname.startsWith("/blog")}
          />
          <NavItem
            href="/tuyen-dung"
            label="Tuyển dụng"
            active={pathname.startsWith("/tuyen-dung")}
          />
          {/* <NavItem href="/blog" label="Liên hệ" active={pathname.startsWith("/blog")} /> */}
          {/* <NavItem href="/sanpham" label="Sản phẩm" active={pathname.startsWith("/sanpham")} /> */}
        </div>

        {/* CTA Buttons */}
        {/* <div className="hidden lg:flex items-center space-x-2"> */}
        <div className="hidden lg:flex items-center mr-5">
          {/* <DownloadBrochures /> */}
          <MainBtn
            text="Đăng ký ngay"
            icon={<Contact className="w-5 h-5" />}
            href="/lien-he"
          />
        </div>

        {/* Mobile menu button */}
        <motion.button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          initial={false}
          animate={{ rotate: isMenuOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.5, delay: 2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.5 }}
              >
                <MenuIcon className="h-10 w-10" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed left-0 right-0 bg-neutral-50 px-6 z-40"
            style={{ top: "65px" }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            <motion.div
              className="flex flex-col space-y-4 py-6 min-h-[calc(100vh-65px)]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <MobileNavItem href="/" label="Về Nguyên Thống JP" />
              <MobileNavItem href="/du-an" label="Các dự án thiết kế" />
              <MobileNavItem href="/blog" label="Kiến thức & Tin tức" />
              <MobileNavItem href="/lien-he" label="Liên hệ" />

              <div className="pt-4 flex flex-col space-y-3 mt-auto">
                <Button
                  onClick={() => handleClick()}
                  className="bg-[#d5b78f] hover:bg-[#c5a77f] text-black rounded-full px-6 w-full"
                >
                  Kết nối facebook
                </Button>
                <Button
                  onClick={() => router.push("/lien-he")}
                  className="bg-[#d5b78f] hover:bg-[#c5a77f] text-black rounded-full px-6 w-full"
                >
                  Gửi yêu cầu tư vấn
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavItem({
  href,
  label,
  hasDropdown = false,
  active = false,
}: {
  href: string;
  label: string;
  hasDropdown?: boolean;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative text-xl font-calibri,flex items-center transition-colors duration-200 ${
        active
          ? "text-primary after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full"
          : "text-black hover:text-primary"
      }`}
    >
      {label}
      {hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
    </Link>
  );
}

function MobileNavItem({
  href,
  label,
  hasDropdown = false,
}: {
  href: string;
  label: string;
  hasDropdown?: boolean;
}) {
  return (
    <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
      <Link
        href={href}
        className="text-black hover:text-gray-600 py-2 font-medium flex items-center justify-between"
      >
        {label}
        {hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
      </Link>
    </motion.div>
  );
}
