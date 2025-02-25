// ProfileImage.tsx
import Image from 'next/image';
import { DEFAULT_IMAGE } from '@/constants/detail/detail.const';
import { useEffect, useState } from 'react';

interface ProfileImageProps {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export const ProfileImage = ({ src, alt, width,  height, className }: ProfileImageProps) => {
  const [imgSrc, setImgSrc] = useState(src || DEFAULT_IMAGE.PROFILE);

  // src prop이 변경되면 imgSrc 업데이트
  useEffect(() => {
    if (src) {
      setImgSrc(src);
    }
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImgSrc(DEFAULT_IMAGE.PROFILE)}
      // onError={(e) => { e.currentTarget.src = DEFAULT_IMAGE.PROFILE }}
      priority
    />
  );
};