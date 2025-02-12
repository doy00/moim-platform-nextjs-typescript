'use client';

import Link from 'next/link';

import { GNB_MENU } from '@/constants/home/gnb-menu';
import { useAuth } from '@/hooks/auth/auth.hook';
import clsx from 'clsx';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { PiSignOutBold } from 'react-icons/pi';
import { confirmSignout } from '../make/MakeSoner';
import { HeaderAnimation } from '../mypage/LoadingAnimation';
import PlusIcon from './icons/PlusIcon';

export default function HomeHeaderDesk() {
  const router = useRouter();
  const pathname = usePathname();
  // 여러가지로 해봐도 잘 안되서 추가 및 주석처리 했습니다(오은)
  const { me, signOut } = useAuth();

  // const { isLoggedIn, setIsLoggedIn } = useHomeAuthStore();

  const showGnbDeskPaths = ['/', , `/detail/`, '/mylike', '/mypage'];
  const isDetailPage = pathname.startsWith('/detail/');

  const shouldGndDesk = showGnbDeskPaths.includes(pathname) || isDetailPage;

  // useEffect(() => {
  //   setIsLoggedIn(!!localStorage.getItem('access_token'));
  // }, []);

  // useEffect(() => {
  //   const updateAuthState = () => {
  //     setIsLoggedIn(!!localStorage.getItem('access_token'));
  //   };

  //   updateAuthState();

  //   window.addEventListener('storage', updateAuthState);
  //   return () => {
  //     window.removeEventListener('storage', updateAuthState);
  //   };
  // }, [setIsLoggedIn]);

  // if (isLoggedIn === null) return null; // 초기 상태일 때 아무것도 렌더링하지 않음

  if (!shouldGndDesk) return null;

  const renderedDeskMenu = GNB_MENU.map((menu) => {
    const isActive = pathname === menu.path;

    // 여러가지로 해봐도 잘 안되서 추가했습니다(오은)
    let path = menu.path;
    if (menu.path === '/mypage' && !me) path = '/auth/signin';
    if (menu.path === '/mylike' && !me) path = '/auth/signin';

    return (
      <li key={menu.name} className="cursor-pointer">
        <Link href={path}>
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
    confirmSignout(() => {
      signOut();
      // setIsLoggedIn(false);
    });
  };

  return (
    <header className="hidden 2xl:flex w-full h-20 justify-center items-center">
      <section className="flex justify-between items-center w-[1440px]">
        {/* Menu */}
        <div className="flex items-center">
          <Image
            src="/svgs/img_logo-text.svg"
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
          {me && (
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
