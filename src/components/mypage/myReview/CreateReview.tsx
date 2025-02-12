'use client';

import { GatheringCard } from '@/components/mypage/gatheringCard/GatheringCard';
import Header from '@/components/mypage/header/Header';
import { LoadingAnimation } from '@/components/mypage/LoadingAnimation';
import { useAuth } from '@/hooks/auth/auth.hook';
import { useParticipatedMoimQuery } from '@/hooks/mypage/queries/useMoimsQuery';
import { usePostReviewMutation } from '@/hooks/mypage/queries/useReviewQuery';
import { IParticipatedMoim } from '@/types/mypage/moim.type';
import { IReviewPost } from '@/types/mypage/reviews.type';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CreateReview() {
  const router = useRouter();
  const pathname = usePathname();
  const urlMoimId = pathname.split('/').pop();

  const { data, isLoading, error: queryError } = useParticipatedMoimQuery();
  // const { data: userData, error: userError } = useUserQuery();
  const { me: userData, error: userError } = useAuth();
  const { mutate: postReview, isPending: isPosting } = usePostReviewMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [clicked, setClicked] = useState('');
  const [review, setReview] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filteredData, setFilteredData] = useState<IParticipatedMoim[]>([]);

  const methods = useForm<IReviewPost>({
    defaultValues: {
      review: '',
      rate: undefined,
    },
    mode: 'onChange',
  });

  const nickname = userData?.nickname;

  // filteredData 로직을 useEffect로 감싸 초기 렌더링 시에도 적용되게 수정
  useEffect(() => {
    if (data && urlMoimId) {
      const filtered = data.filter((moim) => moim.moimId === urlMoimId);
      setFilteredData(filtered);
    }
  }, [data, urlMoimId]);

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
      if (!urlMoimId) {
        setSubmitError('없는 모임');
        return;
      }

      postReview(
        {
          review: data.review,
          rate: data.rate,
          moimId: urlMoimId,
        },
        {
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

  return (
    <>
      <Header />
      <div className="flex flex-col gap-8 px-5 py-[10px] md:max-w-[584px] mx-auto lg:max-w-[664px] xl:max-w-[664px] ['2xl']:max-w-[664px]">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between pb-[10px] ">
            <span className="text-body-1-normal font-semibold text-gray800">리뷰 작성하기</span>
            <Image
              src="/images/mypage/close.svg"
              alt="close"
              width={24}
              height={24}
              onClick={handleClose}
              className="cursor-pointer"
            />
          </div>
          <span className="text-heading1 text-gray800 font-semibold">
            {nickname}님<br /> 이번 모임은 어땠나요?
          </span>
        </div>
        <div>
          {filteredData?.map((moim) => (
            <div key={moim.moimId}>
              <GatheringCard
                moim={moim}
                hideStatus={true}
                hideReviewButton={true}
                hideLikeButton={true}
                disableLink={true}
                showInReviewTab={true}
              />
            </div>
          ))}
        </div>

        <form className="flex flex-col gap-8" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex items-center gap-[2px] pl-2">
            <span className="text-gray800 text-body-1-normal font-medium">모임은 어땠나요?</span>
            <span className="text-red200 text-body-2-normal font-medium">*</span>
          </div>

          <div className="flex px-7 gap-8 items-center justify-center sm:justify-start">
            <button type="button" onClick={() => handleReview('SOSO')}>
              <Image
                src={
                  clicked === 'SOSO'
                    ? '/images/mypage/dude-grade-bad-on.svg'
                    : '/images/mypage/dude-grade-bad-off.svg'
                }
                alt="그냥그래요"
                width={80}
                height={112}
              />
            </button>
            <button type="button" onClick={() => handleReview('GOOD')}>
              <Image
                src={
                  clicked === 'GOOD'
                    ? '/images/mypage/dude-grade-good-on.svg'
                    : '/images/mypage/dude-grade-good-off.svg'
                }
                alt="괜찮아요"
                width={80}
                height={112}
              />
            </button>
            <button type="button" onClick={() => handleReview('RECOMMEND')}>
              <Image
                src={
                  clicked === 'RECOMMEND'
                    ? '/images/mypage/dude-grade-best-on.svg'
                    : '/images/mypage/dude-grade-best-off.svg'
                }
                alt="추천해요"
                width={80}
                height={112}
              />
            </button>
          </div>
          {submitError && <div className="text-red-500 text-sm mt-2">{submitError}</div>}

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-[2px] pl-2">
              <label htmlFor="review" className="text-body-1-nomal font-medium text-gray-800">
                구체적인 경험을 알려주세요
              </label>
              <span className="text-red200 text-body-2-normal font-medium">*</span>
            </div>
            <textarea
              id="review"
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
                methods.setValue('review', e.target.value);
              }}
              className="w-full h-40 rounded-xl px-4 py-[18px] bg-background400 resize-none outline-none"
              placeholder="모임의 장소, 환경, 진행, 구성 등 만족스러웠나요?"
            />
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full h-14 mb-5 rounded-2xl py-[17px] text-body-1-nomal font-semibold
              ${isFormValid ? 'bg-orange200 text-white' : 'bg-gray950 text-gray600'} outline-none`}
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
    </>
  );
}
