// 현재 참여 인원수와 참여 유저 목록을 알 수 있는 컴포넌트입니다.
import React, { useMemo } from "react";
import { cn } from "@/utils/detail/cn";
import { ParticipantsList } from "./ParticipantsList";
import { TParticipatedUserClient } from "@/types/supabase/supabase-custom.type";
import { ParticipantsProgressA } from "./progress/ParticipantsProgress"
import { TMe } from "@/types/auth/auth.type";

interface IDetailParticipantsProps {
  participants: TParticipatedUserClient[];
  maxParticipants: number;
  minParticipants: number;
  currentParticipants: number;
  masterUser: TMe;
  className?: string;
}
export const DetailParticipants: React.FC<IDetailParticipantsProps> = ({
  participants,
  maxParticipants,
  minParticipants,
  currentParticipants,
  masterUser,
  className
}) => {
  // 주최자 포함 모든 참여자
  const allParticipants = useMemo(() => {
    const masterExists = participants?.some(p => p.userUuid === masterUser.id);

    // 주최자가 참여자 목록에 없으면 추가
    if (!masterExists) {
      const masterParticipant: TParticipatedUserClient = {
        userUuid: masterUser.id,
        userEmail: masterUser.email,
        userImage: masterUser.image || '',
        userNickname: masterUser.nickname || '주최자',
        // isHost: true  // 주최자 표시를 위한 플래그
      };
      return [masterParticipant, ...(participants || [])];
    }

    // 이미 존재하는 경우 해당 참여자의 정보를 업데이트
  return (participants || []).map(p => {
    if (p.userUuid === masterUser.id) {
      return {
        ...p,
        // 이미지가 있는 경우에만 업데이트
        userImage: masterUser.image !== null ? masterUser.image : p.userImage,
        // isHost: true
      };
    }
    return p;
  });
  }, [masterUser, participants]);
  return (
    <div 
      className={cn("relative flex flex-col gap-4 px-5 py-5 mt-5 lg:px-6 lg:py-8 lg:mt-8 bg-background400 rounded-2xl items-center",
      "min-h-[154px]",
      className)}
      aria-labelledby="participants-section-title"
    >
      <h3 id="participants-section-title" className="sr-only">모임 참여자 현황</h3>
        {/* 참여 인원수 Progress Bar */}
        <ParticipantsProgressA
          currentCount={currentParticipants}
          minParticipants={minParticipants}
          maxParticipants={maxParticipants}
        />
        {/* 참여 유저 목록 */}
        <ParticipantsList 
          // participants={participants}
          participants={allParticipants}
          maxParticipants={maxParticipants}
        />
    </div>
  );
};