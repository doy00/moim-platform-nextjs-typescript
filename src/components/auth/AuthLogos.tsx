'use client';

import Link from 'next/link';
import { HeaderAnimation } from '../mypage/LoadingAnimation';
import { DothemeetLogo } from './icons';

function AuthLogos() {
  return (
    <>
      <Link href="/" className="cursor-pointer">
        <DothemeetLogo />
      </Link>
      <HeaderAnimation />
    </>
  );
}

export default AuthLogos;
