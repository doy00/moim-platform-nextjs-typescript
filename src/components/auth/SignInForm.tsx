'use client';

import { useDebounce, useSignInMutation } from '@/hooks/auth/auth.hook';
import { TAuthInputs } from '@/types/auth/auth.type';
import { cn } from '@/utils/auth/ui.util';
import { useRouter } from 'next/navigation';
import { useEffect, useId } from 'react';
import { useForm } from 'react-hook-form';
import AuthButton from './AuthButton';
import AuthInput from './AuthInput';
import AuthQuestions from './AuthQuestions';
import DothemeetLogo from './DothemeetLogo';

export default function SignInForm() {
  const router = useRouter();
  const emailId = useId();
  const passwordId = useId();
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getFieldState,
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

  const { isDirty: isEmailDirty, invalid: isEmailInvalid } = getFieldState('email');
  const { isDirty: isPasswordDirty, invalid: isPasswordInvalid } = getFieldState('password');

  const isDisabled =
    isSignInPending ||
    !!errors.password ||
    !!errors.email ||
    !!signInError ||
    !isEmailDirty ||
    isEmailInvalid ||
    !isPasswordDirty ||
    isPasswordInvalid;

  useEffect(() => {
    if (signInError) console.error(signInError);
  }, [signInError]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background200 md:bg-background100">
      {/** 로딩 수정요망 */}
      {isSignInPending && <div>로딩 중...</div>}

      <div className="w-[343px] md:w-[664px] 2xl:w-[1536px] h-dvh flex flex-col items-center justify-center md:justify-start pb-5 md:pb-0">
        <div className="w-full h-14 flex items-center">
          <DothemeetLogo />
        </div>
        <div className="w-full h-full flex flex-col items-center justify-start md:justify-center ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-[664px] h-full md:h-[550px] flex flex-col items-center justify-start md:justify-center md:bg-background200 md:rounded-[32px]"
          >
            <div className="w-full md:w-[584px] h-full flex flex-col items-center justify-center md:py-14">
              <div className="flex-1 w-full flex flex-col items-center justify-center md:justify-start gap-6">
                <h3 className="text-title-1 text-left w-full font-semibold">로그인</h3>
                <div className="w-full flex flex-col items-center justify-center gap-10">
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor={emailId} className="text-body-2-normal font-semibold">
                        이메일 <span className="text-red200">*</span>
                      </label>
                      <AuthInput
                        type="text"
                        placeholder="example@google.com"
                        className={cn(
                          'h-[54px]',
                          (errors.email || signInError?.code === 'USER_NOT_FOUND') &&
                            'focus-visible:ring-error',
                        )}
                        name="email"
                        id={emailId}
                        register={register('email', {
                          required: '이메일을 입력해주세요',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: '올바른 이메일 형식을 입력해 주세요',
                          },
                          onChange: (e) => {
                            if (signInError) reset();
                            setValue('email', e.target.value);
                            debouncedValidation('email');
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="text-error text-label-normal font-medium">
                          {errors.email.message}
                        </p>
                      )}
                      {signInError && signInError.code === 'USER_NOT_FOUND' && (
                        <p className="text-error text-label-normal font-medium">
                          등록되지 않은 계정이에요
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor={passwordId} className="text-body-2-normal font-semibold">
                        비밀번호 <span className="text-red200">*</span>
                      </label>
                      <AuthInput
                        type="password"
                        placeholder="******"
                        className={cn(
                          'h-[54px]',
                          (errors.password || signInError?.code === 'INVALID_CREDENTIALS') &&
                            'focus-visible:ring-error',
                        )}
                        name="password"
                        id={passwordId}
                        register={register('password', {
                          required: '비밀번호를 입력해주세요',
                          minLength: {
                            value: 7,
                            message: '비밀번호를 확인해주세요',
                          },
                          onChange: (e) => {
                            if (signInError) reset();
                            setValue('password', e.target.value);
                            debouncedValidation('password');
                          },
                        })}
                      />
                      {errors.password && (
                        <p className="text-error text-label-normal font-medium">
                          {errors.password.message}
                        </p>
                      )}
                      {signInError && signInError.code === 'INVALID_CREDENTIALS' && (
                        <p className="text-error text-label-normal font-medium">
                          {signInError.message}
                        </p>
                      )}
                      {!errors.password && !signInError && (
                        <p className="text-gray300 text-label-normal font-medium">
                          특수문자 포함 8~20자 사이로 입력해주세요
                        </p>
                      )}
                    </div>
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
        </div>
      </div>
    </div>
  );
}
