import React from "react";
import { cn } from "@/lib/utils";
import { IChipSmallRound } from "@/types/detail/type";

export const ChipSmallRound: React.FC<IChipSmallRound> = ({
  text,
  variant,
  className,
}) => {
  return (
    <div 
      className={cn(
        'px-2 py-1 rounded-full text-xs font-medium', 
        variant === 'gray' && 'bg-[#D5D3D0] text-textNormal',
        className
      )}
    >
      {text}
    </div>
  );
};
