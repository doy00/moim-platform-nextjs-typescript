'use client';

// React && NEXT
import React from 'react';
import Image from 'next/image';

// Components
import FilterDrawer from './FilterDrawer';

// Shadcn
import { Switch } from '@/components/ui/switch';

// Store
import { useFilterStore } from '@/stores/home/filterStore';

// Type
import { TFilterState } from '@/types/home/t-filterState';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function HomeHero() {
  const { sortOrder, setSortOrder, isConfirmed, toggleConfirmed } = useFilterStore();

  // ✅ 정렬 필터 (sortOrder)
  const renderedSelect = (
    <Select
      value={sortOrder}
      onValueChange={(value) => {
        console.log('🔄 Selected sort order:', value);
        setSortOrder(value as TFilterState['sortOrder']);
      }}
    >
      <SelectTrigger className="w-[112px] bg-white">
        <SelectValue placeholder="최신순" />
      </SelectTrigger>
      <SelectContent className="w-[112px]">
        <SelectItem value="LATEST">최신순</SelectItem>
        <SelectItem value="LIKES">찜 많은순</SelectItem>
        <SelectItem value="DEADLINE">마감일 빠른순</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <section>
      {/* 히어로 영역 */}
      <article className="px-4 pt-2">
        <div className="flex items-center justify-start w-full h-[58px] bg-background400 rounded-xl pl-4 py-[13px] space-x-2.5">
          <Image
            src="/svgs/img_dudu-hero.svg"
            alt="dudu-hero.img"
            width={32}
            height={32}
            priority
          />
          <p className="text-body-2-normal font-bold">
            오늘 <span className="text-orange200">5개</span>의 모임을 새로 발굴했어요!
          </p>
        </div>
      </article>

      {/* 필터 & 정렬 */}
      <article className="px-4 pt-5 flex items-center justify-between">
        <div className="flex items-center gap-x-1.5">
          {/* 필터 드로어 */}
          <div className="w-[52px] h-[42px] border border-background400 rounded-xl flex items-center justify-center bg-background100">
            <FilterDrawer />
          </div>
          {renderedSelect}
        </div>

        {/* 개설 확정 토글 */}
        <div className="flex items-center space-x-[6px]">
          <span className="text-body-2-reading text-[#9E9892]">개설확정</span>
          <Switch
            checked={isConfirmed === true}
            onCheckedChange={() => {
              console.log('🔄 Switch 상태 변경:', !isConfirmed);
              toggleConfirmed();
            }}
          />
        </div>
      </article>
    </section>
  );
}
