'use client';
import React, { memo, useState } from "react"
import { IImageBox } from "@/types/detail/i-components"
import { IMAGE_SIZE } from "@/constants/detail/detail.const";
import { DEFAULT_IMAGE } from "@/constants/detail/detail.const";
import Image from "next/image";
import { cn } from "@/utils/detail/cn";

const ImageBoxComponent: React.FC<IImageBox> = ({
  image,
  alt,
  className,
  aspectRatio,
}) => {
  // 이미지 로드 실패 상태를 관리하는 상태 변수
  // const [hasError, setHasError] = useState(false);


  // // 이미지 소스가 유효하지 않은 경우를 체크
  // const isInvalidImage = !image || image === "" || hasError;

  // // fallback 이미지를 표시해야 하는 경우
  // if (isInvalidImage) {
  //   return (
  //     <div className={`relative w-full mx-auto rounded-2xl overflow-hidden ${aspectRatio} ${className || ''}`}>
  //       <div className="absolute inset-0 bg-gray100 flex items-center justify-center">
  //         <div className="text-center text-gray400">
  //           <p className="text-sm">이미지를 찾을 수 없습니다</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  
  // /// 이미지 소스 처리하는 함수
  // const getImageSource = (): string | StaticImageData => {
  //   // 이미지가 에러상태 또는 이미지가 없을 경우
  //   if (hasError || !image || image === "") {
  //     return DEFAULT_IMAGE.MOIM;
  //   }
  //   // 이미지가 StaticImageData 타입인 경우 그대로 반환
  //   if (typeof image !== 'string') {
  //     return image;
  //   }
  //   // 이미지가 URL 형태일 경우 그대로 반환
  //   if (image.startsWith('https') || image.startsWith('data:') || image.startsWith('/')) {
  //     return image;
  //   }
  //   // 이미지가 상대 경로일 경우
  //   return `images/${image}`;  
  // };

  // ===============



  return (
    <div className={cn(
      "relative w-full mx-auto rounded-2xl overflow-hidden",
      `aspect-[${IMAGE_SIZE.ASPECT_RATIO.MOBILE}]`,
      `md:aspect-[${IMAGE_SIZE.ASPECT_RATIO.DESKTOP}]`,
      "h-[180px]",
      "lg:h-[276px]",
      className
      )}
    >
        <Image 
          // src={getImageSource()}
          src={image}
          alt={alt || '모임이미지'}
          fill
          className={cn(
            'object-cover absolute inset-0',
          )}
          sizes={IMAGE_SIZE.DEFAULT}
          // onError={() => setHasError(true)}
          onError={(e) => { e.currentTarget.src = DEFAULT_IMAGE.MOIM }}
          priority={true}
        />
    </div>
  )
}

export const ImageBox = memo(ImageBoxComponent);
ImageBox.displayName = 'ImageBox';