'use client';

import { useDebounce, useSignInMutation, useSignUpMutation } from '@/hooks/auth/auth.hook';
import { TAuthFormValues } from '@/types/auth/auth.type';
import { cn } from '@/utils/auth/ui.util';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import AuthBar from './AuthBar';
import AuthButton from './AuthButton';
import AuthInput from './AuthInput';
import AuthQuestions from './AuthQuestions';
import AuthSelect from './AuthSelect';
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
    formState: { errors, isValid },
    control,
  } = useForm<TAuthFormValues>({
    defaultValues: {
      tags: [{ id: 0, value: '' }],
    },
  });
  const { fields, append } = useFieldArray<TAuthFormValues, 'tags', 'value'>({
    control,
    name: 'tags',
  });

  const {
    mutateAsync: signUp,
    isPending: isSignUpPending,
    error: signUpError,
    reset,
  } = useSignUpMutation();
  const { mutateAsync: signIn } = useSignInMutation();

  const handleAppendTag = () => {
    if (fields.length < 3) {
      append({ id: fields.length, value: '' });
    }
  };

  const debouncedAppendTag = useDebounce(handleAppendTag, 500);

  const debouncedValidation = useDebounce((name: keyof TAuthFormValues) => {
    trigger(name);
  }, 1000);

  const onSubmit = async (data: TAuthFormValues) => {
    if (signUpError) return;
    const signUpData = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
      position: data.position,
      introduction: data.introduction,
      tags: data.tags?.map((tag) => tag.value),
    };
    const response = await signUp(signUpData);
    if (response.isSuccess) {
      await signIn({ email: data.email, password: data.password });
      router.push('/');
    }
  };

  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  const isDisabled =
    isSignUpPending ||
    !!errors.password ||
    !!errors.email ||
    !!errors.position ||
    !!errors.nickname ||
    !!errors.passwordConfirm ||
    !!signUpError ||
    !isValid;

  useEffect(() => {
    if (signUpError) console.error(signUpError);
  }, [signUpError]);

  return (
    <div className="w-full h-full min-h-dvh flex flex-col items-center justify-center bg-background200 md:bg-background100">
      {/** 로딩 수정요망 */}
      {isSignUpPending && <div>로딩 중...</div>}

      <div className="w-[343px] md:w-[664px] 2xl:w-[1536px] min-h-dvh flex flex-col items-center justify-center md:justify-start pb-5 md:pb-0">
        <div className="w-full h-14 flex items-center">
          <Link href="/" className="cursor-pointer">
            <DothemeetLogo />
          </Link>
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

                    {errors.passwordConfirm?.message && (
                      <p className="text-error text-label-normal font-medium">
                        {errors.passwordConfirm.message}
                      </p>
                    )}
                    {isPasswordConfirmed && !errors.passwordConfirm?.message && (
                      <p className="text-green-500 text-label-normal font-medium">
                        비밀번호가 일치합니다
                      </p>
                    )}
                    {!isPasswordConfirmed && !errors.passwordConfirm && (
                      <p className="text-label-normal text-gray300 font-semibold">
                        특수문자 포함 8~20자 사이로 입력해주세요
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor={positionId} className="text-body-2-normal font-medium">
                      직군 <span className="text-red200">*</span>
                    </label>
                    <Controller
                      name="position"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <AuthSelect
                          options={[
                            { value: 'pm', label: 'PM' },
                            { value: 'designer', label: '디자이너' },
                            { value: 'frontend', label: '프론트 개발자' },
                            { value: 'backend', label: '백엔드 개발자' },
                          ]}
                          className={cn(
                            'h-[54px]',
                            (errors.position || signUpError) && 'focus-visible:ring-error',
                          )}
                          placeholder="직군을 선택해주세요"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                      rules={{ required: '직군을 선택해주세요' }}
                    />
                    {errors.position && (
                      <p className="text-error text-label-normal font-medium">
                        {errors.position.message}
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
                        'h-[100px]',
                        (errors.introduction || signUpError) && 'focus-visible:ring-error',
                      )}
                      register={register('introduction', {
                        maxLength: {
                          value: 20,
                          message: '최대 20자까지 입력 가능해요',
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
                        최대 20자까지 입력 가능해요
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <label htmlFor={introductionId} className="text-body-2-normal font-medium">
                        태그
                      </label>
                      <p className="text-body-2-normal font-medium flex items-center gap-1">
                        <span className="text-gray600">{fields.length}</span>
                        <AuthBar />
                        <span className="text-gray300">3</span>
                      </p>
                    </div>
                    <div className="flex flex-row gap-2">
                      {fields.map((field, index) => (
                        <AuthInput
                          key={field.id}
                          type="text"
                          placeholder="# 태그추가"
                          name={`tags.${index}.value`}
                          isArray
                          id={tagsId}
                          className={cn(
                            'h-[34px] w-[76px] text-xs',
                            (errors.tags || signUpError) && 'focus-visible:ring-error',
                          )}
                          register={register(`tags.${index}.value` as const, {
                            maxLength: {
                              value: 5,
                              message: '최대 5글자까지 입력 가능해요',
                            },
                            onChange: (e) => {
                              if (signUpError) reset();
                              setValue(`tags.${index}.value`, e.target.value);
                              debouncedValidation(`tags`);
                              debouncedAppendTag();
                            },
                          })}
                        />
                      ))}
                    </div>
                    {errors.tags ? (
                      <p className="text-error text-label-normal font-medium">
                        최대 5글자까지 입력 가능해요
                      </p>
                    ) : (
                      <p className="text-label-normal text-gray300 font-semibold">
                        최대 5글자까지 입력 가능해요
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
