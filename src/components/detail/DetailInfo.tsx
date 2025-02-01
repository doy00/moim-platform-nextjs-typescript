import React from "react";
import { ChipSmallSquircle } from "./ChipSmallSquircle";
import { ChipSmallRound } from "@/components/detail/ChipSmallRound";
import { Separator } from "@/components/ui/separator"
import { IDetailInfoProps } from "@/types/detail/i-components";
import { cn } from "@/utils/detail/cn";
import { getMoimTypeText } from "@/utils/detail/enums";
import { formatDate, getDeadlineText } from "@/utils/detail/date";

export const DetailInfo: React.FC<IDetailInfoProps> = ({
  title,
  address,
  recruitmentDeadline,
  startDate,
  endDate,
  participants,
  minParticipants,
  moimType,
  status,
  className,
}) => {
  // 개설 확정 여부 확인
  const isConfirmed = () => {
    return participants >= minParticipants;
  };

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
            text={getMoimTypeText(moimType)}
          />
          {isConfirmed() && (
          <ChipSmallSquircle 
            variant="dark"
            text="개설 확정"
          />
          )}
        </div>
      
        <div className="flex flex-col gap-1.5">
          <h3 className="text-body-1-normal font-medium text-textNormal truncate"
          >
            {title}
          </h3>
          <p className="text-caption-normal text-gray500 font-medium truncate">
            {address}
          </p>
        </div>

        <div className="flex flex-col gap-[0.5px]">
          <div className="flex items-center gap-2 w-full">
            <span className="text-caption-normal font-medium text-gray500">
              {"모집 일정"}
            </span>
            <Separator orientation="vertical" className="h-2 bg-gray200" />
            <span className="text-caption-normal font-medium text-gray500">
              {`${formatDate(recruitmentDeadline)} - ${formatDate(recruitmentDeadline)}`}
            </span>
            <span>
              <ChipSmallRound 
                variant="gray"
                text={getDeadlineText(recruitmentDeadline)}   // text="마감 D-10"
              />
            </span>
          </div>
          
          <div className="flex items-center gap-2 max-w-[255px]">
            <span className="text-caption-normal font-medium text-gray500">
              {"모임 날짜"}
            </span>
            <Separator orientation="vertical" className="h-2 bg-gray200" />
            <span className="text-caption-normal font-medium text-gray500 flex-1">
            {`${formatDate(startDate)} - ${formatDate(endDate)}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
