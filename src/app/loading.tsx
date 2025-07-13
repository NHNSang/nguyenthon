import { Building, House, LandPlot } from "lucide-react";
import Image from "next/image";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  const color = "#F6821F"
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-white h-screen w-screen px-4 text-center">
  <div className="container mx-auto">
    <p className="text-3xl md:text-4xl lg:text-6xl font-bold text-primary">
    NGUYEN THONG JP
  </p>
  </div>

  <div className="flex flex-wrap items-center justify-center gap-4 text-primary text-xl sm:text-2xl">
    <Building />
    <House />
    <LandPlot />
    <Building />
    <House />
    <LandPlot />
  </div>
</div>

  )
}