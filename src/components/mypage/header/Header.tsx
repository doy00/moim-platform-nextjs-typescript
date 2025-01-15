'use client';

import Image from 'next/image';
import logo from '../../../../public/images/mypage/logo.svg';
import edit from '../../../../public/images/mypage/edit.svg';
import close from '../../../../public/images/mypage/close.svg';
import Link from 'next/link';
// import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center px-5 py-4 gap-2.5">
      <Link href="/">
        <Image src={logo} alt="logo" width={120} height={16} />
      </Link>

      {pathname === '/mypage' && (
        <Link href="/mypage/editUser">
          <Image src={edit} alt="edit" width={24} height={24} />
        </Link>
      )}

      {pathname === '/mypage/editUser' && (
        <Link href="/mypage">
          <Image src={close} alt="close" width={24} height={24} />
        </Link>
      )}
    </div>
  );
}
