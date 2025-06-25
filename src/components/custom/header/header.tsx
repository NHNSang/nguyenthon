'use client'
import { ReactNode, useEffect, useState } from 'react';
import Navbar from './navbar'
import SecondaryHeader from './secondary-header'
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
//  const [scrolled, setScrolled] = useState(false);
const [showHeader, setShowHeader] = useState(false);
  
  useEffect(() => {
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
  }, [pathname]);
    // Tính màu theo trạng thái scroll
    const bgColor = showHeader ? 'bg-white shadow' : 'bg-transparent';
    const textColor = showHeader ? 'text-gray-600' : 'text-white';
  return (
    <header
       className={`fixed top-0 z-50 w-full ${bgColor} ${showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <SecondaryHeader textColor={textColor} />
        <Navbar textColor={textColor}/>
      </header>
  )
}

export default Header