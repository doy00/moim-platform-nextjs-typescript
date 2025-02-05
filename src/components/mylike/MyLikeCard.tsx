'use client';

import { useLikeStore } from '@/stores/home/likeStore';
import { cn } from '@/utils/detail/cn';
import React from 'react';
import { ChipSmallSquircle } from '../detail/ChipSmallSquircle';
import { HeartIcon } from '../detail/icons/HeartIcon';
import { OpenBookIcon } from './icons/OpenBookIcon';
import { PuzzleIcon } from './icons/PuzzleIcon';

interface IMyLikeCardProps {
  moim: any; // 빌드 에러로 임시로 any 처리했습니다.
  onClick: () => void;
  onRemoveLike: (e: React.MouseEvent) => void;
}

export default function MyLikeCard({ moim, onClick, onRemoveLike }: IMyLikeCardProps) {
  const {
    moimId,
    moimType,
    title,
    roadAddress,
    startDate,
    endDate,
    participants,
    moimStatus,
    likes,
  } = moim;

  const { likes: likedMoims, toggleLike } = useLikeStore();
  const isLiked = likedMoims?.has?.(moimId);

  const handleLike = () => {
    toggleLike(moimId); // 낙관적 업데이트
  };

  const isProject = moim.moimType === '프로젝트';
  const isConfirmed = moim.participants >= moim.minParticipants;

  return (
    <div
      // onClick={() => onClickCard(moim.moimId)}
      className="relative flex flex-col w-full items-start bg-white rounded-2xl shadow-sm cursor-pointer transition-all hover:shadow-md"
    >
      <div className="flex items-center p-4">
        <div className="flex gap-5 items-start">
          <div
            className={cn(
              'flex w-9 h-9 justify-center items-center rounded-full',
              isProject ? 'bg-orange200' : 'bg-blue200',
            )}
          >
            {isProject ? <PuzzleIcon /> : <OpenBookIcon />}
          </div>

          <div className="flex flex-col gap-3">
            {/* 태그, 찜 버튼 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div className="flex gap-1">
                  <ChipSmallSquircle text={moim.moimType} variant="light" />
                  <ChipSmallSquircle text={`마감 D-10`} variant="light" />

                  {isConfirmed && <ChipSmallSquircle text="개설확정" variant="dark" />}
                </div>

                {/* 찜버튼 */}
                <button
                  onClick={handleLike}
                  className="p-1 hover:bg-gray50 rounded-full transition-colors"
                >
                  <HeartIcon />
                </button>
              </div>

              {/* 모임 타이틀, 장소 */}
              <div className="flex flex-col gap-1">
                <h3 className="text-body-1-normal font-medium text-textNormal truncate">
                  {moim.title}
                </h3>
                <p className="text-label-normal text-gray500">
                  {`${moim.si} ${moim.district}`}
                  <span className="mx-2 text-gray300">|</span>
                  {`${moim.participants}명 참여`}
                </p>
              </div>
            </div>

            {/* 날짜 */}
            <div className="text-caption-normal text-gray500">
              {`${moim.startDate} - ${moim.endDate}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
