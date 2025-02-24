// src/components/HomeCard.tsx
'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import HeartIcon from './icons/HeartIcon';
import { IMoim } from '@/types/home/i-moim';
import { useLikeStore } from '@/stores/home/likeStore';
import { MOIM_TYPE_MAP } from '@/constants/home/card-constants';
import { useQueryClient } from '@tanstack/react-query';

const DateDisplay = dynamic(() => import('./DateDisplay'), { ssr: false });

export default function HomeCard({ data }: { data: IMoim }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { moimId, moimType, title, address, startDate, endDate, participants, likes, isConfirmed } =
    data;
  const { likes: likedMoims, toggleLike, likeDeltas } = useLikeStore();
  const isLiked = likedMoims.has(String(moimId));

  const baseLikes = likes ?? 0;
  const optimisticDelta = likeDeltas[moimId] || 0;
  const displayLikes = baseLikes + optimisticDelta;

  const today = new Date();
  const end = new Date(endDate);
  const confirmedText = end < today ? '종료' : isConfirmed ? '개설확정' : '모집중';

  const handleLike = (event: React.MouseEvent) => {
    event.stopPropagation();
    requestIdleCallback(() => {
      queryClient.invalidateQueries({ queryKey: ['liked-moims'] });
      toggleLike(String(moimId));
    });
  };

  const handleNavigate = () => {
    router.push(`/detail/${moimId}`);
  };

  useEffect(() => {
    // 예: localStorage나 cookie 등을 확인
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  // const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('access_token');

  const localizedMoimType = MOIM_TYPE_MAP[moimType] || moimType;

  return (
    <>
      <article
        className="flex min-w-[343px] h-[174px] bg-white p-4 space-x-5 cursor-pointer"
        onClick={handleNavigate}
      >
        <section className="w-9 h-9">
          <Image
            src={`/svgs/ic_color-${moimType}.svg`}
            alt={`${moimType} icon`}
            width={36}
            height={36}
            priority
          />
        </section>
        <section className="flex-1 flex-col">
          <div className="flex justify-between items-center">
            <div className="space-x-1">
              <span className="text-caption-normal bg-background400 px-1.5 py-[3px] rounded-md">
                {localizedMoimType}
              </span>
              <span
                className={`text-caption-normal ${confirmedText === '종료' ? 'bg-red200' : 'bg-gray800'} text-white px-1.5 py-[3px] rounded-md`}
              >
                {confirmedText}
              </span>
            </div>
            {isLoggedIn && (
              <button
                onClick={handleLike}
                aria-label={isLiked ? 'Remove from likes' : 'Add to likes'}
              >
                <HeartIcon className={`w-6 h-6 ${isLiked ? 'fill-red-500' : 'fill-gray-300'}`} />
              </button>
            )}
          </div>
          <div className="pt-3 space-y-2">
            <h3 className="text-body-1-normal">{title}</h3>
            <Suspense fallback={<p>Loading...</p>}>
              <p data-lcp-priority="high" className="text-sm text-gray600">
                {address} | {participants}명 참여 | 좋아요: {displayLikes}
              </p>
            </Suspense>
            {/* <p className="text-sm text-gray-500 pt-3">
              {`${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`}
            </p> */}
            <DateDisplay startDate={startDate} endDate={endDate} />
          </div>
        </section>
      </article>
    </>
  );
}
