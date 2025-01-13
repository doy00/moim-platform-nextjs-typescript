// 모임 공유하기 컴포넌트
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DeleteIcon } from "./icons/DeleteIcon";

interface IDetailShare {
  className?: string;
  content?: string;
}
export const DetailShare: React.FC<IDetailShare> = ({ className }) => {

  return (
    <div className="relative flex flex-col">
      
      <div 
        className={cn("justify-between items-center flex w-full min-h-19 gap-2.5 p-3 mt-3 mb-4 bg-background400 rounded-2xl ", className)}
      >
        
        <div className="flex w-full items-center">
                    {/* 이미지 */}
                    <div className="flex gap-3 items-center w-full">
                        <div className="w-12 h-12 ml-1 shrink-0 relative rounded-full overflow-hidden">
                          <Image
                            src="/images/img_illust-circle.png"
                            alt={"프로필 이미지"}
                            fill
                            className="object-cover"
                          />
                        </div>
        
                      {/* 텍스트 */}
                        <div className="flex flex-col gap-1 justify-center">
                          <span className="text-label-normal font-normal text-gray500 whitespace-nowrap">
                            {"친구와 함께 참여해보세요"}
                          </span>
                          <span className="text-body-2-normal font-bold text-gray800 whitespace-nowrap">
                            {"모임 공유하기"}
                          </span>
                        </div>
        
                    </div>


                    {/* 아이콘 */}
                    <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                      <DeleteIcon />
                    </div>
        </div>



      </div>
    </div>
  )
}