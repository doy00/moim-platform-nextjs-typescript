'use client';

import { useSignUpMutation } from '@/hooks/auth.hook';
import { TAuthInputs } from '@/types/auth.type';
import { useDebounce } from '@/utils/auth.util';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';

export default function SignUpForm() {
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
  const { mutate: signUp, isPending: isSignUpPending, error: signUpError } = useSignUpMutation();

  const onSubmit = (data: TAuthInputs) => {
    signUp(data);
  };

  const password = watch('password');

  const debouncedValidation = useDebounce((name: keyof TAuthInputs) => {
    trigger(name);
  }, 1000);

  useEffect(() => {
    if (signUpError) {
      console.error(signUpError);
    }
  }, [signUpError]);

  // TODO: 로딩 상태 표시
  if (isSignUpPending) {
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
                placeholder="이름을 입력해주세요"
                name="name"
                register={register('name', {
                  required: '이름을 입력해주세요',
                  onChange: (e) => {
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
                  onChange: (e) => {
                    setValue('email', e.target.value);
                    debouncedValidation('email');
                  },
                })}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                placeholder="회사명을 입력해주세요"
                name="companyName"
                register={register('companyName', {
                  required: '회사명을 입력해주세요',
                  onChange: (e) => {
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
                  onChange: (e) => {
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
                    console.log('onChange triggered, value:', e.target.value);
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
    </>
  );
}
