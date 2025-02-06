'use client';

import { GatheringCard } from '@/components/mypage/gatheringCard/GatheringCard';
import { IMoim } from '@/types/mypage/moim.type';
import { IUser } from '@/types/mypage/user';
import close from '@public/images/mypage/close.svg';
import badOff from '@public/images/mypage/dude-grade-bad-off.svg';
import greatOff from '@public/images/mypage/dude-grade-best-off.svg';
import goodOff from '@public/images/mypage/dude-grade-good-off.svg';
import badOn from '@public/images/mypage/dude-grade-bad-on.svg';
import greatOn from '@public/images/mypage/dude-grade-best-on.svg';
import goodOn from '@public/images/mypage/dude-grade-good-on.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { useParticipatedMoimQuery } from '@/hooks/mypage/queries/useMoimsQuery';
import { LoadingAnimation } from '@/components/mypage/LoadingAnimation';
import { useUserQuery } from '@/hooks/mypage/queries/useUserQuery';
// import defaultImage from '@public/images/mypage/camera.svg';
import { useForm } from 'react-hook-form';
import { IReviewPost } from '@/types/mypage/reviews.type';
interface Props {
  moim: IMoim;
  user: IUser;
}

export default function CreateReview({ moim, user }: Props) {
  const { data, isLoading, error } = useParticipatedMoimQuery();
  const [clicked, setClicked] = useState('');
  const { data: userData, error: userError } = useUserQuery();
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userNickname = userData?.nickname;

  const isParticipatedUser = data
    ?.find((moim) => moim.moimId === moim.moimId)
    ?.participatedUsers.some((user) => user.userNickname === userNickname);

  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const handleClose = () => {
    setShowModal(true);
  };

  // console.log('');
  // console.log('참여자 정보:', isParticipatedUser);
  // console.log('모임 데이터:', data);

  const handleReview = (click: string) => {
    if (clicked === click) {
      setClicked('');
    } else {
      setClicked(click);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const { handleSubmit, register } = useForm<IReviewPost>();

  const onSubmit = (data: IReviewPost) => {
    console.log(data);
  };

  if (error || userError) {
    return <div>오류발생</div>;
  }

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (isParticipatedUser) {
    return (
      <div className="flex flex-col gap-10 p-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="text-body-1-normal font-semibold text-gray800">리뷰 작성하기</span>
            <Image
              src={close}
              alt="close"
              width={24}
              height={24}
              onClick={handleClose}
              className="cursor-pointer"
            />
          </div>
          <span className="text-heading1 text-gray800 font-semibold">
            {userNickname}님<br /> 이번 모임에 대한 리뷰를 작성해주세요.
          </span>
        </div>
        <div>
          {data?.map((moim) => (
            <GatheringCard
              moim={moim}
              key={moim.moimId}
              hideStatus={true}
              hideReviewButton={true}
              disableLink={true}
            />
          ))}
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="flex flex-col gap-6"> */}
          <span>모임은 어땠나요?</span>
          <div className="flex gap-7 items-center justify-center sm:justify-start">
            <button onClick={() => handleReview('SOSO')}>
              <Image
                src={clicked === 'SOSO' ? badOn : badOff}
                alt="그냥그래요"
                width={80}
                height={112}
              />
            </button>
            <button onClick={() => handleReview('GOOD')}>
              <Image
                src={clicked === 'GOOD' ? goodOn : goodOff}
                alt="괜찮아요"
                width={80}
                height={112}
              />
            </button>
            <button onClick={() => handleReview('RECOMMEND')}>
              <Image
                src={clicked === 'RECOMMEND' ? greatOn : greatOff}
                alt="추천해요"
                width={80}
                height={112}
              />
            </button>
          </div>
          {/* </div> */}

          <div className="flex flex-col gap-6">
            <span>구체적인 경험을 알려주세요</span>
            <textarea
              {...register('review')}
              className="w-full h-40 rounded-xl px-4 py-[18px] bg-background400 resize-none"
              placeholder="모임의 장소, 환경, 진행, 구성 등 만족스러웠나요?"
            />
          </div>

          {/* 모임 관련 사진 유무 확인 */}
          {/* <div className="flex flex-col gap-6">
            <span>모임 관련 사진이 있나요?</span>
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={handleImageClick}
                className="w-full h-[140px] rounded-xl bg-background400 flex flex-col gap-2 items-center justify-center cursor-pointer"
              >
                <Image
                  src={previewImage || defaultImage}
                  alt="camera"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <span className="text-label-normal font-medium text-gray400">
                  이미지를 추가해주세요
                </span>
              </div>
            </div>
          </div> */}

          <button className="w-full h-14 rounded-2xl bg-gray950 py-[17px] text-gray600 font-semibold text-body-1-nomal">
            작성완료
          </button>
        </form>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex flex-col gap-6 bg-background400 pt-8 pb-6 px-6 rounded-3xl w-full max-w-[320px]">
              <div className="flex flex-col gap-3 items-center justify-center">
                <p className="text-body-1-nomal font-semibold text-gray800">취소하고 나갈까요?</p>
                <p className="text-body-2-nomal font-medium text-gray400">
                  나가면 내용은 저장되지 않아요.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  className="flex-1 px-[12.5px] py-3.5 rounded-[14px] bg-gray200 text-gray500 text-body-2-nomal font-semibold"
                  onClick={() => router.back()}
                >
                  나가기
                </button>
                <button
                  className="flex-1 px-[12.5px] py-3.5 rounded-[14px] bg-gray800 text-gray100 text-body-2-nomal font-semibold"
                  onClick={() => setShowModal(false)}
                >
                  이어서 작성하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
