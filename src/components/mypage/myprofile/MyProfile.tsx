'use client';

import Image from 'next/image';
import { useUserQuery } from '@/hooks/mypage/queries/useUserQuery';
import { userPositionTag } from '@/utils/mypage/statusTags';

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
  const position = userPositionTag(data);

  // console.log(position);

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
        <div>
          <div className="flex gap-2 justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex gap-1.5">
                <span className="text-lg font-semibold">{data?.nickname}</span>
                {position && (
                  <span className="rounded-[20px] px-2 py-1 bg-gray200 text-gray600 font-medium text-caption-normal">
                    {position}
                  </span>
                )}
              </div>
              <span className="text-[13px] font-normal text-[#9E9892]">{data?.introduction}</span>
            </div>
            <Image
              src={data?.image ?? '/images/mypage/profile-default.svg'}
              alt="profile"
              width={64}
              height={64}
              className="rounded-full w-16 h-16"
            />
          </div>
          <div className="flex gap-1">
            {data?.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-[6px] bg-gray50 px-1.5 py-[3px] text-caption-normal font-medium text-gray400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </ProfileWrapper>
  );
}
