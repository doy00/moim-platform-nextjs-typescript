'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import PlusIcon from './icons/PlusIcon';
import clsx from 'clsx';
import { GNB_MENU } from '@/constants/home/gnb-menu';
import { HeaderAnimation } from '../mypage/LoadingAnimation';
import { useAuth } from '@/hooks/auth/auth.hook';
import { confirmSignout } from '../make/MakeSoner';
import { MdLogout } from 'react-icons/md';
import { PiSignOutBold } from 'react-icons/pi';

export default function HomeHeaderDesk() {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const showGnbDeskPaths = ['/', , `/detail/`, '/mylike', '/mypage'];
  const isDetailPage = pathname.startsWith('/detail/');

  const shouldGndDesk = showGnbDeskPaths.includes(pathname) || isDetailPage;

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('access_token'));
  }, []);

  if (isLoggedIn === null) return null; // 초기 상태일 때 아무것도 렌더링하지 않음

  if (!shouldGndDesk) return null;

  const renderedDeskMenu = GNB_MENU.map((menu) => {
    const isActive = pathname === menu.path;

    return (
      <li key={menu.name} className="cursor-pointer">
        <Link href={menu.path}>
          <span
            className={clsx(
              'text-body-2-normal px-4 py-2 transition-colors',
              isActive ? 'text-[#42424A] font-semibold' : 'text-[#B8B9C1]',
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

  const handleLogout = () => {
    confirmSignout(signOut);
  };

  return (
    <header className="hidden 2xl:flex w-full h-20 justify-center items-center">
      <section className="flex justify-between items-center w-[1440px]">
        {/* Menu */}
        <div className="flex items-center">
          <Image
            src="svgs/img_logo-text.svg"
            alt="img-logo-text"
            width={120}
            height={16}
            priority
          />
          <HeaderAnimation />
          {/* GNB 메뉴 가져오기 */}
          <ul className="flex flex-x-2.5 ml-8">{renderedDeskMenu}</ul>
        </div>
        {/* Icon */}
        <div className="cursor-pointer flex space-x-4 items-center">
          <div className="flex items-center space-x-2" onClick={handlePlusClick}>
            <PlusIcon className="fill-orange200" />
            <span className="text-body-2-normal font-semibold text-gray300 hover:text-[#42424A]">
              모임 만들기
            </span>
          </div>
          {isLoggedIn && (
            <div className="flex items-center space-x-2" onClick={handleLogout}>
              <div className="rounded-full bg-orange200 w-6 h-6 flex items-center justify-center">
                <PiSignOutBold className="text-background200" />
              </div>
              <label className="text-body-2-normal font-semibold text-gray300 hover:text-[#42424A]">
                로그아웃
              </label>
            </div>
          )}
        </div>
      </section>
    </header>
  );
}
