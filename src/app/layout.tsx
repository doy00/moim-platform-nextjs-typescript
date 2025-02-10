import HomeGnb from '@/components/home/HomeGnb';
import { defaultMetadata } from '@/constants/meta/defaultMetadata';
import QueryProvider from '@/libs/detail/QueryProvider';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import '../styles/globals.css';
import { Toaster } from 'sonner';
import HomeHeaderDesk from '@/components/home/HomeHeaderDesk';

export const metadata: Metadata = defaultMetadata;

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
      <head>
        <script
          src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          async
        ></script>
      </head>
      <body className={`bg-background200 font-pretendard antialiased ${pretendard.variable}`}>
        <QueryProvider>
          <HomeHeaderDesk />
          <div className="layout">{children}</div>
          {/* GNB는 HomeGnb 컴포넌트에서 관리 */}
          <HomeGnb />
        </QueryProvider>
        <Toaster position='top-right'/>
      </body>
    </html>
  );
}

{
  /* <body
  className={`layout font-pretendard antialiased ${pretendard.variable} min-h-screen
  w-full mx-auto
  px-4 
  sm:px-6 sm:max-w-screen-sm
  md:px-8 md:max-w-screen-md
  lg:px-12 lg:max-w-screen-lg
  xl:px-16 xl:max-w-screen-xl
  `}
>  */
}
