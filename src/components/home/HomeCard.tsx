import React from 'react'
import Image from 'next/image';

import HeartIcon from './icons/HeartIcon'

// DUMMYDATA TYPE
type HomeCardProps = {
  data: {
    id: number;
    category: number;
    title: string;
    content: string;
    recruitment_deadline: string;
    start_date: string;
    end_date: string;
    min_participants: number;
    max_participants: number;
    status: number;
  };
};

const categoryMap = {
  0: '프로젝트',
  1: '스터디·기획',
  2: '면접'
}

const statusMap = {
  0: '마감 D-10',
  1: '모집중',
  2: '종료',
};

export default function HomeCard({ data }: HomeCardProps ) {
  const { category, title, content, recruitment_deadline, start_date, end_date, min_participants, max_participants, status } = data;

    // 카테고리 번호에 따른 아이콘 맵핑
    const categoryIcons = [
      '/svgs/ic_color-puzzle.svg',       // category 0
      '/svgs/ic_color-open-book.svg',    // category 1
      '/svgs/ic_color-conversation.svg', // category 2
    ];

  return (
    <article className='flex w-[343px] h-[138px] border border-orange200 p-4 space-x-5'>
      {/* 왼쪽 컨텐츠 */}
      <section className='w-9 h-9'>
        <Image 
          src={categoryIcons[category]} alt="category icon"
          width={36} height={36}
          priority
        />
      </section>
      {/* 오른쪽 컨텐츠 */}
      <section className="flex flex-col w-[255px] h-[106px] space-y-2">
        {/* 카테고리 + 상태 + 하트 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-caption-normal bg-background400 px-1.5 py-[3px] rounded-md">{categoryMap[category]}</span>
            <span className="text-caption-normal text-white bg-[#4a4642] px-1.5 py-[3px] rounded-md">{statusMap[status]}</span>
          </div>
          <HeartIcon  className='fill-gray200'
          />
        </div>
        {/* 모임 타이틀 + 위치 + 참여명수 */}
        <div className='space-y-1'>
          <h3 className="text-body-1-normal">{title}</h3>
          <p className="text-sm text-gray-600">{content} · {max_participants}명 참여</p>
        </div>

        {/* 날짜 */}
        <div className="text-sm text-gray-500">
          {start_date} - {end_date}
        </div>
      </section>
    </article>
  )
}
