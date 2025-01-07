'use client';

import Meetings from '@/components/mypage/meetings/Meetings';
import CreatedMeetings from '@/components/mypage/created-meetings/CreatedMeetings';
import { getUserInfo } from '@/apis/getUserInfo';
import { IUser } from '@/types/user';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultProfile from '../../../public/images/dude.png';

export default function Mypage() {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [activeTab, setActiveTab] = useState('meetings');

  useEffect(() => {
    // setUserInfo(MOCK_USER);
    const fetchInfo = async () => {
      const token = localStorage.getItem('dudemeet-token');
      console.log('저장된 토큰:', token);

      const data = await getUserInfo();
      setUserInfo(data);
    };
    fetchInfo();
  }, []);

  const renderTab = () => {
    if (activeTab === 'meetings') {
      return <Meetings />;
    } else if (activeTab === 'reviews') {
      return <div>나의 리뷰</div>;
    } else if (activeTab === 'created-meetings') {
      return <CreatedMeetings />;
    }
  };

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
          {userInfo && (
            <div className="flex gap-4">
              <Image
                src={userInfo?.image ?? defaultProfile}
                alt="profile"
                width={100}
                height={100}
              />
              <div className="flex flex-col gap-2">
                <span>{userInfo?.name}</span>
                <span>{userInfo?.companyName}</span>
                <span>{userInfo?.email}</span>
              </div>
            </div>
          )}
        </div>
        <div>
          <button
            className={`py-2 px-4 ${
              activeTab === 'meetings' ? 'border-b-2 border-black font-bold' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('meetings')}
          >
            나의 모임
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === 'reviews' ? 'border-b-2 border-black font-bold' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            나의 리뷰
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === 'created-meetings'
                ? 'border-b-2 border-black font-bold'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('created-meetings')}
          >
            내가 만든 모임
          </button>
        </div>
        {renderTab()}
      </div>
    </div>
  );
}
