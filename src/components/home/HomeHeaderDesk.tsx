'use client';

import React from 'react';
import Link from 'next/link';

import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import PlusIcon from './icons/PlusIcon';
import clsx from 'clsx';
import { GNB_MENU } from '@/constants/home/gnb-menu';


export default function HomeHeaderDesk() {
  const router = useRouter();
  const pathname = usePathname()

  const showGnbDeskPaths = ['/','/mylike','/mypage']
  const shouldGndDesk = showGnbDeskPaths.includes(pathname)

  if (!shouldGndDesk) return null

  const renderedDeskMenu = GNB_MENU.map((menu) => {
    const isActive = pathname === menu.path;

    return (
      <li key={menu.name} className="cursor-pointer">
        <Link href={menu.path}>
          <span
            className={clsx(
              'text-body-2-normal px-4 py-2 transition-colors',
              isActive ? 'text-[#42424A] font-semibold' : 'text-[#B8B9C1]'
            )}
          >
            {menu.name}
          </span>
        </Link>
      </li>
    );
  });

  const handlePlusClick = () => {
    router.push('/make');
  };

  return (
    <header className="hidden 2xl:flex w-full h-20 justify-center items-center">
      <section className="flex justify-between items-center w-[1440px]">
        {/* Menu */}
        <div className='flex space-x-16'>
          <Image
            src="svgs/img_logo-text.svg"
            alt="img-logo-text"
            width={120}
            height={16}
            priority
          />
          {/* GNB 메뉴 가져오기 */}
          <ul className='flex flex-x-2.5'>
            {renderedDeskMenu}
          </ul>
        </div>
        {/* Icon */}
        <div className="cursor-pointer flex space-x-2 items-center" onClick={handlePlusClick}>
          <PlusIcon className="fill-orange200" />
          <span className='text-body-2-normal font-semibold text-gray300 hover:text-[#42424A]'>모임 만들기</span>
        </div>
      </section>
    </header>
  );
}
