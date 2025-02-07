'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
// Constants
import { GNB_MENU } from '@/constants/home/gnb-menu';

export default function HomeGnb() {
  const pathname = usePathname();

  const showGnbPaths = ['/', '/favorites', '/mypage'];
  const shouldShowGnb = showGnbPaths.includes(pathname);

  if (!shouldShowGnb) return null;

  const renderedGnbMenu = GNB_MENU.map((menu) => {
    const isActive = pathname === menu.path;

    return (
      <li key={menu.name} className="cursor-pointer">
        <Link href={menu.path}>
          <div className="flex flex-col items-center w-[106px] h-[44px]">
            <menu.icon
              className={clsx(
                'w-6 h-6 transition-colors',
                isActive ? 'fill-[#42424A]' : 'fill-[#B8B9C1]'
              )}
            />
            <span
              className={clsx(
                'text-caption-normal',
                isActive ? 'text-[#42424A]' : 'text-[#B8B9C1]'
              )}
            >
              {menu.name}
            </span>
          </div>
        </Link>
      </li>
    );
  });

  return (
    <nav
      className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg w-full h-[62px] mx-auto fixed bottom-0 left-0 right-0 bg-background200 font-bold text-xl z-10 min-w-[500px] max-w-[1040px] 2xl:hidden"
    >
      <ul className="list-none w-full flex justify-between items-center text-sm px-6 py-[9px] mx-auto">
        {renderedGnbMenu}
      </ul>
    </nav>
  );
}
