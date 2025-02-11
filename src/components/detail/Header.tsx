'use client';
import Link from 'next/link';
import { DothemeetLogo } from './icons/Dothemeet';
import { HeaderAnimation } from '@/components/mypage/LoadingAnimation';

export const Header = () => {
  return (
    <div className="flex items-center 2xl:hidden">
      <div className="flex items-center">
        <Link href="/" className="h-14 py-[10px] flex items-center">
          <DothemeetLogo />
          <HeaderAnimation />
        </Link>
      </div>
    </div>
  );
};