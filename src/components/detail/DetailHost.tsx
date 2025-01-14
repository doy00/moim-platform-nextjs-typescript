// 주최자 프로필 컴포넌트
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ChipSmallSquircle } from "./ChipSmallSquircle";
import { DEFAULT_IMAGE } from '@/constants/detail/images';

interface IDetailHost {
  name: string;
  introduction: string;
  hostTag: string[];
  profileImage?: string;
}

export const DetailHost = ({ 
  name, 
  introduction, 
  hostTag, 
  profileImage 
}: IDetailHost) => {
  return (
    <div className="relative flex flex-col">
      <div className="relative w-fit mt-5 px-2 font-semibold text-body-1-reading">
        {"주최자 프로필"}
      </div>

        <div className="flex w-full min-h-32 p-5 flex-col gap-2.5 items-start bg-background400 rounded-xl mt-2">
          <div className="flex w-full flex-col gap-5 items-start">
            {/* 프로필 영역 */}
            <div className="flex gap-3.5 items-center w-full">
              {/* 프로필 이미지 */}
              <div className="w-12 h-12 shrink-0 relative rounded-full overflow-hidden">
                <Image
                  src={profileImage || DEFAULT_IMAGE.PROFILE}
                  alt={"주최자 프로필 이미지"}
                  fill
                  className="object-cover"
                />
            </div>

            {/* 주최자 소개 텍스트 */}
            <div className="flex flex-col gap-0.5">
              <span className="text-body-2-normal font-medium text-gray800">
                {name}
              </span>
              <span className="text-label-normal text-gray400">
                {introduction}
              </span>
            </div>

            </div>

            {/* 주최자 태그 */}
            <div className="flex gap-1 items-center ">
              {hostTag.map((tag, index) => (
              <ChipSmallSquircle
                key={`tag-${index}`}
                text={tag}
                variant='tag'
                className={cn("text-gray300")}
              />
              ))}
            </div>

          </div>
        </div>
      </div>
  );
};