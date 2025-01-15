'use client';

import React from 'react';
import Image from 'next/image';

//Components-icon
import HeartIcon from './icons/HeartIcon';
//Type
import { IMoim } from '@/types/home/i-moim';
// Store
import { useFavoriteStore } from '@/stores/home/favoriteStore';

// DUMMYDATA TYPE
// type THomeCardProps = {
//   data: IMoim;
// };

// const categoryIcons: Record<string, string> = {
//   project: '/svgs/ic_color-puzzle.svg',
//   study: '/svgs/ic_color-open-book.svg',
//   interview: '/svgs/ic_color-conversation.svg',
// };

// const categoryMap: Record<string, string> = {
//   project: '프로젝트',
//   study: '스터디·기획',
//   interview: '면접',
// };

// const statusMap: Record<string, string> = {
//   recruiting: '모집중',
//   finished: '종료',
// };

const categoryIcons: Record<string, string> = {
  project: '/svgs/ic_color-puzzle.svg',
  study: '/svgs/ic_color-open-book.svg',
  interview: '/svgs/ic_color-conversation.svg',
};

export default function HomeCard({ data }: { data: IMoim }) {
  const {
    id,
    type,
    name,
    location,
    dateTime,
    registrationEnd,
    participantCount,
    capacity,
    status,
    confirmed,
    likes
  } = data;

  const { favorites, toggleFavorite } = useFavoriteStore();
  const isFavorited = favorites.has(id);

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
      {/* 왼쪽 컨텐츠 */}
      <section className="w-9 h-9">
        <Image
          src={categoryIcons[type] || '/images/default-image.jpg'} // 기본 이미지 처리
          alt="category icon"
          width={36}
          height={36}
          priority
        />
      </section>
      {/* 오른쪽 컨텐츠 */}
      <section className="flex-1 flex-col min-w-[255px] h-[106px] space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-caption-normal bg-background400 px-1.5 py-[3px] rounded-md">
              {typeMap[type]}
            </span>
            <span className="text-caption-normal bg-background400 px-1.5 py-[3px] rounded-md">
              {statusMap[status]}
            </span>
            {confirmed && (
              <span className="text-caption-normal text-white bg-gray800 px-1.5 py-[3px] rounded-md">
                개설확정
              </span>
            )}
          </div>
          <button onClick={() => toggleFavorite(id)}>
            <HeartIcon className={`w-6 h-6 ${isFavorited ? 'fill-red-500' : 'fill-gray-300'}`} />
          </button>
        </div>
        <div className="space-y-1">
          <h3 className="text-body-1-normal">{name}</h3>
          <p className="text-sm text-gray-600">
            {location} · {participantCount}/{capacity}명 참여
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {new Date(dateTime).toLocaleDateString()} -{' '}
          {new Date(registrationEnd).toLocaleDateString()}
          {/* 좋아요 수 */}
          <p className="text-sm text-gray-600">좋아요 수: {likes}</p>
        </div>
      </section>
    </article>
  );
}
