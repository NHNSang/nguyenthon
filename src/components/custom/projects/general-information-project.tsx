import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Project, SingleProject } from '@/types/typeForWordpressData'
import { SizeIcon } from '@radix-ui/react-icons'
import {
  BedIcon,
  Building2,
  DollarSign,
  MapPin,
  Timer,
  User,
  Hammer,
} from 'lucide-react'
import React from 'react'

interface GeneralInformationProjectProps {
  project: SingleProject['project']
}
const GeneralInformationProject: React.FC<GeneralInformationProjectProps> = ({
  project,
}) => {
  return (
    <div>
      <Accordion
        defaultValue="item-1"
        type="single"
        collapsible
        className="w-full "
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className={`lg:text-xl text-base font-bold mt-3 `}>
            Thông tin tổng quan về dự án
          </AccordionTrigger>
          <AccordionContent>
            <div className="w-full grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 my-5">
              <div className="flex flex-col items-center justify-center lg:space-y-3 bg-white border border-primary     p-2 lg:p-5 cursor-pointer hover:shadow-lg hover:shadow-primary duration-500">
                <SizeIcon className="h-6 w-6 lg:h-10 lg:w-10 text-primary" />
                <p className="text-neutral-600 text-sm mt-2">Diện tích</p>
                <p className="lg:text-xl text-base font-bold text-black">
                  {project?.projectFields?.sizeOfProject} (m2)
                </p>
              </div>

              <div className="flex flex-col items-center justify-center lg:space-y-3 bg-white border border-primary     p-2 lg:p-5 cursor-pointer hover:shadow-lg hover:shadow-primary duration-500">
                <Building2 className="h-6 w-6 lg:h-10 lg:w-10 text-primary" />
                <p className="text-neutral-600 text-sm mt-2">Số tầng</p>
                <p className="lg:text-xl text-base font-bold text-black">
                  {project?.projectFields?.floor} (tầng)
                </p>
              </div>

              <div className="flex flex-col items-center justify-center lg:space-y-3 bg-white border border-primary     p-2 lg:p-5 cursor-pointer hover:shadow-lg hover:shadow-primary duration-500">
                <Timer className="h-6 w-6 lg:h-10 lg:w-10 text-primary" />
                <p className="text-neutral-600 text-sm mt-2">Năm hoàn thành</p>
                <p className="lg:text-xl text-base font-bold text-black">
                  {project?.projectFields?.completedYear}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center lg:space-y-3 bg-white border border-primary     p-2 lg:p-5 cursor-pointer hover:shadow-lg hover:shadow-primary duration-500">
                <MapPin className="h-6 w-6 lg:h-10 lg:w-10 text-primary" />
                <p className="text-neutral-600 text-sm mt-2 text-center">
                  Địa điểm
                </p>
                <p className="lg:text-xl text-base font-bold text-black text-center line-clamp-2 ">
                  {project?.projectFields?.location}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center lg:space-y-3 bg-white border border-primary     p-2 lg:p-5 cursor-pointer hover:shadow-lg hover:shadow-primary duration-500">
                <User className="h-6 w-6 lg:h-10 lg:w-10 text-primary" />
                <p className="text-neutral-600 text-sm mt-2 text-center">
                  Chủ đầu tư
                </p>
                <p className="lg:text-xl text-base font-bold text-black text-center line-clamp-2 ">
                  {project?.projectFields?.bedroom}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center lg:space-y-3 bg-white border border-primary     p-2 lg:p-5 cursor-pointer hover:shadow-lg hover:shadow-primary duration-500">
                <Hammer className="h-6 w-6 lg:h-10 lg:w-10 text-primary" />
                <p className="text-neutral-600 text-sm mt-2 text-center">
                  Loại công trình
                </p>
                <p className="lg:text-xl text-base font-bold text-black text-center line-clamp-2 ">
                  {project?.projectFields?.projectCategory}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default GeneralInformationProject
