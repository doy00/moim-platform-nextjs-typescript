import React from "react";
import { cn } from "@/lib/utils";

interface IDetailContent {
  className?: string;
  content: string;
}
export const DetailContent: React.FC<IDetailContent> = ({ className, content }) => {

  return (
    <div className="relative flex flex-col">
      <div className="relative w-fit mt-5 px-2 font-semibold text-gray800 text-[16px]">
        {"모임 내용"}
      </div>

      <div 
        className={cn("relative flex flex-col gap-2.5 px-4 py-[18px] mt-4 bg-background400 rounded-2xl ", className)}
      >
        <p className="text-body-2-reading text-gray800">{content}</p>
      </div>
    </div>
  )
}