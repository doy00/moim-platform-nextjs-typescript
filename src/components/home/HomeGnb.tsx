'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


//Libraries
import clsx from 'clsx'

// Constants
import { GNB_MENU } from '@/constants/home/gnb-menu'


export default function HomeGnb() {

  const pathname = usePathname();

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
    className="h-[62px] fixed bottom-0 left-0 right-0 bg-background200 text-green-600 font-bold text-xl z-10 mx-auto max-w-[500px] w-full"
    >
    {/* MENU_LIST */}
    <ul className="list-none flex justify-between items-center text-sm px-6 py-[9px] mx-auto">
      {renderedGnbMenu}
    </ul>
    </nav>
  )
}
