'use client';

import React from 'react';
import Image from 'next/image';
import HeartIcon from './icons/HeartIcon';
import { IMoim } from '@/types/home/i-moim';
import { useLikeStore } from '@/stores/home/likeStore';

export default function HomeCard({ data }: { data: IMoim }) {
  const { moimId, moimType, title, address, startDate, endDate, participants, likes } = data;
  
  // `likes` 상태를 불러옴
  const { likes: likedMoims, toggleLike } = useLikeStore();

  // `moimId`를 문자열로 변환하여 비교
  const isLiked = likedMoims.has(String(moimId));

  const handleLike = (event: React.MouseEvent) => {
    event.stopPropagation(); // 부모 클릭 이벤트 방지
    toggleLike(String(moimId));
  };

  return (
    <article className="flex min-w-[343px] h-[138px] border border-orange200 p-4 space-x-5">
      <section className="w-9 h-9">
        <Image
          src={`/svgs/ic_color-${moimType}.svg`}
          alt={`${moimType} icon`}
          width={36}
          height={36}
          priority
        />
      </section>
      <section className="flex-1 flex-col min-w-[255px] h-[106px] space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-caption-normal bg-background400 px-1.5 py-[3px] rounded-md">
            {moimType}
          </span>
          <button onClick={handleLike} aria-label={isLiked ? 'Remove from likes' : 'Add to likes'}>
            <HeartIcon className={`w-6 h-6 ${isLiked ? 'fill-red-500' : 'fill-gray-300'}`} />
          </button>
        </div>
        <div>
          <h3 className="text-body-1-normal">{title}</h3>
          <p className="text-sm text-gray-600">
            {address} | {participants}명 참여
          </p>
          <p className="text-sm text-gray-500">{`${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`}</p>
          <p className="text-sm text-gray-600">좋아요 수: {likes}</p>
        </div>
      </section>
    </article>
  );
}
