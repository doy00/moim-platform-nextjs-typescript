'use client';

import { useSignInMutation } from '@/hooks/auth.hook';
import { TAuthInputs } from '@/types/auth.type';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthInputs>();
  const { mutate: signIn, isPending: isSignInPending, error: signInError } = useSignInMutation();

  const onSubmit = (data: TAuthInputs) => {
    signIn(data);
  };

  useEffect(() => {
    if (signInError) {
      console.error(signInError);
    }
  }, [signInError]);

  // TODO: 로딩 상태 표시
  if (isSignInPending) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 pb-6">
        <h1 className="text-title-1 font-bold">회원가입</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-fit flex flex-col items-center justify-center gap-10"
      >
        <div className="w-[90%] flex flex-col items-center justify-center gap-10">
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                placeholder="이메일을 입력해주세요"
                name="email"
                register={register('email', { required: '이메일을 입력해주세요' })}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
                })}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
          </div>
        </div>

        <button className="bg-gray800 text-white rounded-lg px-4 py-2" type="submit">
          회원가입
        </button>
      </form>
    </>
  );
}
