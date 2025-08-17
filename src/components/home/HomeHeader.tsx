'use client';
// React && NEXT
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// Coponents
import PlusIcon from './icons/PlusIcon';
import { testAccount } from '@/data/mockData';

export default function HomeHeader() {
  const router = useRouter();
  const [showTestInfo, setShowTestInfo] = useState(true);

  const handlePlusClick = () => {
    router.push('/make');
  };

  const handleLoginClick = () => {
    router.push('/auth/signin?type=email');
  };

  return (
    <>
      {/* 테스트 계정 안내 배너 */}
      {showTestInfo && (
        <div className="bg-orange50 border-b border-orange100 px-5 py-3 text-center relative">
          <div className="text-orange800 text-caption-normal">
            <p>
              <strong>체험용 계정:</strong> {testAccount.email} / {testAccount.password}
              <button 
                onClick={handleLoginClick}
                className="ml-2 text-orange600 underline hover:text-orange700"
              >
                로그인하기
              </button>
            </p>
          </div>
          <button 
            onClick={() => setShowTestInfo(false)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange600 hover:text-orange700 text-lg"
          >
            ×
          </button>
        </div>
      )}
      
      <header className="px-5 py-4 h-14 flex justify-between items-center 2xl:hidden">
        <div>
          <Image src="/svgs/img_logo-text.svg" alt="img-logo-text" width={120} height={16} priority />
        </div>
        <div className="flex items-center gap-x-3">
          <div className="cursor-pointer" onClick={handlePlusClick}>
            <PlusIcon className="fill-orange200" />
          </div>
        </div>
      </header>
    </>
  );
}
