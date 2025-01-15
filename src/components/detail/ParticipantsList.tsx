// 모임 참여 신청을 한 유저들의 목록을 보여주는 컴포넌트입니다.
import React, { useState } from 'react';
import { cn } from "@/utils/detail/cn";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { IParticipant } from "@/types/detail";
import { DEFAULT_IMAGE } from '@/constants/detail/images';

interface IParticipantsList {
  participants: IParticipant[];
  className?: string;
}

export const ParticipantsList: React.FC<IParticipantsList> = ({
  participants,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const visibleParticipants = participants.slice(0, 4);
  const remainingCountOfParticipants = participants.length - 4;
  
    return (
      <div className="flex justify-between text-sm w-full space-y-2">
            <HoverCard closeDelay={300}>
              <HoverCardTrigger asChild>
                <div
                  className={cn("flex -space-x-2")}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {visibleParticipants.map((participant) => (
                  <div
                    key={participant.userId}
                    className="relative w-8 h-8"
                  >
                    <div className="absolute w-8 h-8 rounded-full border-2 border-background200 overflow-hidden">
                      <Image
                        // src={participant.User?.image || '/svgs/profile.svg'}
                        src={DEFAULT_IMAGE.PROFILE}
                        // alt={participant.User?name || "Anonymous"}
                        alt="Anonymous"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}

                {remainingCountOfParticipants > 0 && (
                  <div className="relative w-8 h-8 flex items-center justify-center bg-background200 rounded-full border-2 border-background200">
                    <span className="text-xs text-gray400 font-medium">
                      +{remainingCountOfParticipants}
                    </span>
                  </div>
                )}
              </div>
              </HoverCardTrigger>

              <HoverCardContent
                className="w-64 p-2"
                align="start"
              >
                <div className="space-y-2">
                  {participants.map((participant) => (
                    <div
                      key={participant.userId}
                      className="flex items-center gap-2 p-1"
                    >
                      <Image
                        // src={participant.User?.image || '/svgs/profile.svg'}
                        src={DEFAULT_IMAGE.PROFILE}
                        // alt={participant.User?.name || 'Anonymous'}
                        alt="Anonymous"
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-sm text-textNormal">
                        {/* {participant.User?.name || 'Anonymous'} */}
                        Anonymous
                      </span>
                    </div>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>

      {/* 남은 인원 */}
      <span className="text-body-2-normal font-medium text-brown400">
        {"00명 더 참여할 수 있어요"}
      </span>
    </div>
  );
};