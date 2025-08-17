'use client';

import { useAuth, useSignInMutation } from '@/hooks/auth/auth.hook';
import { signInSchema, type TSignInSchema } from '@/schemas/auth/auth.schema';
import { testAccount } from '@/data/mockData';
import { cn } from '@/utils/auth/ui.util';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AuthButton from './AuthButton';
import AuthLabelWithInput from './AuthLabelWithInput';
import AuthLoading from './AuthLoading';
import AuthLogos from './AuthLogos';
import AuthQuestions from './AuthQuestions';

//Jake

export default function SignInForm() {
  const router = useRouter();
  const methods = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });
  const {
    mutate: signIn,
    isPending: isSignInPending,
    error: signInError,
    reset: signInReset,
  } = useSignInMutation();
  const { me, isMeLoading } = useAuth();

  const onSubmit = async (data: TSignInSchema) => {
    if (signInError) return;
    const signInData = {
      email: data.email,
      password: data.password,
    };
    signIn(signInData);
  };

  // 테스트 계정으로 자동 로그인
  const handleTestLogin = () => {
    methods.setValue('email', testAccount.email);
    methods.setValue('password', testAccount.password);
    signIn({
      email: testAccount.email,
      password: testAccount.password,
    });
  };

  const isDisabled =
    isSignInPending ||
    !!signInError ||
    !!methods.formState.errors.password ||
    !!methods.formState.errors.email ||
    !methods.formState.isValid;

  useEffect(() => {
    if (!signInError) return;
    if (signInError.message === '비밀번호를 확인해주세요') {
      methods.setError('password', { type: 'manual', message: signInError.message });
      methods.setFocus('password');
      return;
    }
    methods.setError('email', { type: 'manual', message: signInError.message });
    methods.setFocus('email');
  }, [signInError, methods]);

  useEffect(() => {
    if (!me) return;
    router.push('/');
  }, [me, router]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background200 md:bg-background100">
      {(isSignInPending || isMeLoading) && <AuthLoading />}

      <div className="w-[343px] md:w-[664px] 2xl:w-[1536px] h-dvh flex flex-col items-center justify-center md:justify-start pb-5 md:pb-0">
        <div className="w-full h-14 flex items-center">
          <AuthLogos />
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
                        mutationReset={signInReset}
                      />

                      <AuthLabelWithInput
                        name="password"
                        label="비밀번호"
                        placeholder="******"
                        isPassword
                        mutationReset={signInReset}
                        additionalMessage={
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
                  
                  {/* 테스트 계정 자동 로그인 버튼 */}
                  <AuthButton
                    className="bg-gray100 text-gray700 rounded-2xl h-[56px] text-body-1-normal font-semibold border border-gray300 hover:bg-gray200 transition-colors"
                    type="button"
                    onClick={handleTestLogin}
                    disabled={isSignInPending}
                  >
                    테스트 계정으로 체험하기
                  </AuthButton>
                  
                  <div className="w-full text-center text-gray400 text-caption-normal">
                    <p>테스트 계정: {testAccount.email}</p>
                    <p>비밀번호: {testAccount.password}</p>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
