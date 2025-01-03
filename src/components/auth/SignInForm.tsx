'use client';

import { useSignInMutation } from '@/hooks/auth.hook';
import { TAuthInputs } from '@/types/auth.type';
import { useDebounce } from '@/utils/auth.util';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';

export default function SignInForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<TAuthInputs>({
    mode: 'onBlur',
  });
  const {
    mutateAsync: signIn,
    isPending: isSignInPending,
    error: signInError,
    reset,
  } = useSignInMutation();

  const debouncedValidation = useDebounce((name: keyof TAuthInputs) => {
    trigger(name);
  }, 1000);

  const onSubmit = async (data: TAuthInputs) => {
    const response = await signIn(data);
    if (response.token) router.push('/');
  };

  useEffect(() => {
    if (signInError) console.error(signInError);
  }, [signInError]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-fit flex flex-col items-center justify-center gap-10"
    >
      {isSignInPending && <div>로딩 중...</div>}
      <div className="w-[90%] flex flex-col items-center justify-center gap-10">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="이메일을 입력해주세요"
              name="email"
              register={register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
                onChange: (e) => {
                  if (signInError) reset();
                  setValue('email', e.target.value);
                  debouncedValidation('email');
                },
              })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            {signInError && signInError.code === 'USER_NOT_FOUND' && (
              <p className="text-red-500">{signInError.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              name="password"
              register={register('password', {
                required: '비밀번호를 입력해주세요',
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자 이상이어야 합니다.',
                },
                onChange: (e) => {
                  if (signInError) reset();
                  setValue('password', e.target.value);
                  debouncedValidation('password');
                },
              })}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            {signInError && signInError.code === 'INVALID_CREDENTIALS' && (
              <p className="text-red-500">{signInError.message}</p>
            )}
          </div>
        </div>
      </div>

      <button className="bg-gray800 text-white rounded-lg px-4 py-2" type="submit">
        로그인
      </button>
    </form>
  );
}
