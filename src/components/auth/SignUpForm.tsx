'use client';

import { useAuth, useSignUpMutation } from '@/hooks/auth/auth.hook';
import { TAuthFormValues } from '@/types/auth/auth.type';
import { cn } from '@/utils/auth/ui.util';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import AuthButton from './AuthButton';
import AuthLabelWithInput from './AuthLabelWithInput';
import AuthLabelWithTextArea from './AuthLabelWithTextArea';
import AuthLoading from './AuthLoading';
import AuthQuestions from './AuthQuestions';
import AuthSelect from './AuthSelect';
import AuthSignUpComplete from './AuthSignUpComplete';
import AuthTags from './AuthTags';
import { DothemeetLogo } from './icons';

export default function SignUpForm() {
  const positionId = useId();

  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  const queryClient = useQueryClient();
  const methods = useForm<TAuthFormValues>({
    defaultValues: {
      tags: [{ value: '' }],
    },
  });

  const {
    mutate: signUp,
    isPending: isSignUpPending,
    error: signUpError,
    reset: signUpReset,
  } = useSignUpMutation();

  const { me, isMeLoading } = useAuth();

  const onSubmit = async (data: TAuthFormValues) => {
    if (signUpError) return;
    const signUpData = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
      position: data.position,
      introduction: data.introduction || null,
      tags: data.tags?.filter((tag) => tag.value !== '').map((tag) => tag.value) || null,
    };
    signUp(signUpData);
  };

  const isDisabled =
    isSignUpPending ||
    !!methods.formState.errors.password ||
    !!methods.formState.errors.email ||
    !!methods.formState.errors.position ||
    !!methods.formState.errors.nickname ||
    !!methods.formState.errors.passwordConfirm ||
    !!methods.formState.errors.tags ||
    !!signUpError ||
    !methods.formState.isValid;

  useEffect(() => {
    if (!signUpError) return;
    methods.setError('email', { type: 'manual', message: '이미 가입된 계정이에요' });
    methods.setFocus('email');
  }, [signUpError, methods]);

  useEffect(() => {
    if (methods.formState.errors.password) {
      methods.setFocus('password');
    }
  }, [methods.formState.errors.password, methods]);

  if (me) return <AuthSignUpComplete me={me} />;

  return (
    <>
      {(isSignUpPending || isMeLoading) && <AuthLoading />}

      <div className="w-full h-full min-h-dvh flex flex-col items-center justify-center bg-background200 md:bg-background100">
        <div className="w-[343px] md:w-[664px] 2xl:w-[1536px] min-h-dvh flex flex-col items-center justify-center md:justify-start pb-5 md:pb-0">
          <div className="w-full h-14 flex items-center">
            <Link href="/" className="cursor-pointer">
              <DothemeetLogo />
            </Link>
          </div>
          <div className="w-full h-full md:min-h-[1335px] 2xl:min-h-[1276px] flex flex-col items-center justify-start md:justify-center ">
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
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
                      <AuthLabelWithInput
                        name="nickname"
                        label="닉네임"
                        placeholder="dothemeet"
                        registerOptions={{
                          required: '닉네임을 입력해주세요',
                        }}
                        mutationReset={signUpReset}
                      />

                      <AuthLabelWithInput
                        name="email"
                        label="이메일"
                        placeholder="example@google.com"
                        registerOptions={{
                          required: '이메일을 입력해주세요',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: '올바른 이메일 형식을 입력해 주세요',
                          },
                        }}
                        mutationReset={signUpReset}
                      />

                      <AuthLabelWithInput
                        name="password"
                        label="비밀번호"
                        placeholder="******"
                        isPassword
                        registerOptions={{
                          required: '비밀번호를 입력해주세요',
                          pattern: {
                            value: /^(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                            message: '특수문자 포함 8~20자 사이로 입력해주세요',
                          },
                          onChange: (e) => {
                            if (e.target.value === methods.getValues('passwordConfirm')) {
                              setIsPasswordConfirmed(true);
                            }
                          },
                        }}
                        mutationReset={signUpReset}
                        additionalErrors={
                          !methods.formState.errors.password && (
                            <p className="text-label-normal text-gray300 font-semibold">
                              특수문자 포함 8~20자 사이로 입력해주세요
                            </p>
                          )
                        }
                      />

                      <AuthLabelWithInput
                        name="passwordConfirm"
                        label="비밀번호 확인"
                        placeholder="******"
                        isPassword
                        registerOptions={{
                          required: '비밀번호를 다시 한번 입력해주세요',
                          validate: (value) => {
                            if (value === methods.watch('password')) {
                              setIsPasswordConfirmed(true);
                              methods.clearErrors('passwordConfirm');
                              return true;
                            }
                            setIsPasswordConfirmed(false);
                            return '비밀번호가 일치하지 않아요';
                          },
                        }}
                        mutationReset={signUpReset}
                        additionalErrors={
                          (isPasswordConfirmed &&
                            !methods.formState.errors.passwordConfirm?.message && (
                              <p className="text-green-500 text-label-normal font-medium">
                                비밀번호가 일치합니다
                              </p>
                            )) ||
                          (!isPasswordConfirmed && !methods.formState.errors.passwordConfirm && (
                            <p className="text-label-normal text-gray300 font-semibold">
                              특수문자 포함 8~20자 사이로 입력해주세요
                            </p>
                          ))
                        }
                      />

                      <div className="flex flex-col gap-2">
                        <label htmlFor={positionId} className="text-body-2-normal font-medium">
                          직군 <span className="text-red200">*</span>
                        </label>
                        <Controller
                          name="position"
                          control={methods.control}
                          render={({ field: { onChange, value } }) => (
                            <AuthSelect
                              options={[
                                { value: 'PM', label: 'PM' },
                                { value: 'DESIGNER', label: '디자이너' },
                                { value: 'FRONTEND', label: '프론트 개발자' },
                                { value: 'BACKEND', label: '백엔드 개발자' },
                              ]}
                              className={cn(
                                'h-[54px]',
                                (methods.formState.errors.position || signUpError) &&
                                  'focus-visible:ring-error',
                              )}
                              placeholder="직군을 선택해주세요"
                              value={value}
                              onChange={onChange}
                            />
                          )}
                          rules={{ required: '직군을 선택해주세요' }}
                        />
                        {methods.formState.errors.position && (
                          <p className="text-error text-label-normal font-medium">
                            {methods.formState.errors.position.message}
                          </p>
                        )}
                      </div>

                      <AuthLabelWithTextArea
                        name="introduction"
                        label="소개"
                        placeholder="소개를 입력해주세요"
                        isRequired={false}
                        className="h-[100px]"
                        registerOptions={{
                          maxLength: {
                            value: 20,
                            message: '최대 20자까지 입력 가능해요',
                          },
                        }}
                        mutationReset={signUpReset}
                        additionalErrors={
                          !methods.formState.errors.introduction && (
                            <p className="text-label-normal text-gray300 font-semibold">
                              최대 20자까지 입력 가능해요
                            </p>
                          )
                        }
                      />

                      <AuthTags signUpError={!!signUpError} signUpReset={signUpReset} />
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
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
}
