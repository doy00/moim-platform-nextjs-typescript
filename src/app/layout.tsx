import '../styles/globals.css';
import QueryProvider from '@/libs/detail/QueryProvider';
import localFont from 'next/font/local';
import HomeGnb from '@/components/home/HomeGnb';

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
      <body className={`bg-gray-200 font-pretendard antialiased ${pretendard.variable}`}>
        <QueryProvider>
          <div className="layout">{children}</div>
          {/* GNB는 HomeGnb 컴포넌트에서 관리 */}
          <HomeGnb />
        </QueryProvider>
      </body>
    </html>
  );
}
