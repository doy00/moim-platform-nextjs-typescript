'use client';
import React from 'react';
import { ChipSmallSquircle } from '../detail/ChipSmallSquircle';
import { HeartIcon } from '../detail/icons/HeartIcon';
import { Separator } from '../ui/separator';
import { formatDate } from '@/utils/detail/date';
import { getMoimTypeText } from '@/utils/detail/enums';
import { IMoimDetail } from '@/types/detail/t-moim';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useVisibleCard } from '@/hooks/mylike/useVisibleCard';

interface IStatusInfo {
  text: string;
  variant: 'end' | 'cardTag';
}

interface IMyLikeCardProps {
  moim: IMoimDetail;
  onClick: () => void;
  onRemoveLike: (e: React.MouseEvent) => void;
  isPriority: boolean;
}

export default function MyLikeCard({ moim, onClick, onRemoveLike, isPriority=false }: IMyLikeCardProps) {
  const {
    moimId,
    moimType,
    title,
    address,
    startDate,
    endDate,
    recruitmentDeadline,
    participants,
    minParticipants,
    maxParticipants,
    status,
    likes,
  } = moim;
  const { ref, isVisible } = useVisibleCard();
  const isConfirmed = participants >= minParticipants;
  const getStatusInfo = (status: string, maxParticipants: number, participants: number, isConfirmed: boolean): IStatusInfo => {
    if (status === 'END') {
      return {
        text: '종료',
        variant: 'end'
      };
    } else if (maxParticipants === participants) {
      return {
        text: '모집완료',
        variant: 'cardTag'
      };
    } else if (isConfirmed === false) {
      return {
        text: '모집 중',
        variant: 'cardTag'
      };
    };
    return {
      text: '모집 중',
      variant: 'cardTag'
    };
  }
  const statusInfo = getStatusInfo(status, maxParticipants, participants, isConfirmed);

  return (
    <motion.div
      ref={ref}
      role="button"
      aria-label={`${title} 모임 상세 보러가기`}
      onClick={onClick}  
      className="relative flex flex-col w-full items-start bg-white rounded-2xl shadow-sm cursor-pointer transition-all hover:shadow-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.2,
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
    >
      <div className="flex items-center p-4 lg:p-0 lg:px-6 lg:py-7 w-full">
        <div className="flex gap-5 items-start w-full">
          <div className="w-9 h-9">
            <Image
              src={`/svgs/ic_color-${moimType}.svg`}
              alt={`${moimType} 모임 아이콘`}
              width={36}
              height={36}
              // priority
              priority={isPriority}
              // loading="lazy"
              loading={isPriority || isVisible ? undefined : "lazy"} // 화면에 보이는 경우에는 일반 로딩, 나머지는 지연 로딩
            />
          </div>
          <div className="flex flex-col flex-1">
            {/* 태그, 찜 버튼 */}
            <div className="flex flex-col">
              <div className="flex justify-between items-start">
                <div className="flex gap-1 flex-wrap" aria-label="모임 상태">
                  <ChipSmallSquircle text={getMoimTypeText(moimType)} variant="cardTag" />
                  {isConfirmed && ( <ChipSmallSquircle text="개설확정" variant="dark" /> )}
                  {statusInfo  && ( <ChipSmallSquircle variant={statusInfo.variant} text={statusInfo.text} /> )}
                </div>

                {/* 찜버튼 */}
                <button
                  onClick={onRemoveLike}
                  aria-label="찜하기 취소"
                  className="p-1 hover:bg-gray50 rounded-full transition-colors"
                >
                  <HeartIcon />
                </button>
              </div>

              {/* 모임 타이틀, 장소 */}
              <div className="flex flex-col">
                <h3 className="text-body-1-normal font-medium pt-2 lg:pt-3">
                  {title}
                </h3>
                <div className="text-label-normal text-gray400 flex pt-1 lg:pt-2">
                  <span>
                  {address || '온라인으로 진행합니다'}
                  </span>
                  <span className="mx-2 text-gray300 flex flex-shrink-0 items-center">
                    <Separator orientation="vertical" className="h-2 bg-gray200" aria-hidden="true" />
                  </span>
                  <span className="flex-shrink-0" aria-label={`${participants}명 참여`}>
                  {`${participants}명 참여`}
                  </span>
                </div>
              </div>

                {/* 날짜 */}
                <div className="text-caption-normal text-gray500 font-medium pt-3 lg:pt-5" aria-label={`모임 기간: ${formatDate(startDate)}부터 ${formatDate(endDate)}까지`}>
                  {`${formatDate(startDate)} - ${formatDate(endDate)}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
  );
}
