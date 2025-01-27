'use client';

import Header from '@/components/mypage/header/Header';
import { LoadingAnimation } from '@/components/mypage/LoadingAnimation';
import { useUserQuery } from '@/hooks/mypage/queries/useUserQuery';
import defaultProfile from '@images/mypage/profile-edit-default.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface UserData {
  email: string;
  name: string;
  image: string;
  // introduction?: string;
  tags?: string[];
}

export default function EditUser() {
  const { data, isLoading } = useUserQuery();
  const [textareaValue, setTextareaValue] = useState('');
  const [isExceeded, setIsExceeded] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  // const [introduction, setIntroduction] = useState(data?.introduction || '');

  const handleInput = () => {
    if (textareaValue) {
      const text = textareaValue;
      // setIntroduction(text);
      setIsExceeded(text.length >= 20);
      if (text.length > 20) {
        setTextareaValue(text.slice(0, 20));
      }
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      //마지막 글자가 확정되지 않은 상태에서 엔터키를 누르면 글자가 다음 태그로 넘어가는 문제가 발생(IME(Input Method Editor) 이슈) 추가함.
      if (e.nativeEvent.isComposing) return;

      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setInputValue('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
  };

  const isFormValid = tags.length > 0 && tags.length <= 3 && textareaValue;

  //스켈레톤으로 구현하는 것이 더 나아보임, 추후 수정 예정
  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="h-auto flex flex-col gap-4 mx-auto max-w-[584px] md:bg-background300 md:rounded-[32px] md:px-11 md:py-10 md:mt-14 lg:mt-10">
        <div className="py-10 px-4">
          <div className="flex flex-col items-center gap-6">
            <Image src={data?.data.image ?? defaultProfile} alt="profile" width={86} height={86} />
            <Link
              href="/mypage/editPassword"
              className="text-label-normal font-medium text-orange200"
            >
              비밀번호 변경
            </Link>
          </div>

          <form className="flex flex-col gap-6 mt-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <label htmlFor="email">이메일 주소</label>
              <input
                type="text"
                id="email"
                placeholder="dothemeet@google.com"
                className="rounded-xl bg-background400 px-4 py-[18px] placeholder:text-gray300"
                value={data?.data.email}
                disabled
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="nickName">닉네임</label>
              <div className="flex flex-col gap-1.5">
                <input
                  type="text"
                  id="nickName"
                  placeholder="두두두두"
                  className="rounded-xl bg-background400 px-4 py-[18px] placeholder:text-gray300"
                  value={data?.data.nickname}
                  disabled
                />
                <span className="text-label-normal font-medium text-gray300">
                  최대 8글자까지 입력 가능해요
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="textarea">소개</label>
              <div className="flex flex-col gap-1.5">
                <textarea
                  id="textarea"
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  placeholder="소개를 입력해주세요"
                  className={`rounded-xl bg-background400 px-4 py-[18px] placeholder:text-gray300 resize-none outline-none ${
                    isExceeded ? 'border-2 border-error focus:border-error' : ''
                  }`}
                  maxLength={20}
                  onInput={handleInput}
                />
                <span
                  className={`text-label-normal font-medium ${isExceeded ? 'text-error' : 'text-gray300'}`}
                >
                  최대 20자까지 입력 가능해요
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="tag">태그</label>
                <div />
              </div>
              <div className="relative flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  <input
                    type="text"
                    id="tag"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyUp={handleTagInput}
                    maxLength={5}
                    placeholder="# 태그추가"
                    className="flex gap-2 items-center rounded-xl px-4 py-2 bg-background400 outline-none text-caption-normal font-medium placeholder:text-gray300 w-[90px] "
                  />

                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 bg-background400 rounded-xl justify-between"
                    >
                      <span
                        key={index}
                        className="inline-flex items-center text-caption-normal font-medium text-gray600 "
                      >
                        #{tag}
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
                <span
                  className={`text-label-normal font-medium ${
                    tags.length > 3 ? 'text-error' : 'text-gray300'
                  }`}
                >
                  최대 5글자까지 입력 가능해요
                </span>
              </div>
            </div>
            <button
              type="submit"
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
