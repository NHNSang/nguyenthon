'use client'
import { Button } from '@/components/ui/button'
import { HouseIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface MainBtnProps {
    text:string
    icon:React.ReactNode
    href?:string
    className?:string
}

const 
MainBtn:React.FC<MainBtnProps> = ({text,icon,href,className}) => {
    const router = useRouter();
    return (
        <Button
        onClick={()=>router.push(href || "/")}
        className={`${className} h-12 bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 rounded-full px-6 text-neutral-100 group flex flex-row items-center justify-center duration-500`}>
            <div className="opacity-0 translate-x-[100%] group-hover:opacity-100 group-hover:translate-x-0 duration-500 w-5 h-5">
                {icon}
            </div>
            <span className="-translate-x-[10%] group-hover:translate-x-4 duration-500 text-base">
                {text}
            </span>
        </Button>
    )
}

export default MainBtn
