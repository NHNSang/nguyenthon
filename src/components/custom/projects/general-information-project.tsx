import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Project, SingleProject } from '@/types/typeForWordpressData'
import { SizeIcon } from '@radix-ui/react-icons';
import { BedIcon, Building2, DollarSign, MapPin, Timer } from 'lucide-react';
import React from 'react'


interface GeneralInformationProjectProps {
    project: SingleProject["project"];
}
const GeneralInformationProject: React.FC<GeneralInformationProjectProps> = ({ project }) => {
    return (
        <div>
            <Accordion defaultValue='item-1' type="single" collapsible className="w-full ">
                <AccordionItem value="item-1">
                    <AccordionTrigger className={`text-xl font-bold my-5 `}>Thông tin tổng quan về dự án</AccordionTrigger>
                    <AccordionContent>
                        <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 my-5'>
                            <div className='flex flex-col items-center justify-center space-y-3 bg-primary/10 rounded-md p-5 cursor-pointer hover:shadow-lg hover:shadow-primary duration-500'>
                                <SizeIcon className="h-16 w-16 text-primary" />
                                <p className='text-neutral-500 text-sm'>Diện tích</p>
                                <p className='text-xl font-bold text-neutral-500'>{project?.projectFields?.sizeOfProject} (m2)</p>
                            </div>

                            <div className='flex flex-col items-center justify-center space-y-3 bg-primary/10 rounded-md p-5 cursor-pointer hover:shadow-lg hover:shadow-primary duration-500'>
                                <Building2 className="h-16 w-16 text-primary" />
                                <p className='text-neutral-500 text-sm'>Số tầng</p>
                                <p className='text-xl font-bold text-neutral-500'>{project?.projectFields?.floor} (tầng)</p>
                            </div>

                            <div className='flex flex-col items-center justify-center space-y-3 bg-primary/10 rounded-md p-5 cursor-pointer hover:shadow-lg hover:shadow-primary duration-500'>
                                <Timer className="h-16 w-16 text-primary" />
                                <p className='text-neutral-500 text-sm'>Năm hoàn thành</p>
                                <p className='text-xl font-bold text-neutral-500'>{project?.projectFields?.completedYear}</p>
                            </div>

                            <div className='flex flex-col items-center justify-center space-y-3 bg-primary/10 rounded-md p-5 cursor-pointer hover:shadow-lg hover:shadow-primary duration-500'>
                                <MapPin className="h-16 w-16 text-primary" />
                                <p className='text-neutral-500 text-sm text-center'>Địa điểm</p>
                                <p className='text-xl font-bold text-neutral-500 text-center line-clamp-2 whitespace-nowrap '>{project?.projectFields?.location}</p>
                            </div>

                            <div className='flex flex-col items-center justify-center space-y-3 bg-primary/10 rounded-md p-5 cursor-pointer hover:shadow-lg hover:shadow-primary duration-500'>
                                <BedIcon className="h-16 w-16 text-primary" />
                                <p className='text-neutral-500 text-sm text-center'>Số phòng ngủ</p>
                                <p className='text-xl font-bold text-neutral-500 text-center line-clamp-2 whitespace-nowrap '>{project?.projectFields?.bedroom}</p>
                            </div>

                            <div className='flex flex-col items-center justify-center space-y-3 bg-primary/10 rounded-md p-5 cursor-pointer hover:shadow-lg hover:shadow-primary duration-500'>
                                <DollarSign className="h-16 w-16 text-primary" />
                                <p className='text-neutral-500 text-sm text-center'>Ngân sách dự án</p>
                                <p className='text-xl font-bold text-neutral-500 text-center line-clamp-2 whitespace-nowrap '>{project?.projectFields?.budget}</p>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </div>
    )
}

export default GeneralInformationProject
