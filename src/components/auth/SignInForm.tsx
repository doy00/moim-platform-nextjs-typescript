'use client';

import { useSignInMutation } from '@/hooks/auth/auth.hook';
import { TAuthFormValues } from '@/types/auth/auth.type';
import { cn } from '@/utils/auth/ui.util';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AuthButton from './AuthButton';
import AuthLabelWithInput from './AuthLabelWithInput';
import AuthQuestions from './AuthQuestions';
import DothemeetLogo from './DothemeetLogo';

export default function SignInForm() {
  const router = useRouter();
  const methods = useForm<TAuthFormValues>();
  const {
    mutateAsync: signIn,
    isPending: isSignInPending,
    error: signInError,
    reset: signInReset,
  } = useSignInMutation();

  const onSubmit = async (data: TAuthFormValues) => {
    if (signInError) return;
    const signInData = {
      email: data.email,
      password: data.password,
    };
    const response = await signIn(signInData);
    if (response.data.accessToken) router.push('/');
  };

  const isDisabled =
    isSignInPending ||
    !!signInError ||
    !!methods.formState.errors.password ||
    !!methods.formState.errors.email ||
    !methods.formState.isValid;

  useEffect(() => {
    console.log(signInError);
    if (!signInError) return;
    if (signInError.data === '유저가 존재하지 않습니다.') {
      methods.setError('email', { type: 'manual', message: '등록되지 않은 계정이에요' });
      methods.setFocus('email');
    }
    if (signInError.data === '비밀번호가 일치하지 않습니다.') {
      methods.setError('password', { type: 'manual', message: '비밀번호를 확인해주세요' });
      methods.setFocus('password');
    }
  }, [signInError, methods, signInReset]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background200 md:bg-background100">
      {/** 로딩 수정요망 */}
      {isSignInPending && <div>로딩 중...</div>}

      <div className="w-[343px] md:w-[664px] 2xl:w-[1536px] h-dvh flex flex-col items-center justify-center md:justify-start pb-5 md:pb-0">
        <div className="w-full h-14 flex items-center">
          <Link href="/" className="cursor-pointer">
            <DothemeetLogo />
          </Link>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-start md:justify-center ">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full md:w-[664px] h-full md:h-[550px] flex flex-col items-center justify-start md:justify-center md:bg-background200 md:rounded-[32px]"
            >
              <div className="w-full md:w-[584px] h-full flex flex-col items-center justify-center md:py-14">
                <div className="flex-1 w-full flex flex-col items-center justify-center md:justify-start gap-6">
                  <h3 className="text-title-1 text-left w-full font-semibold">로그인</h3>
                  <div className="w-full flex flex-col items-center justify-center gap-10">
                    <div className="w-full flex flex-col gap-4">
                      <AuthLabelWithInput
                        name="email"
                        label="이메일"
                        placeholder="example@google.com"
                        type="text"
                        mutationReset={signInReset}
                        registerOptions={{
                          required: '이메일을 입력해주세요',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: '올바른 이메일 형식을 입력해 주세요',
                          },
                        }}
                      />

                      <AuthLabelWithInput
                        name="password"
                        label="비밀번호"
                        placeholder="******"
                        type="password"
                        mutationReset={signInReset}
                        registerOptions={{
                          required: '비밀번호를 입력해주세요',
                          minLength: {
                            value: 7,
                            message: '비밀번호를 확인해주세요',
                          },
                        }}
                        additionalErrors={
                          !methods.formState.errors.password &&
                          !signInError && (
                            <p className="text-gray300 text-label-normal font-medium">
                              특수문자 포함 8~20자 사이로 입력해주세요
                            </p>
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-[584px] flex flex-col items-center justify-center gap-4">
                  <AuthQuestions type="signup" />
                  <AuthButton
                    className={cn(
                      'bg-gray950 text-white rounded-2xl h-[56px] text-body-1-normal font-semibold',
                      isDisabled ? 'text-gray600 cursor-not-allowed' : 'text-gray50 bg-orange200',
                    )}
                    disabled={isDisabled}
                    type="submit"
                  >
                    로그인
                  </AuthButton>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
