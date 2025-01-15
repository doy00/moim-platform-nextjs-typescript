'use client';

import { useDebounce, useSignUpMutation } from '@/hooks/auth/auth.hook';
import { TAuthInputs } from '@/types/auth/auth.type';
import { cn } from '@/utils/auth/ui.util';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthBar from './AuthBar';
import AuthButton from './AuthButton';
import AuthInput from './AuthInput';
import AuthQuestions from './AuthQuestions';
import DothemeetLogo from './DothemeetLogo';

export default function SignUpForm() {
  const router = useRouter();
  const emailId = useId();
  const passwordId = useId();
  const nicknameId = useId();
  const positionId = useId();
  const passwordConfirmId = useId();
  const introductionId = useId();
  const tagsId = useId();
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
  const { isDirty: isPositionDirty, invalid: isPositionInvalid } = getFieldState('position');
  const { isDirty: isPasswordDirty, invalid: isPasswordInvalid } = getFieldState('password');
  const { isDirty: isPasswordConfirmDirty, invalid: isPasswordConfirmInvalid } =
    getFieldState('passwordConfirm');

  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  const isDisabled =
    isSignUpPending ||
    !!errors.password ||
    !!errors.email ||
    !!errors.position ||
    !!errors.nickname ||
    !!errors.passwordConfirm ||
    !!signUpError ||
    !isEmailDirty ||
    isEmailInvalid ||
    !isNicknameDirty ||
    isNicknameInvalid ||
    !isPositionDirty ||
    isPositionInvalid ||
    !isPasswordDirty ||
    isPasswordInvalid ||
    !isPasswordConfirmDirty ||
    isPasswordConfirmInvalid;

  useEffect(() => {
    if (signUpError) console.error(signUpError);
  }, [signUpError]);

  return (
    <div className="w-full h-full min-h-dvh flex flex-col items-center justify-center bg-background200 md:bg-background100">
      {/** 로딩 수정요망 */}
      {isSignUpPending && <div>로딩 중...</div>}

      <div className="w-[343px] md:w-[664px] 2xl:w-[1536px] min-h-dvh flex flex-col items-center justify-center md:justify-start pb-5 md:pb-0">
        <div className="w-full h-14 flex items-center">
          <DothemeetLogo />
        </div>
        <div className="w-full h-full md:min-h-[1335px] 2xl:min-h-[1276px] flex flex-col items-center justify-start md:justify-center ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-[664px] h-full md:h-[1092px] flex flex-col items-center justify-start md:justify-center md:bg-background200 md:rounded-[32px] gap-10 pt-4 pb-5 md:p-0"
          >
            <div className="flex-1 w-full md:w-[584px] flex flex-col items-center justify-start md:justify-center gap-6 md:py-14">
              <div className="w-full flex flex-col items-center justify-center gap-2">
                <h3 className="text-title-1 text-left w-full font-semibold">반가워요!</h3>
                <p className="text-body-2-normal text-gray400 text-left w-full">
                  두두와 함께 새로운 모임을 발굴해보세요
                </p>
              </div>

              <div className="w-full flex flex-col items-center justify-center gap-10">
                <div className="w-full flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor={nicknameId} className="text-body-2-normal font-medium">
                      닉네임 <span className="text-red200">*</span>
                    </label>
                    <AuthInput
                      type="text"
                      placeholder="dothemeet"
                      name="name"
                      id={nicknameId}
                      className={cn(
                        'h-[54px]',
                        (errors.nickname || signUpError) && 'focus-visible:ring-error',
                      )}
                      register={register('nickname', {
                        required: '닉네임을 입력해주세요',
                        onChange: (e) => {
                          if (signUpError) reset();
                          setValue('nickname', e.target.value);
                          debouncedValidation('nickname');
                        },
                      })}
                    />
                    {errors.nickname && (
                      <p className="text-error text-label-normal font-medium">
                        {errors.nickname.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor={emailId} className="text-body-2-normal font-medium">
                      이메일 <span className="text-red200">*</span>
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
                      <p className="text-error text-label-normal font-medium">
                        {errors.email.message}
                      </p>
                    )}
                    {signUpError && (
                      <p className="text-error text-label-normal font-medium">
                        {signUpError.message === '이미 사용 중인 이메일입니다'
                          ? '중복되는 이메일이 있어요'
                          : errors.email?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor={positionId} className="text-body-2-normal font-medium">
                      직군 <span className="text-red200">*</span>
                    </label>
                    <AuthInput
                      type="text"
                      placeholder="직군을 입력해주세요"
                      name="position"
                      id={positionId}
                      className={cn(
                        'h-[54px]',
                        (errors.position || signUpError) && 'focus-visible:ring-error',
                      )}
                      register={register('position', {
                        required: '직군을 입력해주세요',
                        onChange: (e) => {
                          if (signUpError) reset();
                          setValue('position', e.target.value);
                          debouncedValidation('position');
                        },
                      })}
                    />
                    {errors.position && (
                      <p className="text-error text-label-normal font-medium">
                        {errors.position.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor={passwordId} className="text-body-2-normal font-medium">
                      비밀번호 <span className="text-red200">*</span>
                    </label>
                    <AuthInput
                      type="password"
                      placeholder="******"
                      name="password"
                      id={passwordId}
                      className={cn(
                        'h-[54px]',
                        (errors.password || signUpError) && 'focus-visible:ring-error',
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
                    {errors.password ? (
                      <p className="text-error text-label-normal font-medium">
                        {errors.password.message}
                      </p>
                    ) : (
                      <p className="text-label-normal text-gray300 font-semibold">
                        특수문자 포함 8~20자 사이로 입력해주세요
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor={passwordConfirmId} className="text-body-2-normal font-medium">
                      비밀번호 확인 <span className="text-red200">*</span>
                    </label>
                    <AuthInput
                      type="password"
                      placeholder="******"
                      name="passwordConfirm"
                      id={passwordConfirmId}
                      className={cn(
                        'h-[54px]',
                        (errors.passwordConfirm || signUpError) && 'focus-visible:ring-error',
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

                    {errors.passwordConfirm?.message === '비밀번호가 일치하지 않습니다.' && (
                      <p className="text-error text-label-normal font-medium">
                        {errors.passwordConfirm.message}
                      </p>
                    )}
                    {isPasswordConfirmed ? (
                      <p className="text-green-500 text-label-normal font-medium">
                        비밀번호가 일치합니다
                      </p>
                    ) : (
                      <p className="text-label-normal text-gray300 font-semibold">
                        특수문자 포함 8~20자 사이로 입력해주세요
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor={introductionId} className="text-body-2-normal font-medium">
                      소개
                    </label>
                    <AuthInput
                      type="text"
                      placeholder="소개를 입력해주세요"
                      name="introduction"
                      isTextarea
                      id={introductionId}
                      className={cn(
                        'h-[54px]',
                        (errors.introduction || signUpError) && 'focus-visible:ring-error',
                      )}
                      register={register('introduction', {
                        maxLength: {
                          value: 20,
                          message: '최대 20자까지 입력할 수 있어요',
                        },
                        onChange: (e) => {
                          if (signUpError) reset();
                          setValue('introduction', e.target.value);
                          debouncedValidation('introduction');
                        },
                      })}
                    />
                    {errors.introduction ? (
                      <p className="text-error text-label-normal font-medium">
                        {errors.introduction.message}
                      </p>
                    ) : (
                      <p className="text-label-normal text-gray300 font-semibold">
                        최대 20자까지 입력할 수 있어요
                      </p>
                    )}
                  </div>

                  {/** 태그 수정요망 */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <label htmlFor={introductionId} className="text-body-2-normal font-medium">
                        태그
                      </label>
                      <p className="text-body-2-normal font-medium flex items-center gap-1">
                        <span className="text-gray600">0</span>
                        <AuthBar />
                        <span className="text-gray300">3</span>
                      </p>
                    </div>
                    <AuthInput
                      type="text"
                      placeholder="# 태그추가"
                      name="tags"
                      id={tagsId}
                      className={cn(
                        'h-[34px] w-[76px] text-xs',
                        (errors.nickname || signUpError) && 'focus-visible:ring-error',
                      )}
                      register={register('tags', {
                        maxLength: {
                          value: 5,
                          message: '최대 5글자까지 입력할 수 있어요',
                        },
                        onChange: (e) => {
                          if (signUpError) reset();
                          setValue('tags', e.target.value);
                          debouncedValidation('tags');
                        },
                      })}
                    />
                    {errors.tags ? (
                      <p className="text-error text-label-normal font-medium">
                        {errors.tags?.message}
                      </p>
                    ) : (
                      <p className="text-label-normal text-gray300 font-semibold">
                        최대 5글자까지 입력할 수 있어요
                      </p>
                    )}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
