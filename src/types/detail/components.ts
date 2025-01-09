// 컴포넌트 관련 타입
export interface IImageBox {
  image: string;
  alt?: string;
  className?: string;
  aspectRatio?: string;
}

export interface IChipSmallSquircle {
  text: string;
  variant: 'light' | 'dark' | 'success' | 'tag';
  className?: string;
}

export interface IChipSmallRound {
  text: string;
  variant: 'gray';
  className?: string;
}