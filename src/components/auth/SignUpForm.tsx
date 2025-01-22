'use client';

import { useDebounce, useSignInMutation, useSignUpMutation } from '@/hooks/auth/auth.hook';
import { TAuthFormValues } from '@/types/auth/auth.type';
import { cn } from '@/utils/auth/ui.util';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import AuthBar from './AuthBar';
import AuthButton from './AuthButton';
import AuthInput from './AuthInput';
import AuthLabelWithInput from './AuthLabelWithInput';
import AuthQuestions from './AuthQuestions';
import AuthSelect from './AuthSelect';
import DothemeetLogo from './DothemeetLogo';

export default function SignUpForm() {
  const router = useRouter();
  const positionId = useId();
  const introductionId = useId();
  const tagsId = useId();
  const methods = useForm<TAuthFormValues>({
    defaultValues: {
      tags: [{ id: 0, value: '' }],
    },
  });
  const { fields, append } = useFieldArray<TAuthFormValues, 'tags', 'value'>({
    control: methods.control,
    name: 'tags',
  });

  const {
    mutateAsync: signUp,
    isPending: isSignUpPending,
    error: signUpError,
    reset: signUpReset,
  } = useSignUpMutation();
  const { mutateAsync: signIn } = useSignInMutation();

  const handleAppendTag = () => {
    if (fields.length < 3) append({ id: fields.length, value: '' });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (methods.formState.errors.tags) return;
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      handleAppendTag();
    }
  };

  const debouncedValidation = useDebounce((name: keyof TAuthFormValues) => {
    methods.trigger(name);
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
    !!methods.formState.errors.password ||
    !!methods.formState.errors.email ||
    !!methods.formState.errors.position ||
    !!methods.formState.errors.nickname ||
    !!methods.formState.errors.passwordConfirm ||
    !!methods.formState.errors.tags ||
    !!signUpError ||
    !methods.formState.isValid;

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
                      type="text"
                      mutationError={signUpError}
                      reset={signUpReset}
                      registerOptions={{ required: '닉네임을 입력해주세요' }}
                    />

                    <AuthLabelWithInput
                      name="email"
                      label="이메일"
                      placeholder="example@google.com"
                      type="text"
                      mutationError={signUpError}
                      reset={signUpReset}
                      registerOptions={{
                        required: '이메일을 입력해주세요',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: '올바른 이메일 형식을 입력해 주세요',
                        },
                      }}
                      additionalErrors={
                        signUpError && (
                          <p className="text-error text-label-normal font-medium">
                            {signUpError.message === '이미 사용 중인 이메일입니다'
                              ? '중복되는 이메일이 있어요'
                              : methods.formState.errors.email?.message}
                          </p>
                        )
                      }
                    />

                    <AuthLabelWithInput
                      name="password"
                      label="비밀번호"
                      placeholder="******"
                      type="password"
                      mutationError={signUpError}
                      reset={signUpReset}
                      registerOptions={{
                        required: '비밀번호를 입력해주세요',
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                          message: '특수문자 포함 8~20자 사이로 입력해주세요',
                        },
                      }}
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
                      type="password"
                      mutationError={signUpError}
                      reset={signUpReset}
                      registerOptions={{
                        required: '비밀번호를 다시 한번 입력해주세요',
                        validate: (value) => {
                          if (value === methods.getValues('password')) {
                            setIsPasswordConfirmed(true);
                            return true;
                          }
                          setIsPasswordConfirmed(false);
                          return '비밀번호가 일치하지 않아요';
                        },
                      }}
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
                              { value: 'pm', label: 'PM' },
                              { value: 'designer', label: '디자이너' },
                              { value: 'frontend', label: '프론트 개발자' },
                              { value: 'backend', label: '백엔드 개발자' },
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

                    <AuthLabelWithInput
                      name="introduction"
                      label="소개"
                      placeholder="소개를 입력해주세요"
                      type="text"
                      isTextarea
                      isRequired={false}
                      className="h-[100px]"
                      mutationError={signUpError}
                      reset={signUpReset}
                      registerOptions={{
                        maxLength: {
                          value: 20,
                          message: '최대 20자까지 입력 가능해요',
                        },
                      }}
                      additionalErrors={
                        !methods.formState.errors.introduction && (
                          <p className="text-label-normal text-gray300 font-semibold">
                            최대 20자까지 입력 가능해요
                          </p>
                        )
                      }
                    />

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
                            onKeyDown={handleKeyDown}
                            isArray
                            id={tagsId}
                            className={cn(
                              'h-[34px] w-[76px] text-xs',
                              (methods.formState.errors.tags || signUpError) &&
                                'focus-visible:ring-error',
                            )}
                            register={methods.register(`tags.${index}.value` as const, {
                              maxLength: {
                                value: 5,
                                message: '최대 5글자까지 입력 가능해요',
                              },
                              onChange: (e) => {
                                if (signUpError) signUpReset();
                                methods.setValue(`tags.${index}.value`, e.target.value);
                                debouncedValidation(`tags`);
                              },
                            })}
                          />
                        ))}
                      </div>
                      {methods.formState.errors.tags ? (
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
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
