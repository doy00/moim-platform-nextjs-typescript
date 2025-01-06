'use client';

import Meetings from '@/components/mypage/meetings/Meetings';
import CreatedMeetings from '@/components/mypage/created-meetings/CreatedMeetings';
// import { getUserInfo } from '@/apis/getUserInfo';
import { IUser } from '@/types/user';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultProfile from '../../../public/images/dude.png';

const MOCK_USER: IUser = {
  teamId: '6-5',
  id: 1006,
  email: 'test@email.com',
  name: '테스트입니다.',
  companyName: '테스트용',
  image: null,
  createdAt: new Date('2025-01-02T04:37:49.547Z'),
  updatedAt: new Date('2025-01-02T04:37:49.547Z'),
};

export default function Mypage() {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  useEffect(() => {
    setUserInfo(MOCK_USER);
    // const fetchInfo = async () => {
    //   const data = await getUserInfo();
    //   setUserInfo(data);
    // };
    // fetchInfo();
  }, []);

  return (
    <div className="h-screen max-w-[1200px] mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold ">마이페이지</h1>
        {/* 내 프로필 구간 */}
        <div className="flex flex-col border-2 border-gray-300 rounded-md p-4 gap-4">
          <div className="flex items-center justify-between ">
            <h2 className="text-xl font-bold">내 정보</h2>
            <button className="rounded-full bg-gray-400">프로필 수정</button>
          </div>
          <hr />
          <div className="flex gap-4">
            <div>
              <Image
                src={userInfo?.image ?? defaultProfile}
                alt="profile"
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span>{userInfo?.name}</span>
              <span>{userInfo?.companyName}</span>
              <span>{userInfo?.email}</span>
            </div>
          </div>
        </div>
        <Meetings />
        <CreatedMeetings />
      </div>
    </div>
  );
}
