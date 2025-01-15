'use client';

import HomeGnb from '@/components/home/HomeGnb';
import QueryProvider from '@/libs/detail/QueryProvider';
import localFont from 'next/font/local';
import { usePathname } from 'next/navigation';
import '../styles/globals.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  weight: '45 920',
  style: 'normal',
  display: 'swap',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // HomeGnb를 보여줄 경로 목록
  const pathname = usePathname();
  const showGnbPaths = ['/home', '/favorites', '/mypage'];
  const showGnb = showGnbPaths.includes(pathname);

  return (
    <html lang="ko">
      <body className={`bg-background100 font-pretendard antialiased ${pretendard.variable}`}>
        <QueryProvider>
          <div className="layout">{children}</div>
          {showGnb && <HomeGnb />}
        </QueryProvider>
      </body>
    </html>
  );
}
