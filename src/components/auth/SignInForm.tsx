'use client';

import { TAuthInputs } from '@/types/auth.type';
import { useForm } from 'react-hook-form';
import Input from './Input';

export default function SignInForm() {
  const { register, handleSubmit } = useForm<TAuthInputs>();

  const onSubmit = (data: TAuthInputs) => {
    console.log(data);
  };
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
            <Input
              type="text"
              placeholder="이메일을 입력해주세요"
              name="email"
              register={register}
            />
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              name="password"
              register={register}
            />
          </div>
        </div>

        <button className="bg-gray800 text-white rounded-lg px-4 py-2" type="submit">
          회원가입
        </button>
      </form>
    </>
  );
}
