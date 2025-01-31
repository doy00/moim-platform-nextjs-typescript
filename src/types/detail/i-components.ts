// 컴포넌트 관련 타입
import { StaticImageData } from "next/image";  // 정적 이미지 임포트 위해 추가
import { ECategory, EMoimStatus } from "../supabase/supabase-custom.type";
export interface IImageBox {
  image: string 
  | StaticImageData;
  alt?: string;
  className?: string;
  aspectRatio?: string;
}

export interface IChipSmallSquircle {
  text: string;
  variant: 'light' | 'dark' | 'success' | 'tag' | 'emotion';
  className?: string;
}

export interface IChipSmallRound {
  text: string;
  variant: 'gray';
  className?: string;
}

export interface IDetailInfoProps {
  title: string;
  address: string;
  recruitmentDeadline: string;
  startDate: string;
  endDate: string;
  recruitmentPeriod: string;
  minParticipants: number;
  moimType: ECategory;           // Enum 타입 사용
  status: EMoimStatus;           // Enum 타입 사용
  participants: number;
  className?: string;
}