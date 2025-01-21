'use client';

import React from 'react';
import Image from 'next/image';

//Components-icon
import HeartIcon from './icons/HeartIcon';
//Type
import { IMoim } from '@/types/home/i-moim';
// Store
import { useFavoriteStore } from '@/stores/home/favoriteStore';

const categoryIcons: Record<string, string> = {
  project: '/svgs/ic_color-puzzle.svg',
  study: '/svgs/ic_color-open-book.svg',
  interview: '/svgs/ic_color-conversation.svg',
};

export default function HomeCard({ data }: { data: IMoim }) {
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
  } = data;

  const { favorites, toggleFavorite } = useFavoriteStore();
  const isFavorited = favorites.has(moimId);

  const typeMap: Record<string, string> = {
    project: '프로젝트',
    study: '스터디·기획',
    interview: '면접',
  };

  const statusMap: Record<string, string> = {
    recruiting: '모집중',
    finished: '종료',
  };

  return (
    <article className="flex min-w-[343px] h-[138px] border border-orange200 p-4 space-x-5">
      <section className="w-9 h-9">
        <Image
          src={categoryIcons[moimType] || '/images/default-image.jpg'}
          alt="category icon"
          width={36}
          height={36}
          priority
        />
      </section>
      <section className="flex-1 flex-col min-w-[255px] h-[106px] space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-caption-normal bg-background400 px-1.5 py-[3px] rounded-md">
              {typeMap[moimType]}
            </span>
            <span className="text-caption-normal bg-background400 px-1.5 py-[3px] rounded-md">
              {statusMap[moimStatus]}
            </span>
          </div>
          <button
            onClick={() => toggleFavorite(moimId)}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <HeartIcon className={`w-6 h-6 ${isFavorited ? 'fill-red-500' : 'fill-gray-300'}`} />
          </button>
        </div>
        <div className="space-y-1">
          <h3 className="text-body-1-normal">{title}</h3>
          <p className="text-sm text-gray-600">
            {roadAddress} · {participants}명 참여
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
          <p className="text-sm text-gray-600">좋아요 수: {likes}</p>
        </div>
      </section>
    </article>
  );
}
