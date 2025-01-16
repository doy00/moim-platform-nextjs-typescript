import React from "react";
import Image from "next/image";
import { cn } from "@/utils/detail/cn";
import { FootIcon } from "./icons/FootIcon";
import { FootEmptyIcon } from "./icons/FootEmptyIcon";
import { IDetailReview, IDetailReviewProps } from "@/types/detail";
import { DEFAULT_IMAGE } from "@/constants/detail/images";
import { DuduEmpty } from "./icons/DuduEmpty";


export const DetailReview: React.FC<IDetailReviewProps> = ({ 
  className, 
  rate = 0, 
  comment, 
  author, 
  date, 
  authorImage,
  reviewCount,
  }: IDetailReviewProps) => {

  // 평점
  const paws = Array.from({ length: 5 }, (_,index) => ({
    filled: index < rate, 
  }))

  // 이미지 로딩 실패시 기본 이미지를 보여줌
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DEFAULT_IMAGE.PROFILE;
  };
  
  // 리뷰가 없을 때의 빈 화면 UI
  if (reviewCount === 0) {
    return (
      <div className="relative flex flex-col">
         {/* 타이틀 */} 
            <div className="relative w-fit mt-5 px-2 font-semibold text-gray800 text-[16px]">
              {"모임 후기"}
              <span className="ml-2 text-orange200">
                {reviewCount}
              </span>
            </div>
          {/* 빈 화면 UI */}
          <div className="relative flex flex-col items-center justify-center py-16">
            <DuduEmpty />
            <p className="mt-4 text-gray400 text-caption-normal">
              아직 작성된 리뷰가 없어요
            </p>
          </div>
      </div>
    );
  }
  // 리뷰가 있을 때 UI
  return (
    <div className="relative flex flex-col">
      {/* 타이틀 */}
      <div className="relative w-fit mt-5 px-2 font-semibold text-gray800 text-[16px]">
        {"모임 후기"}
        <span className="ml-2 text-orange200">
          {reviewCount}
        </span>
      </div>

      {/* 후기 박스 */}
          <div 
            className={cn("relative flex flex-col gap-3 px-4 py-5 mt-4 bg-background400 rounded-2xl", className)}
          >
            {/* 평점 */}
            <div className="flex gap-0.5">
              {paws.map((paw, index) => (
                <div key={index} className="flex items-center justify-center">
                  {paw.filled ? <FootIcon /> : <FootEmptyIcon />}
                  </div>
              ))}
            </div>

            {/* 후기 텍스트 */}
            <p className="text-label-reading text-gray400 truncate">
              {comment}
            </p>
          
            {/* 리뷰 작성자 정보*/}
            <div className="flex items-center justify-end gap-2">
              {/* 작성자 프로핊사진 */}
              {authorImage && (
                <div className="h-6 w-6 overflow-hidden rounded-full">
                  <Image 
                    src={authorImage}
                    alt={`${author}의 프로필`}
                    className="h-full w-full object-cover"
                    width={6}
                    height={6}
                    onError={handleImageError}
                  />
              </div>
            )}

              {/* 작성자 이름 */}
              <div className="flex items-centr gap-2 text-caption-normal text-gray300">
                <span>{author}</span>
                <div className="h-2 w-px bg-gray200"></div>
                <span>{date}</span>
              </div>

            </div>
          </div>

      <button className="mt-6 w-full h-14 rounded-xl py-[17px] text-body-2-normal font-semibold text-gray400 bg-gray100 hover:bg-gray200">
        후기 더보기
      </button>

    </div>
  )
}