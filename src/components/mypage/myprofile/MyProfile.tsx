'use client';

import Image from 'next/image';
import defaultProfile from '../../../../public/images/mypage/profile-default.svg';
import { useUserQuery } from '@/hooks/mypage/queries/useUserQuery';

// 공통 래퍼 컴포넌트
const ProfileWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="px-3">
    <div className="flex flex-col bg-background400 rounded-[20px] px-5 py-4 gap-2.5">
      {children}
    </div>
  </div>
);

export default function MyProfile() {
  const { data, isLoading } = useUserQuery();

  if (isLoading) {
    return (
      <ProfileWrapper>
        <div className="animate-pulse flex gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <div className="h-6 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
        </div>
      </ProfileWrapper>
    );
  }

  return (
    <ProfileWrapper>
      {data && (
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold">{data?.name}</span>
            <span className="text-[13px] font-normal text-[#9E9892]">{data?.companyName}</span>
          </div>
          <Image src={data?.image ?? defaultProfile} alt="profile" width={64} height={64} />
        </div>
      )}
    </ProfileWrapper>
  );
}
