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
        variant === 'success' && 'bg-[#04A37E] text-gray50',
        className
      )}
    >
      {text}
    </div>
  );
};
