// 현재 참여 인원수와 참여 유저 목록을 알 수 있는 컴포넌트입니다.
import React from "react";
import { cn } from "@/utils/detail/cn";
import { IMoimDetail } from "@/types/detail/t-moim";
import { ParticipantsProgress } from "./ParticipantsProgress";
import { ParticipantsList } from "./ParticipantsList";

interface IDetailParticipantsProps {
  data: IMoimDetail; // 전체 모임 데이터
  className?: string;
}
export const DetailParticipants: React.FC<IDetailParticipantsProps> = ({
  data,
  className
}) => {
  return (
    <div 
      className={cn("relative flex flex-col gap-2.5 px-4 py-5 mt-5 bg-background400 rounded-2xl items-center", className)}
    >
        {/* 참여 인원수 Progress Bar */}
        <ParticipantsProgress
          currentCount={data.participantsMoims.length}
          minParticipants={data.minParticipants}
          maxParticipants={data.maxParticipants}
        />

        {/* 참여 유저 목록 */}
        <ParticipantsList 
          participantsMoims={data.participantsMoims || []}
          maxParticipants={data.maxParticipants}
        />
    </div>
  );
};