'use client';

import React from 'react';
import Image from 'next/image';

import HeartIcon from './icons/HeartIcon';
import { IMoim } from '@/utils/home/fetchMoims';

// DUMMYDATA TYPE
type HomeCardProps = {
  data: IMoim;
};

const categoryIcons: Record<string, string> = {
  project: '/svgs/ic_color-puzzle.svg',
  study: '/svgs/ic_color-open-book.svg',
  interview: '/svgs/ic_color-conversation.svg',
};

const categoryMap: Record<string, string> = {
  project: '프로젝트',
  study: '스터디·기획',
  interview: '면접',
};

const statusMap: Record<string, string> = {
  recruiting: '모집중',
  finished: '종료',
};

export default function HomeCard({ data }: HomeCardProps) {
  const { category, title, content, start_date, end_date, max_participants, status } = data;

  return (
    <article className="flex min-w-[343px] h-[138px] border border-orange200 p-4 space-x-5">
      {/* 왼쪽 컨텐츠 */}
      <section className="w-9 h-9">
        <Image
          src={categoryIcons[category]} 
          alt="category icon"
          width={36}
          height={36}
          priority
        />
      </section>
      {/* 오른쪽 컨텐츠 */}
      <section className="flex-1 flex-col min-w-[255px] h-[106px] space-y-2">
        {/* 카테고리 + 상태 + 하트 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-caption-normal bg-background400 px-1.5 py-[3px] rounded-md">
              {categoryMap[category]} 
            </span>
            <span className="text-caption-normal text-white bg-[#4a4642] px-1.5 py-[3px] rounded-md">
              {statusMap[status]} 
            </span>
          </div>
          <HeartIcon className="fill-gray200" />
        </div>
        {/* 모임 타이틀 + 위치 + 참여명수 */}
        <div className="space-y-1">
          <h3 className="text-body-1-normal">{title}</h3>
          <p className="text-sm text-gray-600">
            {content} · {max_participants}명 참여
          </p>
        </div>
        {/* 날짜 */}
        <div className="text-sm text-gray-500">
          {start_date} - {end_date}
        </div>
      </section>
    </article>
  );
}
