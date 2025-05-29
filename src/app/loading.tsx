import { Building, House, LandPlot } from "lucide-react";
import Image from "next/image";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  const color = "#F6821F"
  return (
    <div className='fixed h-[100vh] w-[100vw] inset-0 flex flex-col items-center justify-center gap-5 bg-white z-50
    '>
      <p className="text-6xl font-bold text-primary">
          NGUYEN THONG JP
        </p>
     <div className="flex flex-row gap-2 text-primary font-semibold">
     <Building />
      <House />
      <LandPlot/>
      <Building />
      <House />
      <LandPlot/>
     </div>
      {/* <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
        <path 
          fill="none" 
          stroke="#C6A378" 
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray="300 385"
          strokeDashoffset="0"
          d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
        >
          <animate 
            attributeName="strokeDashoffset"
            calcMode="spline"
            dur="2"
            values="685;-685"
            keySplines="0 0 1 1"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      </div> */}
    </div>
  )
}