'use client'

// React && NEXT
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

//Components
import FilterActivateIcon from './icons/FilterActivateIcon'

//Shadcn
import { Switch } from '@/components/ui/switch'
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function HomeHero() {

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isSelectOpen, setSelectOpen] = useState(false);

//   const handleDrawerOpenChange = (open: boolean) => {
//   setDrawerOpen(open);
//   const container = document.querySelector('#layout-container');
//   if (container) {
//     if (open) {
//       container.setAttribute('inert', ''); // inert 속성 추가
//     } else {
//       container.removeAttribute('inert'); // inert 속성 제거
//     }
//   }
// };

useEffect(() => {
    const container = document.getElementById('layout-container'); // 특정 컨테이너 선택
    if (!container) return;

    if (isDrawerOpen || isSelectOpen) {
      container.style.overflow = 'hidden'; // 여기만 스크롤 차단
    } else {
      container.style.overflow = ''; // 원상태로 복구
    }

    return () => {
      container.style.overflow = ''; // 컴포넌트 언마운트 시 초기화
    };
}, [isDrawerOpen, isSelectOpen]);


  const renderedDrawer = (
      <Drawer onOpenChange={(open) => setDrawerOpen(open)}>
        <DrawerTrigger>
          <FilterActivateIcon className="fill-gray200" />
        </DrawerTrigger>
        <DrawerContent className="fixed inset-x-0 bottom-0 z-50 mt-24 flex flex-col bg-white border rounded-t-lg shadow-lg">
          <DrawerHeader className="p-4 text-center">
            <DrawerTitle className="text-lg font-semibold">
              Are you absolutely sure?
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-500">
              This action cannot be undone.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="flex flex-col gap-2 p-4">
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  )

  const renderedSelect = (
    <Select onOpenChange={(open) => setSelectOpen(open)}>
      <SelectTrigger className="w-[98px] h-[42px] border border-background400 rounded-xl flex items-center justify-center bg-background100">
        <SelectValue placeholder="최신순" />
      </SelectTrigger>
      <SelectContent container={document.getElementById("portal-root")}>
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
            {renderedDrawer}
          </div>
            {renderedSelect}
          {/* <div className='w-[98px] h-[42px] border border-background400 rounded-xl flex items-center justify-center bg-background100'> */}
          {/* </div> */}
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
