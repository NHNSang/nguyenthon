'use client';
import { Sheet, SheetContent, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { TableCellsSplit } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';


interface TableOfContentProps {
    headings: {
        id: string;
        text: string;
        level: number;
    }[]
}
const TableOfContent: React.FC<TableOfContentProps> = ({
    headings
}) => {

    return (
        <Accordion
        defaultValue='toc'
        type='single' 
        collapsible 
        className='w-full p-5 bg-[#F5F5F3] '>
            <AccordionItem value='toc'>
                <AccordionTrigger >
                   <span className='font-semibold text-black text-lg'>
                    Nội dung bài viết
                    </span> 
                </AccordionTrigger>
                <AccordionContent>
                    <nav className='p-4 border-l-4 border-gray-300 '>
                        {/* <h3 className='font-semibold'>Mục lục</h3> */}
                        <ul className='mt-2 space-y-1'>
                            {headings.map((heading => (
                                <li
                                    key={heading.id}
                                    className={`pl-${(heading.level - 2) * 4}`}
                                >
                                    <Link
                                        href={`#${heading.id}`}
                                        className='text-neutral-600 hover:underline text-base 0'
                                    >
                                        {heading.text}
                                    </Link>
                                </li>
                            )))}
                        </ul>
                    </nav>

                </AccordionContent>
            </AccordionItem>

        </Accordion>

    )
}

export default TableOfContent;


