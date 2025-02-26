'use client';
import React, { memo } from "react"
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