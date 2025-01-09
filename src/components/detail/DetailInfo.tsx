import React from "react";
import { cn } from "@/lib/utils";
import { ChipSmallSquircle } from "./ChipSmallSquircle";
import { ChipSmallRound } from "@/components/detail/ChipSmallRound";
import { Separator } from "@/components/ui/separator"
import { IDetailInfo } from "@/types/detail";

export const DetailInfo: React.FC<IDetailInfo> = ({
  title,
  location,
  recruitmentPeriod,
  meetingDate,
  className,
}) => {
  return (
    <div className={cn(
      "relative flex flex-col gap-2.5 px-4 py-5 mt-5 bg-background400 rounded-2xl",
      className
    )}
    >
      <div className="flex flex-col gap-4 w-full">
      
        <div className="flex gap-1.5">
          <ChipSmallSquircle 
            variant="light"
            text="프로젝트"
          />
          <ChipSmallSquircle 
            variant="success"
            text="개설 확정"
          />
        </div>
      
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-medium text-textNormal truncate"
        >
          {title}
        </h3>
        <p className="text-xs text-gray400 truncate">
          {location}
        </p>
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2 w-full">
          <span className="text-caption-normal text-gray400">{"모집 일정"}</span>
          <Separator orientation="vertical" className="mx-1 h-3 bg-gray200" />
          <span className="text-caption-normal text-gray400">
            {recruitmentPeriod}
          </span>
          <span>
            <ChipSmallRound 
              variant="gray"
              text="마감 D-10"  
            />
          </span>
        </div>
        
        <div className="flex items-center gap-2 max-w-[255px]">
          <span className="text-caption-normal text-gray400">{"모임 날짜"}</span>
          <Separator orientation="vertical" className="mx-1 h-3 bg-gray200" />
          <span className="text-caption-normal text-gray400 flex-1">
            {meetingDate}
          </span>
        </div>
      </div>
      </div>
    </div>
  );
};
