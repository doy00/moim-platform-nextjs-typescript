'use client'

// React && NEXT
import React from 'react'
import Image from 'next/image'

//Components

//Shadcn
import { Switch } from '@/components/ui/switch'


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FilterDrawer from './FilterDrawer'


export default function HomeHero() {

  const renderedSelect = (
    <Select>
      <SelectTrigger className="w-[112px]">
        <SelectValue placeholder="최신순" />
      </SelectTrigger>
      <SelectContent className='w-[112px]'>
        <SelectItem value="최신순">최신순</SelectItem>
        <SelectItem value="찜 많은순">찜 많은순</SelectItem>
        <SelectItem value="마감일 빠른순">마감일 빠른순</SelectItem>
      </SelectContent>
    </Select>
  )


  return (
    <section>
      <article className='px-4 pt-2'>
        <div className='flex items-center justify-start w-full h-[58px] bg-background400 rounded-xl pl-4 py-[13px] space-x-2.5'>
          <Image
            src='/svgs/img_dudu-hero.svg'
            alt="dudu-hero.img"
            width={32}
            height={32}
            priority
            />
          <p className='text-body-2-normal font-bold'>오늘 <span className='text-orange200'>5개</span>의 모임을 새로 발굴했어요!</p>
        </div>
      </article>
      <article className='px-4 pt-5 flex items-center justify-between'>
        {/* 필터 */}
        <div className='flex items-center gap-x-1.5'>
          <div className='w-[52px] h-[42px] border border-background400 rounded-xl flex items-center justify-center bg-background100'>
            <FilterDrawer />
          </div>
            {renderedSelect}
        </div>
        {/* SWITCH 토글 */}
        <div className='flex items-center space-x-[6px]'>
          <span className='text-body-2-reading text-[#9E9892]'>개설확정</span>
          <Switch />
        </div>
      </article>
    </section>
  )
}
