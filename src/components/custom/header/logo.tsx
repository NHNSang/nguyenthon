import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
const Logo = () => {
    return (
        <div>
            <Link href="/" className="flex-shrink-0">
                <div className='w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] '>
                <Image 
                src="https://aqua-pigeon-769011.hostingersite.com/wp-content/uploads/2025/06/logo-nguyen-thong-jp-removebg-preview.png" 
                width={100} height={100} 
                alt="logo" className='w-full h-full object-cover' />
                </div>  
            </Link>
        </div>
    )
}
export default Logo
