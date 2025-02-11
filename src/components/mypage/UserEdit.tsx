'use client';

import Header from '@/components/mypage/header/Header';
import { LoadingAnimation } from '@/components/mypage/LoadingAnimation';
import { useUserQuery } from '@/hooks/mypage/queries/useUserQuery';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useEditUserMutation } from '@/hooks/mypage/queries/useUserQuery';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import AuthSelect from '@/components/auth/AuthSelect';
import { cn } from '@/utils/auth/ui.util';
import { TAuthFormValues } from '@/types/auth/auth.type';
import { IUserEdit } from '@/types/mypage/user';
import { sendPasswordResetEmail } from '@/apis/userInfo';

export default function UserEdit() {
  const { data, isLoading, error } = useUserQuery();
  const { mutate: editUser, isPending: isEditing } = useEditUserMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 리액트훅폼 document 참고
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  // const [image, setImage] = useState<File | null>(null);
  const [emailInputValue, setEmailInputValue] = useState('');
  const [nicknameInputValue, setNicknameInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState(''); // 변수명 명확하게 수정
  const [tags, setTags] = useState<string[]>([]);
  const [tagInputValue, setTagInputValue] = useState('');
  const [position, setPosition] = useState<'PM' | 'DESIGNER' | 'FRONTEND' | 'BACKEND'>('PM');

  // TODO : zod 라이브러리 사용해보기 타입으로 가능함
  const [isEmailInputExceeded, setIsEmailInputExceeded] = useState(false);
  const [isNicknameInputExceeded, setIsNicknameInputExceeded] = useState(false);
  const [isTextAreaExceeded, setIsTextAreaExceeded] = useState(false);
  const [isTagInputExceeded, setIsTagInputExceeded] = useState(false);
  const [isTagTextExceeded, setIsTagTextExceeded] = useState(false);
  const [isTagIncludeExceeded, setIsTagIncludeExceeded] = useState(false);

  const methods = useForm<TAuthFormValues>({
    defaultValues: {
      tags: [{ value: '' }],
    },
  });

  // methods.handleSubmit;

  // || , ?? 둘 중 하나 고민해보기
  useEffect(() => {
    if (data) {
      setEmailInputValue(data.email || '');
      setNicknameInputValue(data.nickname || '');
      setPosition((data.position || '') as 'PM' | 'DESIGNER' | 'FRONTEND' | 'BACKEND');
      setTextareaValue(data.introduction || '');
      setTags(data.tags || []);
    }
  }, [data]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  // const textAreaHandleInput = () => {
  //   const text = textareaValue;
  //   setIsTextAreaExceeded(text.length > 20);
  // };

  const nicknameInputHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.length <= 8) {
      setNicknameInputValue(text);
      setIsNicknameInputExceeded(text.length > 8);
    } else {
      setIsNicknameInputExceeded(true);
    }
  };

  // 변수명 handle~ 로 수정
  const emailInputHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    setEmailInputValue(text);
    setIsEmailInputExceeded(!emailValidation.test(text));
  };

  // 변수명에 성격?이 명확하면 index는 간결하게 해도 됨
  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags?.filter((_, index) => index !== indexToRemove) || []);
    setIsTagInputExceeded(false);

    setIsTagTextExceeded(false);
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (e.nativeEvent.isComposing) return;

      const newTag = tagInputValue.trim();

      // 태그 개수 체크
      if (tags.length === 3) {
        setIsTagInputExceeded(true);
        return;
      }
      setIsTagInputExceeded(false);

      // 태그 길이 체크
      if (newTag.length > 5) {
        setIsTagTextExceeded(true);
        return;
      }
      setIsTagTextExceeded(false);

      // 태그 중복 체크
      if (tags.includes(newTag)) {
        setIsTagIncludeExceeded(true);
        return;
      }
      setIsTagIncludeExceeded(false);

      // 태그 추가 로직
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInputValue('');
      }
    }
  };

  const tagExceeded = (() => {
    if (isTagInputExceeded) {
      return (
        <span className="text-label-normal font-medium text-error">최대 3개까지 입력 가능해요</span>
      );
    }

    if (isTagTextExceeded) {
      return (
        <span className="text-label-normal font-medium text-error">
          최대 5글자까지 입력 가능해요
        </span>
      );
    }

    if (isTagIncludeExceeded) {
      return <span className="text-label-normal font-medium text-error">이미 추가된 태그에요</span>;
    }

    return (
      <span className="text-label-normal font-medium text-gray300">
        최대 5글자까지 입력 가능해요
      </span>
    );
  })();

  const handlePositionChange = (value: string) => {
    setPosition(value as 'PM' | 'DESIGNER' | 'FRONTEND' | 'BACKEND');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const editData: IUserEdit = {
      email: emailInputValue,
      nickname: nicknameInputValue,
      introduction: textareaValue || '',
      tags: tags || [],
      position: position || '',
      // image: previewImage || undefined,
    };

    console.log('폼 제출 데이터:', editData);

    if (!editData.email || !editData.nickname || !editData.position) {
      console.error('필수 필드가 누락');
      return;
    }

    editUser(editData);
  };

  // 위쪽으로 이동하기
  const isFormValid = tags.length > 0 && tags.length <= 3 && textareaValue;

  // 로딩이랑 수정은 다르기 때문에 분리하는게 좋을 것 같다 -> 분리가 잘 되어있으면 코드가 길어져도 괜츈
  if (isLoading || isEditing) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <LoadingAnimation />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <p>사용자 정보가 없습니다.</p>
        <Link href="/mypage" className="text-orange200">
          마이페이지로 돌아가기
        </Link>
      </div>
    );
  }

  // 즉시실행
  const imgSrc = (() => {
    if (previewImage) {
      return previewImage;
    }

    if (data?.image) {
      return data.image;
    }

    return '/images/mypage/profile-default.svg';
  })();

  const onClickUpdatePasswordBtn = async () => {
    try {
      await sendPasswordResetEmail(data.email);
      alert('비밀번호 변경 이메일을 확인해주세요.');
    } catch (error: any) {
      if (error.error) {
        alert('사용 가능한 이메일로 변경해주세요.');
      } else {
        alert('비밀번호 변경 이메일 전송에 실패했습니다.');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="h-auto flex flex-col gap-4 mx-auto max-w-[584px] md:bg-background300 md:rounded-[32px] md:px-11 md:py-10 md:my-14 lg:my-10">
        <div className="py-10 px-4">
          <div className="flex flex-col items-center gap-6">
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <Image
                src={imgSrc}
                alt="profile"
                width={86}
                height={86}
                className="cursor-pointer rounded-full w-16 h-16"
                onClick={handleImageClick}
              />
            </div>
            {!data.is_social && (
              <button
                onClick={onClickUpdatePasswordBtn}
                className="text-label-normal font-medium text-orange200"
              >
                비밀번호 변경
              </button>
            )}
          </div>

          <form className="flex flex-col gap-6 mt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-body-2-nomal font-medium text-gray-800">
                이메일 주소
              </label>
              <input
                type="text"
                id="email"
                placeholder="dothemeet@google.com"
                className={`rounded-xl bg-background400 px-4 py-[18px] placeholder:text-gray300 outline-none ${
                  isEmailInputExceeded ? 'border-2 border-error focus:border-error' : ''
                }`}
                value={emailInputValue}
                onChange={emailInputHandleInput}
                onInput={emailInputHandleInput}
              />
            </div>
            {isEmailInputExceeded && (
              <span
                className={`text-label-normal font-medium ${isEmailInputExceeded ? 'text-error' : 'text-gray300'}`}
              >
                이메일 형식으로 입력해주세요.
              </span>
            )}

            <div className="flex flex-col gap-3">
              <label htmlFor="nickName" className="text-body-2-nomal font-medium text-gray-800">
                닉네임
              </label>
              <div className="flex flex-col gap-1.5">
                <input
                  type="text"
                  id="nickName"
                  placeholder="두두씨"
                  className={`rounded-xl bg-background400 px-4 py-[18px] placeholder:text-gray300 outline-none ${
                    isNicknameInputExceeded ? 'border-2 border-error focus:border-error' : ''
                  }`}
                  value={nicknameInputValue}
                  onChange={nicknameInputHandleInput}
                  onInput={nicknameInputHandleInput}
                />
                <span
                  className={`text-label-normal font-medium ${
                    isNicknameInputExceeded ? 'text-error' : 'text-gray300'
                  }`}
                >
                  최대 8글자까지 입력 가능해요
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="position" className="flex justify-start items-center gap-[2px]">
                <span className="text-body-2-nomal font-medium text-gray-800">직군</span>
                <span className="text-body-2-nomal font-medium text-error pt-1">*</span>
              </label>
              <Controller
                name="position"
                control={methods.control}
                render={({ field: { onChange, value } }) => (
                  // 업뎃하기
                  <AuthSelect
                    options={[
                      { value: 'PM', label: 'PM' },
                      { value: 'DESIGNER', label: '디자이너' },
                      { value: 'FRONTEND', label: '프론트 개발자' },
                      { value: 'BACKEND', label: '백엔드 개발자' },
                    ]}
                    className={cn(
                      'h-[54px]',
                      methods.formState.errors.position && 'focus-visible:ring-error',
                    )}
                    placeholder="직군을 선택해주세요"
                    value={position}
                    onChange={handlePositionChange}
                  />
                )}
                rules={{ required: '직군을 선택해주세요' }}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="textarea" className="text-body-2-nomal font-medium text-gray-800">
                소개
              </label>
              <div className="flex flex-col gap-1.5">
                <textarea
                  id="textarea"
                  value={textareaValue}
                  onChange={(e) => {
                    setTextareaValue(e.target.value);
                    setIsTextAreaExceeded(e.target.value.length >= 20);
                  }}
                  placeholder="소개를 입력해주세요"
                  className={`rounded-xl bg-background400 px-4 py-[18px] placeholder:text-gray300 resize-none outline-none ${
                    isTextAreaExceeded ? 'border-2 border-error focus:border-error' : ''
                  }`}
                  maxLength={20}
                />
                <span
                  className={`text-label-normal font-medium ${
                    isTextAreaExceeded ? 'text-error' : 'text-gray300'
                  }`}
                >
                  최대 20자까지 입력 가능해요
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label htmlFor="tag" className="text-body-2-nomal font-medium text-gray-800">
                  태그
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray600 font-medium text-caption-normal">
                    {tags.length}
                  </span>
                  <hr className="w-[1px] h-1.5 bg-gray300" />
                  <span className="text-gray300 font-medium text-caption-normal">3</span>
                </div>
              </div>
              <div className="relative flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  <input
                    type="text"
                    id="tag"
                    value={tagInputValue}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue.length <= 5) {
                        setTagInputValue(inputValue);
                        setIsTagTextExceeded(false);
                      } else {
                        setIsTagTextExceeded(true);
                      }
                    }}
                    onKeyDown={handleTagInput}
                    placeholder="# 태그추가"
                    className="flex gap-2 items-center rounded-xl px-4 py-2 bg-background400 outline-none text-caption-normal font-medium placeholder:text-gray300 w-[90px]"
                  />

                  {tags?.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 bg-background400 rounded-xl justify-between"
                    >
                      <span className="inline-flex items-center text-caption-normal font-medium text-gray600 ">
                        # {tag}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className=" text-gray600 hover:text-gray950"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                {tagExceeded}
              </div>
            </div>
            <button
              type="submit"
              disabled={isEditing}
              className={`rounded-2xl px-[141px] py-[17px] ${
                isFormValid ? 'bg-orange200' : 'bg-gray950'
              }`}
            >
              <span
                className={`text-body-1-normal font-semibold ${
                  isFormValid ? 'text-white' : 'text-gray600'
                }`}
              >
                수정완료
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
