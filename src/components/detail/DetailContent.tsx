import React from "react";
import { cn } from "@/utils/detail/cn";

interface IDetailContent {
  className?: string;
  content: string;
}
export const DetailContent: React.FC<IDetailContent> = ({ className, content }) => {

  return (
    <div className="relative flex flex-col">
      <div className="relative w-fit mt-5 lg:mt-8 px-2 font-semibold text-gray800 text-body-1-reading">
        {"모임 내용"}
      </div>

      <div 
        className={cn("relative flex flex-col gap-2.5 px-6 py-[18px] lg:px-6 mt-4 bg-background400 rounded-2xl ", className)}
      >
        <p className="text-body-2-reading text-gray800 font-medium">{content}</p>
      </div>
    </div>
  )
}