'use client';

import { useDebounce, useSignUpMutation } from '@/hooks/auth/auth.hook';
import { TAuthInputs } from '@/types/auth/auth.type';
import { cn } from '@/utils/auth/ui.util';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthButton from './AuthButton';
import AuthInput from './AuthInput';
import AuthQuestions from './AuthQuestions';
import DudemeetLogo from './DudemeetLogo';

export default function SignUpForm() {
  const router = useRouter();
  const emailId = useId();
  const passwordId = useId();
  const nameId = useId();
  const companyNameId = useId();
  const passwordConfirmId = useId();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    getFieldState,
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

  const debouncedValidation = useDebounce((name: keyof TAuthInputs) => {
    trigger(name);
  }, 1000);

  const { isDirty: isNicknameDirty, invalid: isNicknameInvalid } = getFieldState('nickname');
  const { isDirty: isEmailDirty, invalid: isEmailInvalid } = getFieldState('email');
  const { isDirty: isCompanyNameDirty, invalid: isCompanyNameInvalid } =
    getFieldState('companyName');
  const { isDirty: isPasswordDirty, invalid: isPasswordInvalid } = getFieldState('password');
  const { isDirty: isPasswordConfirmDirty, invalid: isPasswordConfirmInvalid } =
    getFieldState('passwordConfirm');

  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  const isDisabled =
    isSignUpPending ||
    !!errors.password ||
    !!errors.email ||
    !!errors.companyName ||
    !!errors.nickname ||
    !!errors.passwordConfirm ||
    !!signUpError ||
    !isEmailDirty ||
    isEmailInvalid ||
    !isNicknameDirty ||
    isNicknameInvalid ||
    !isCompanyNameDirty ||
    isCompanyNameInvalid ||
    !isPasswordDirty ||
    isPasswordInvalid ||
    !isPasswordConfirmDirty ||
    isPasswordConfirmInvalid;

  useEffect(() => {
    if (signUpError) console.error(signUpError);
  }, [signUpError]);

  return (
    <div className="w-[343px] h-full min-h-dvh flex flex-col items-center justify-center">
      <div className="w-full h-14 flex items-center">
        <DudemeetLogo />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center justify-center gap-10 pt-4 pb-5"
      >
        <div className="flex-1 w-full flex flex-col items-center justify-center gap-6">
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <h3 className="text-title-1 text-left w-full font-semibold">반가워요!</h3>
            <p className="text-body-2-normal text-gray400 text-left w-full">
              두두와 함께 새로운 모임을 발굴해보세요
            </p>
          </div>
          {isSignUpPending && <div>로딩 중...</div>}
          <div className="w-full flex flex-col items-center justify-center gap-10">
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor={nameId} className="text-body-2-normal font-semibold">
                  이름 <span className="text-red-500">*</span>
                </label>
                <AuthInput
                  type="text"
                  placeholder="dothemeet"
                  name="nickname"
                  id={nameId}
                  className={cn(
                    'h-[54px]',
                    (errors.nickname || signUpError) && 'focus-visible:ring-red-500',
                  )}
                  register={register('nickname', {
                    required: '이름을 입력해주세요',
                    onChange: (e) => {
                      if (signUpError) reset();
                      setValue('nickname', e.target.value);
                      debouncedValidation('nickname');
                    },
                  })}
                />
                {errors.nickname && (
                  <p className="text-red-500 text-label-normal font-medium">
                    {errors.nickname.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={emailId} className="text-body-2-normal font-semibold">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <AuthInput
                  type="text"
                  placeholder="example@google.com"
                  name="email"
                  className={cn(
                    'h-[54px]',
                    (errors.email || signUpError) && 'focus-visible:ring-red-500',
                  )}
                  id={emailId}
                  register={register('email', {
                    required: '이메일을 입력해주세요',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: '올바른 이메일을 입력해주세요',
                    },
                    onChange: (e) => {
                      if (signUpError) reset();
                      setValue('email', e.target.value);
                      debouncedValidation('email');
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-label-normal font-medium">
                    {errors.email.message}
                  </p>
                )}
                {signUpError && (
                  <p className="text-red-500 text-label-normal font-medium">
                    {signUpError.message === '이미 사용 중인 이메일입니다'
                      ? '중복되는 이메일이 있어요'
                      : errors.email?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={companyNameId} className="text-body-2-normal font-semibold">
                  회사명 <span className="text-red-500">*</span>
                </label>
                <AuthInput
                  type="text"
                  placeholder="회사명을 입력해주세요"
                  name="companyName"
                  id={companyNameId}
                  className={cn(
                    'h-[54px]',
                    (errors.companyName || signUpError) && 'focus-visible:ring-red-500',
                  )}
                  register={register('companyName', {
                    required: '회사명을 입력해주세요',
                    onChange: (e) => {
                      if (signUpError) reset();
                      setValue('companyName', e.target.value);
                      debouncedValidation('companyName');
                    },
                  })}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-label-normal font-medium">
                    {errors.companyName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={passwordId} className="text-body-2-normal font-semibold">
                  비밀번호 <span className="text-red-500">*</span>
                </label>
                <AuthInput
                  type="password"
                  placeholder="******"
                  name="password"
                  id={passwordId}
                  className={cn(
                    'h-[54px]',
                    (errors.password || signUpError) && 'focus-visible:ring-red-500',
                  )}
                  register={register('password', {
                    required: '비밀번호를 입력해주세요',
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      message: '특수문자 포함 8~20자 사이로 입력해주세요',
                    },
                    onChange: (e) => {
                      if (signUpError) reset();
                      setValue('password', e.target.value);
                      debouncedValidation('password');
                    },
                  })}
                />
                <p className="text-label-normal text-gray300 font-semibold">
                  특수문자 포함 8~20자 사이로 입력해주세요
                </p>
                {errors.password && (
                  <p className="text-red-500 text-label-normal font-medium">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={passwordConfirmId} className="text-body-2-normal font-semibold">
                  비밀번호 확인 <span className="text-red-500">*</span>
                </label>
                <AuthInput
                  type="password"
                  placeholder="******"
                  name="passwordConfirm"
                  id={passwordConfirmId}
                  className={cn(
                    'h-[54px]',
                    (errors.passwordConfirm || signUpError) && 'focus-visible:ring-red-500',
                  )}
                  register={register('passwordConfirm', {
                    required: '비밀번호를 다시 한번 입력해주세요',
                    validate: (value) => {
                      if (value === watch('password')) {
                        setIsPasswordConfirmed(true);
                        return true;
                      }
                      setIsPasswordConfirmed(false);
                      return '비밀번호가 일치하지 않아요';
                    },
                    onChange: (e) => {
                      if (signUpError) reset();
                      setValue('passwordConfirm', e.target.value);
                      debouncedValidation('passwordConfirm');
                    },
                  })}
                />
                <p className="text-label-normal text-gray300 font-semibold">
                  특수문자 포함 8~20자 사이로 입력해주세요
                </p>
                {errors.passwordConfirm?.message === '비밀번호가 일치하지 않습니다.' && (
                  <p className="text-red-500 text-label-normal font-medium">
                    {errors.passwordConfirm.message}
                  </p>
                )}
                {isPasswordConfirmed && (
                  <p className="text-green-500 text-label-normal font-medium">
                    비밀번호가 일치합니다
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-4">
          <AuthQuestions type="signin" />
          <AuthButton
            className={cn(
              'bg-gray950 text-white rounded-2xl h-[56px] text-body-1-normal font-semibold',
              isDisabled ? 'text-gray600 cursor-not-allowed' : 'text-gray50 bg-orange200',
            )}
            disabled={isDisabled}
            type="submit"
          >
            가입 완료
          </AuthButton>
        </div>
      </form>
    </div>
  );
}
