'use client';

import { GatheringCard } from '@/components/mypage/gatheringCard/GatheringCard';
import { IParticipatedMoim } from '@/types/mypage/moim.type';
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
import { useState } from 'react';
import { useParticipatedMoimQuery } from '@/hooks/mypage/queries/useMoimsQuery';
import { LoadingAnimation } from '@/components/mypage/LoadingAnimation';
import { useUserQuery } from '@/hooks/mypage/queries/useUserQuery';
// import defaultImage from '@public/images/mypage/camera.svg';
import { useForm } from 'react-hook-form';
import { IReviewPost } from '@/types/mypage/reviews.type';
import { usePostReviewMutation } from '@/hooks/mypage/queries/useReviewQuery';

interface Props {
  moim: IParticipatedMoim;
}

export default function CreateReview({ moim }: Props) {
  const { data, isLoading, error: queryError } = useParticipatedMoimQuery();
  const { data: userData, error: userError } = useUserQuery();
  const { mutate: postReview, isPending: isPosting } = usePostReviewMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [clicked, setClicked] = useState('');
  const [review, setReview] = useState('');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const methods = useForm<IReviewPost>({
    defaultValues: {
      review: '',
      rate: undefined,
    },
    mode: 'onChange',
  });

  // 파생 데이터 계산
  const userUuid = userData?.id;
  const nickname = userData?.nickname;
  const moimId = data?.map((m) => m.moimId);

  // 기존 map 사용 시 중첩 배열이 생성되어 단일 배열로 변환하는 flatMap 사용
  const participatedUserUuid = data?.flatMap((m) =>
    m.participatedUsers.map((user) => user.userUuid),
  );

  const isParticipatedUser = Boolean(userUuid && participatedUserUuid?.includes(userUuid));

  // console.log('isParticipatedUser:', isParticipatedUser);
  // console.log('participatedUserUuid:', participatedUserUuid);
  // console.log('userUuid:', userUuid);
  // console.log('moim:', moimId);

  const handleClose = () => {
    setShowModal(true);
  };

  const handleReview = (click: string) => {
    if (clicked === click) {
      setClicked('');
      methods.setValue('rate', undefined);
    } else {
      setClicked(click);
      methods.setValue('rate', click as 'SOSO' | 'GOOD' | 'RECOMMEND');
    }
  };

  const isDisabled = isPosting || !methods.getValues('review') || !methods.getValues('rate');

  const isFormValid = review?.length > 0 && clicked !== '';

  const onSubmit = (data: IReviewPost) => {
    setSubmitError(null);

    try {
      // data 배열에서 첫 번째 모임 정보를 사용
      const currentMoim = moimId?.[0];

      console.log('제출 데이터:', {
        currentMoim,
        reviewData: data,
      });

      if (!currentMoim) {
        setSubmitError('없는 모임');
        return;
      }

      // console.log('리뷰 제출:', {
      //   review: data.review,
      //   rate: data.rate,
      //   moimId: currentMoim,
      // });

      postReview(
        {
          review: data.review,
          rate: data.rate,
          moimId: currentMoim,
        },
        {
          // 리뷰 작성 후 페이지 새로고침해야 데이터 반영이 됨
          onSuccess: () => {
            window.location.href = '/mypage';
          },
        },
      );
    } catch (error) {
      console.error('리뷰 제출 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      setSubmitError(errorMessage);
    }
  };

  // 이미지 처리 부분
  // const handleImageClick = () => {
  //   fileInputRef.current?.click();
  // };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setPreviewImage(imageUrl);
  //   }
  // };

  if (isLoading || isPosting) {
    return (
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <LoadingAnimation />
      </div>
    );
  }

  if (queryError || userError) {
    return <div>오류가 발생했습니다</div>;
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
            {nickname}님<br /> 이번 모임에 대한 리뷰를 작성해주세요.
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

        <form className="flex flex-col gap-6" onSubmit={methods.handleSubmit(onSubmit)}>
          <span>모임은 어땠나요?</span>

          <div className="flex gap-7 items-center justify-center sm:justify-start">
            <button type="button" onClick={() => handleReview('SOSO')}>
              <Image
                src={clicked === 'SOSO' ? badOn : badOff}
                alt="그냥그래요"
                width={80}
                height={112}
              />
            </button>
            <button type="button" onClick={() => handleReview('GOOD')}>
              <Image
                src={clicked === 'GOOD' ? goodOn : goodOff}
                alt="괜찮아요"
                width={80}
                height={112}
              />
            </button>
            <button type="button" onClick={() => handleReview('RECOMMEND')}>
              <Image
                src={clicked === 'RECOMMEND' ? greatOn : greatOff}
                alt="추천해요"
                width={80}
                height={112}
              />
            </button>
          </div>
          {submitError && <div className="text-red-500 text-sm mt-2">{submitError}</div>}

          <div className="flex flex-col gap-6">
            <label htmlFor="review" className="text-body-2-nomal font-medium text-gray-800">
              구체적인 경험을 알려주세요
            </label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
                methods.setValue('review', e.target.value);
              }}
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

          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full h-14 rounded-2xl py-[17px] text-body-1-nomal font-semibold
              ${isFormValid ? 'bg-orange200 text-white' : 'bg-gray950 text-gray600'}`}
          >
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
                  onClick={() => router.replace('/mypage')}
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
  } else {
    // 모달이나 페이지 생성 예정
    return <div>이 모임의 참여자가 아닙니다.</div>;
  }
}
