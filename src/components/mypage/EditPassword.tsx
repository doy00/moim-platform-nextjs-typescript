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
  register,
  showPassword,
  onTogglePassword,
  validation,
}: {
  id: string;
  label: string;
  placeholder: string;
  register: any;
  showPassword: boolean;
  onTogglePassword: () => void;
  validation?: object;
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
        {...register(id, validation)}
        placeholder={placeholder}
        className="bg-background400 w-full placeholder:text-gray300 outline-none"
      />
      <Image
        src={showPassword ? openEye : closeEye}
        alt="password visibility"
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={onTogglePassword}
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const editData: IUserEdit = {};

    if (!editData.email || !editData.nickname || !editData.position) {
      console.error('필수 필드가 누락');
      return;
    }

    passwordEdit(editData);
  };

  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //     watch,
  //   } = useForm({
  //     mode: 'onChange',
  //   });

  // 비밀번호 표시,숨김
  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    if (field === 'current') {
      setPasswordVisibility((prev) => ({ ...prev, current: !prev.current }));
    } else if (field === 'new') {
      setPasswordVisibility((prev) => ({ ...prev, new: !prev.new }));
    } else if (field === 'confirm') {
      setPasswordVisibility((prev) => ({ ...prev, confirm: !prev.confirm }));
    }
  };

  // 비밀번호 유효성 검사 규칙
  const passwordValidation = {
    newPassword: {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    },
    confirmPassword: {
      required: true,
      validate: (value: string) =>
        value === watch('newPassword') || '비밀번호가 일치하지 않습니다.',
    },
  };

  // 폼 제출 처리
  const onSubmit = async (data: any) => {
    try {
      // 먼저 이메일 발송 요청
      const emailResponse = await fetch('/api/auth/send-recovery-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error('이메일 발송에 실패했습니다.');
      }

      // 비밀번호 변경 요청
      const response = await fetch('/api/auth/recover-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: data.newPassword,
        }),
      });

      if (response.ok) {
        alert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.');
        window.location.href = '/auth/signin'; // 로그인 페이지로 리다이렉트
      } else {
        throw new Error('비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : '오류가 발생했습니다.');
    }
  };

  return (
    <div className="h-auto flex flex-col gap-6 mx-auto max-w-[584px] md:bg-background300 md:rounded-[32px] md:px-11 md:py-10 md:my-14 lg:my-10">
      <p className="text-title-1 font-semibold text-gray-800">비밀번호 변경</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <PasswordInput
          id="currentPassword"
          label="현재 비밀번호"
          placeholder="현재 비밀번호를 입력해주세요"
          register={register}
          showPassword={passwordVisibility.current}
          onTogglePassword={() => togglePasswordVisibility('current')}
          validation={{ required: true }}
        />

        <PasswordInput
          id="newPassword"
          label="새 비밀번호"
          placeholder="8자 이상의 영문, 숫자 조합"
          register={register}
          showPassword={passwordVisibility.new}
          onTogglePassword={() => togglePasswordVisibility('new')}
          validation={passwordValidation.newPassword}
        />

        <PasswordInput
          id="confirmPassword"
          label="새 비밀번호 확인"
          placeholder="새 비밀번호를 다시 입력해주세요"
          register={register}
          showPassword={passwordVisibility.confirm}
          onTogglePassword={() => togglePasswordVisibility('confirm')}
          validation={passwordValidation.confirmPassword}
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
