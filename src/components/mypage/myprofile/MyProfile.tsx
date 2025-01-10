'use client';

import Image from 'next/image';
import defaultProfile from '../../../../public/images/mypage/profile-default.svg';
import { useUserQuery } from '@/hooks/mypage/queries/useUserQuery';

export default function MyProfile() {
  const { data: userInfo } = useUserQuery();

  return (
    <div className="px-3">
      <div className="flex flex-col bg-background400 rounded-[20px] px-5 py-4 gap-2.5">
        {userInfo && (
          <div className="flex gap-2 justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold">{userInfo?.name}</span>
              <span className="text-[13px] font-normal text-[#9E9892]">
                {userInfo?.companyName}
              </span>
              {/* 카테고리 칩 구간 */}
            </div>
            <Image src={userInfo?.image ?? defaultProfile} alt="profile" width={64} height={64} />
          </div>
        )}
      </div>
    </div>
  );
}
