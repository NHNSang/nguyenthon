'use client'
import { useEffect, useState } from 'react';
import Navbar from './navbar'
import SecondaryHeader from './secondary-header'
import { usePathname } from 'next/navigation';
import { useWindowSize } from '@/hooks/useWindowSize';

const Header = () => {
  const pathname = usePathname();
  const [showHeader, setShowHeader] = useState(false);
  const {width,isMobile} = useWindowSize();

  useEffect(() => {
     // Nếu là mobile, luôn hiển thị header
    if (isMobile) {
      setShowHeader(true);
      return;
    }
    // Chỉ áp dụng logic scroll nếu đang ở trang chủ
    if (pathname === '/') {
      const handleScroll = () => {
        setShowHeader(window.scrollY > 150);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      // Nếu không phải trang chủ → luôn hiện header
      setShowHeader(true);
    }
  }, [pathname,isMobile]);
  // Tính màu theo trạng thái scroll
  const bgColor = showHeader ? 'bg-white shadow' : 'bg-transparent';
  const textColor = showHeader ? 'text-gray-600' : 'text-white';
  return (
    <header 
    className={`fixed top-0 z-50 w-full shadow-md 
    ${bgColor} 
    ${showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-100 md:opacity-0'
    }`}>
      <SecondaryHeader textColor={textColor} />
      <Navbar textColor={textColor} />
    </header>
  )
}

export default Header