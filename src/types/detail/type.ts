
export interface IImageBox {
  image: string;
  alt?: string;
  className?: string;
  aspectRatio?: string;
}

export interface IChipSmall {
  text: string;
  variant: 'light' | 'dark' | 'success';
  className?: string;
}

export interface IChipSmallRound {
  text: string;
  variant: 'gray';
  className?: string;
}