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
          <div className="flex flex-col items-center">
            <menu.icon
              className={clsx(
                'w-10 h-10 transition-colors',
                isActive ? 'fill-black' : 'fill-gray-400'
              )}
            />
            <span
              className={clsx(
                'text-lg font-bold',
                isActive ? 'text-black' : 'text-gray-400'
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
    className="fixed bottom-0 left-0 right-0 bg-rose-50 text-green-600 font-bold text-xl z-10 mx-auto max-w-[500px] w-full"
    >
    {/* MENU_LIST */}
    <ul className="list-none flex justify-between items-center text-sm px-10 py-4">
      {renderedGnbMenu}
    </ul>
    </nav>
  )
}
