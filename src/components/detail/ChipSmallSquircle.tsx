import React from "react";
import { cn } from "@/lib/utils";
import { IChipSmallSquircle } from "@/types/detail";

export const ChipSmallSquircle: React.FC<IChipSmallSquircle> = ({
  text,
  variant,
  className,
}) => {
  return (
    <div 
      className={cn(
        'px-2 py-1 rounded-md text-xs font-medium', 
        variant === 'light' && 'bg-background300 text-textNormal',
        variant === 'dark' && 'bg-gray800 text-gray50',
        variant === 'tag' && 'bg-background300 text-caption-normal',
        variant === 'emotion' && 'bg-background300, text-cation-normal, text-red200',
        className
      )}
    >
      {text}
    </div>
  );
};
