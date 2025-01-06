// React && NEXT
import React from 'react'
import Image from 'next/image'

export default function HomeHero() {
  return (
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
  )
}
