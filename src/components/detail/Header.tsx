'use client';
import Link from 'next/link';
import { DothemeetLogo } from './icons/Dothemeet';
import { HeaderAnimation } from '@/components/mypage/LoadingAnimation';

export const Header = () => {
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <Link href="/" className="h-14 py-[10px] flex items-center">
          <DothemeetLogo />
        </Link>
        <HeaderAnimation />
      </div>
    </div>
  );
};