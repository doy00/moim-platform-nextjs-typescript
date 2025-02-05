'use client';

import React from 'react';
import { cn } from '@/utils/detail/cn';
import { HeartIcon } from '../detail/icons/HeartIcon';
import { useLikeStore } from '@/stores/home/likeStore';
import { ConversationIcon } from './icons/ConversationIcon';
import { PuzzleIcon } from './icons/PuzzleIcon';
import { OpenBookIcon } from './icons/OpenBookIcon';
import { ChipSmallSquircle } from '../detail/ChipSmallSquircle';
import { Separator } from '../ui/separator';
import { formatDate, getDeadlineText } from '@/utils/detail/date';
import { getMoimTypeText } from '@/utils/detail/enums';
import { IMoimDetail } from '@/types/detail/t-moim';

interface IMyLikeCardProps {
  moim: IMoimDetail;
  onClick: () => void;
  onRemoveLike: (e: React.MouseEvent) => void;
}

export default function MyLikeCard ({ moim, onClick, onRemoveLike }: IMyLikeCardProps) {
  const {
    moimId,
    moimType,
    title,
    address,
    startDate,
    endDate,
    recruitmentDeadline,
    participants,
    minParticipants,
    status,
    likes,
  } = moim;

  const { likes: likedMoims, toggleLike } = useLikeStore();
  // const isLiked = likedMoims?.has?.(moimId);

  // const handleLike = () => {
  //   toggleLike(moimId); // 낙관적 업데이트
  // };

  const isProject = moimType === "PROJECT";
  const isConfirmed = participants >= minParticipants;


  return (
    <div
      onClick={onClick}  
      className="relative flex flex-col w-full items-start bg-white rounded-2xl shadow-sm cursor-pointer transition-all hover:shadow-md"
    >
      <div className="flex items-center p-4 w-full">
        <div className="flex gap-5 items-start w-full">
          <div className={cn(
            "flex w-9 h-9 justify-center items-center rounded-full",
            isProject ? "bg-orange200" : "bg-blue200"
          )}>
            {isProject ? <PuzzleIcon /> : <OpenBookIcon />}
          </div>

          <div className="flex flex-col flex-1 gap-3">
            {/* 태그, 찜 버튼 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div className="flex gap-1 flex-wrap">
                  <ChipSmallSquircle 
                    // text={moimType}
                    text={getMoimTypeText(moimType)}
                    variant="light"
                  />
                  <ChipSmallSquircle
                    text={getDeadlineText(recruitmentDeadline)}
                    variant="light"
                  />
                  {isConfirmed && (
                    <ChipSmallSquircle
                      text="개설확정"
                      variant="dark"
                    />
                  )}
                  </div>

                  {/* 찜버튼 */}
                  <button
                    onClick={onRemoveLike}
                    className="p-1 hover:bg-gray50 rounded-full transition-colors"
                  >
                    <HeartIcon />
                  </button>
                </div>

                  {/* 모임 타이틀, 장소 */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-body-1-normal font-medium text-textNormal truncate">
                      {title}
                    </h3>
                    <div className="text-label-normal text-gray500 flex">
                      <span>
                      {address}
                      </span>
                      <span className="mx-2 text-gray300 flex-shrink-0">
                        <Separator orientation="vertical" />
                      </span>
                      <span className="flex-shrink-0">
                      {`${participants}명 참여`}
                      </span>
                    </div>
                  </div>

                </div>

                {/* 날짜 */}
                <div className="text-caption-normal text-gray500">
                  {`${formatDate(startDate)} - ${formatDate(endDate)}`}
                </div>

              </div>
            </div>
          </div>

        </div>
  );
}
