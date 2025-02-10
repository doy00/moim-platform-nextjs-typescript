'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import closeEye from '@public/images/mypage/visibility_off.svg';
import openEye from '@public/images/mypage/visibility_on.svg';
import Image from 'next/image';
import Link from 'next/link';

const PasswordInput = ({
  id,
  label,
  placeholder,
  showPassword,
}: {
  id: string;
  label: string;
  placeholder: string;
  showPassword: boolean;
}) => (
  <div className="flex flex-col gap-3">
    <label htmlFor={id} className="flex justify-start items-center gap-[2px] px-2">
      <span className="text-body-2-nomal font-medium text-gray-800">{label}</span>
      <span className="text-body-2-nomal font-medium text-error pt-1">*</span>
    </label>
    <div className="relative rounded-xl bg-background400 px-4 py-[18px]">
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        placeholder={placeholder}
        className="bg-background400 w-full placeholder:text-gray300 outline-none"
      />
      <Image
        src={showPassword ? openEye : closeEye}
        alt="password visibility"
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
      />
    </div>
    <span className="text-label-normal font-medium text-gray300 px-2">
      특수문자 포함 8~20자 사이로 입력해주세요
    </span>
  </div>
);

export default function EditPassword() {
  // 상태 관리
  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  return (
    <div className="h-auto flex flex-col gap-6 mx-auto max-w-[584px] md:bg-background300 md:rounded-[32px] md:px-11 md:py-10 md:my-14 lg:my-10">
      <p className="text-title-1 font-semibold text-gray-800">비밀번호 변경</p>
      <form className="flex flex-col gap-6">
        <PasswordInput
          id="currentPassword"
          label="현재 비밀번호"
          placeholder="현재 비밀번호를 입력해주세요"
          showPassword={passwordVisibility.current}
        />

        <PasswordInput
          id="newPassword"
          label="새 비밀번호"
          placeholder="8자 이상의 영문, 숫자 조합"
          showPassword={passwordVisibility.new}
        />

        <PasswordInput
          id="confirmPassword"
          label="새 비밀번호 확인"
          placeholder="새 비밀번호를 다시 입력해주세요"
          showPassword={passwordVisibility.confirm}
        />

        <div className="flex flex-col items-center justify-center gap-4 w-full mt-[98px]">
          <Link
            href="/mypage/editUser"
            className="text-label-normal font-semibold text-gray-600 underline"
          >
            다음에 변경하기
          </Link>
          <button
            type="submit"
            className="bg-gray950 text-gray600 font-semibold text-body-1-nomal rounded-2xl py-[17px] w-full"
          >
            비밀번호 변경
          </button>
        </div>
      </form>
    </div>
  );
}
