'use client';

import { GatheringCard } from '@/components/mypage/gatheringCard/GatheringCard';
import { IGathering } from '@/types/gathering.type';
import { IUser } from '@/types/user';
import Image from 'next/image';
import close from '../../../../public/images/mypage/close.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  gathering: IGathering;
  user: IUser;
}

export default function CreateReview({ gathering, user }: Props) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setShowModal(true);
  };

  console.log('유저 정보:', user);
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
          님<br /> 이번 모임에 대한 리뷰를 작성해주세요.
        </span>
      </div>
      <div>
        <GatheringCard gathering={gathering} />
      </div>
      <div className="flex flex-col gap-6">
        <span>모임은 어땠나요?</span>
        <div className="flex gap-7 justify-center">
          <button>그냥그래요</button>
          <button>괜찮아요</button>
          <button>추천해요</button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <span>구체적인 경험을 알려주세요</span>
        <textarea
          className="w-full h-40 rounded-xl px-4 py-[18px] bg-background400 resize-none"
          placeholder="모임의 장소, 환경, 진행, 구성 등 만족스러웠나요?"
        />
      </div>

      <div className="flex flex-col gap-6">
        <span>모임 관련 사진이 있나요?</span>
        <button className="w-full h-[140px] rounded-xl bg-background400">사진 추가</button>
      </div>

      <button className="w-full h-14 rounded-2xl bg-gray950 py-[17px] text-gray600 font-semibold text-body-1-nomal">
        작성완료
      </button>

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
