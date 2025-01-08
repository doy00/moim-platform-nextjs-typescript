import React, { useState } from "react"
import { IImageBox } from "@/types/detail/type"

export const ImageBox: React.FC<IImageBox> = ({
  image,
  alt= "모임 이미지",
  className,
  aspectRatio = "aspect-[1.91/1]",
}) => {
  // 이미지 로드 실패 상태를 관리하는 상태 변수
  const [hasError, setHasError] = useState(false);

  // 이미지가 없거나 로드에 실패했을 때 표시
  if (!image || hasError) {
    return (
      <div className={`relative w-full mx-auto rounded-2xl overflow-hidden ${aspectRatio} ${className || ''}`}>
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <p className="text-sm">이미지를 찾을 수 없습니다</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`relative w-full mx-auto rounded-2xl overflow-hidden ${aspectRatio} ${className || ''}`}>
      <div className="absolute inset-0">
        <img 
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      </div>
    </div>
  )
}