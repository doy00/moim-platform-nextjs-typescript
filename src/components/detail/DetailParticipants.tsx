// 현재 참여 인원수와 참여 유저 목록을 알 수 있는 컴포넌트입니다.
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { IDetailParticipants } from "@/types/detail";
import { ParticipantsProgress } from "./ParticipantsProgress";
import { ParticipantsList } from "./ParticipantsList";

export const DetailParticipants: React.FC<IDetailParticipants> = ({
  participants,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={cn("relative flex flex-col gap-2.5 px-4 py-5 mt-5 bg-background400 rounded-2xl items-center", className)}
    >
        {/* 참여 인원수 Progress Bar */}
        <ParticipantsProgress
          currentCount={participants.length}
          // maxCount={maxParticipants}
          maxCount={12}
        />

        {/* 참여 유저 목록 */}
        <ParticipantsList 
          participants={participants}
        />
    </div>
  );
};