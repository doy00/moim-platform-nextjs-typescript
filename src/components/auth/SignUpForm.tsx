'use client';

import { useSignUpMutation } from '@/hooks/auth.hook';
import { TAuthInputs } from '@/types/auth.type';
import { useDebounce } from '@/utils/auth.util';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';

export default function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<TAuthInputs>({
    mode: 'onBlur',
  });
  const {
    mutateAsync: signUp,
    isPending: isSignUpPending,
    error: signUpError,
    reset,
  } = useSignUpMutation();

  const onSubmit = async (data: TAuthInputs) => {
    if (signUpError && signUpError.message === '이미 사용 중인 이메일입니다') return;
    delete data.passwordConfirm;
    const response = await signUp(data);
    if (response.message === '사용자 생성 성공') router.push('/');
  };

  const password = watch('password');

  const debouncedValidation = useDebounce((name: keyof TAuthInputs) => {
    trigger(name);
  }, 1000);

  useEffect(() => {
    if (signUpError) console.error(signUpError);
  }, [signUpError]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-fit flex flex-col items-center justify-center gap-10"
    >
      {isSignUpPending && <div>로딩 중...</div>}
      <div className="w-[90%] flex flex-col items-center justify-center gap-10">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="이름을 입력해주세요"
              name="name"
              register={register('name', {
                required: '이름을 입력해주세요',
                onChange: (e) => {
                  if (signUpError) reset();
                  setValue('name', e.target.value);
                  debouncedValidation('name');
                },
              })}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
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
                  if (signUpError) reset();
                  setValue('email', e.target.value);
                  debouncedValidation('email');
                },
              })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            {signUpError && <p className="text-red-500">{signUpError.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="회사명을 입력해주세요"
              name="companyName"
              register={register('companyName', {
                required: '회사명을 입력해주세요',
                onChange: (e) => {
                  if (signUpError) reset();
                  setValue('companyName', e.target.value);
                  debouncedValidation('companyName');
                },
              })}
            />
            {errors.companyName && <p className="text-red-500">{errors.companyName.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              name="password"
              register={register('password', {
                required: '비밀번호를 입력해주세요',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: '비밀번호는 8자 이상으로 숫자 특수문자 포함해주세요',
                },
                onChange: (e) => {
                  if (signUpError) reset();
                  setValue('password', e.target.value);
                  debouncedValidation('password');
                },
              })}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <Input
              type="password"
              placeholder="비밀번호를 다시 한번 입력해주세요"
              name="passwordConfirm"
              register={register('passwordConfirm', {
                required: '비밀번호를 다시 한번 입력해주세요',
                validate: (value) => {
                  if (value === password) return true;
                  return '비밀번호가 일치하지 않습니다.';
                },
                onChange: (e) => {
                  if (signUpError) reset();
                  setValue('passwordConfirm', e.target.value);
                  debouncedValidation('passwordConfirm');
                },
              })}
            />
            {errors.passwordConfirm && (
              <p className="text-red-500">{errors.passwordConfirm.message}</p>
            )}
          </div>
        </div>
      </div>

      <button className="bg-gray800 text-white rounded-lg px-4 py-2" type="submit">
        회원가입
      </button>
    </form>
  );
}
