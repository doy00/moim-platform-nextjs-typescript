'use client';

import Image from 'next/image';
import defaultProfile from '@images/mypage/profile-edit-default.svg';
import Header from '@/components/mypage/header/Header';
import Link from 'next/link';
import { useUserQuery } from '@/hooks/mypage/queries/useUserQuery';

export default function EditUser() {
  const { data, isLoading } = useUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen max-w-[1200px] flex flex-col gap-4">
      <Header />
      <div className="py-10 px-4">
        <div className="flex flex-col items-center gap-6">
          <Image src={data?.image ?? defaultProfile} alt="profile" width={86} height={86} />
          <Link
            href="/mypage/editPassword"
            className="text-label-normal font-medium text-orange200"
          >
            비밀번호 변경
          </Link>
        </div>

        <form className="flex flex-col gap-6 mt-8">
          <div className="flex flex-col gap-3">
            <label htmlFor="email">이메일 주소</label>
            <input
              type="text"
              id="email"
              placeholder="dothemeet@google.com"
              className="rounded-xl bg-background400 px-4 py-[18px] placeholder:text-gray300"
              value={data?.email}
              disabled
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="nickName">닉네임</label>
            <div className="flex flex-col gap-1.5">
              <input
                type="text"
                id="nickName"
                placeholder="두두두두"
                className="rounded-xl bg-background400 px-4 py-[18px] placeholder:text-gray300"
                value={data?.name}
                disabled
              />
              <span className="text-label-normal font-medium text-gray300">
                최대 8글자까지 입력 가능해요
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="textarea">소개</label>
            <div className="flex flex-col gap-1.5">
              <textarea
                id="textarea"
                placeholder="소개를 입력해주세요"
                className="rounded-xl bg-background400 px-4 py-[18px] placeholder:text-gray300 resize-none"
              />
              <span className="text-label-normal font-medium text-gray300">
                최대 20글자까지 입력 가능해요
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="tag">태그</label>
            <span className="max-w-[76px] rounded-xl bg-background400 px-3 py-2 text-caption-normal font-medium text-gray300">
              # 태그추가
            </span>
            <span className="text-label-normal font-medium text-gray300">
              최대 5글자까지 입력 가능해요
            </span>
          </div>
          <button type="submit" className="bg-gray950 rounded-2xl px-[141px] py-[17px]">
            <span className="text-body-1-normal font-semibold text-gray600">수정완료</span>
          </button>
        </form>
      </div>
    </div>
  );
}
