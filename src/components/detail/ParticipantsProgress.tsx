// 모임 참여 현황을 알 수 있는 Progress Bar 컴포넌트입니다.

import React from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/detail-progress';
import { IParticipantsProgress } from '@/types/detail';

export const ParticipantsProgress: React.FC<IParticipantsProgress> = ({
  currentCount,
  maxCount,
  className
}) => {
  const progress = (currentCount / maxCount) * 100;
  const isMinimumMet = currentCount >= 3;   // 최소인원 3명

  return (
    <div className="w-full space-y-2">
      {/* 참여 신청한 인원 */}
      <div className="flex flex-col">
        <span className="font-medium text-body-2-normal text-textNormal">
          {"{currentCount}명 참여중"}
        </span>
      </div>

      <Progress 
        value={progress}
        className="h-3 rounded-full bg-gray200"
        progressColor={isMinimumMet ? "bg-brown400" : "bg-gray500"}   // 최소인원 달성 시 주황색
      />

      {/* 최소, 최대 인원 */}
      <div className="flex justify-between text-xs">
        <span className="text-gray400">
          {"최소인원 3명"}
        </span>
        <span className="text-gray400">
          {"최대인원 {maxCount}명"}
        </span>
      </div>
      
    </div>
  )

}
