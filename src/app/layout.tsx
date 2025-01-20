import type { Metadata } from 'next';
import localFont from 'next/font/local';
import QueryProvider from '@/libs/detail/QueryProvider';
import '../styles/globals.css';
import HomeGnb from '@/components/home/HomeGnb';
import QueryProvider from '@/libs/home/QueryProvider';
import { usePathname } from 'next/navigation';

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
  return (
    <html lang="ko">
      <QueryProvider>
        <body
          className={`layout font-pretendard antialiased ${pretendard.variable} min-h-screen
          w-full mx-auto
          px-4 
          sm:px-6 sm:max-w-screen-sm
          md:px-8 md:max-w-screen-md
          lg:px-12 lg:max-w-screen-lg
          xl:px-16 xl:max-w-screen-xl
          `}
        >
          {children}
        </body>
      </QueryProvider>
    </html>
  );
}
