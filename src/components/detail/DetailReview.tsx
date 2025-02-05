import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/detail/cn";
import { IReview } from "@/types/detail/t-moim";
import { TReviewClient } from "@/types/supabase/supabase-custom.type";
import { DEFAULT_IMAGE } from "@/constants/detail/detail.const";
import { DuduEmpty } from "./icons/DuduEmpty";
import { ChipSmallRound } from "./ChipSmallRound";
import { formatDate } from "@/utils/detail/date";
import { getRate, getRateVariant } from "@/utils/detail/enums";

// export const MOCK_REVIEWS: IReviewWithUser[] = [
//   {
//     id: '1',
//     moim_uuid: 'moim1',
//     user_uuid: 'user1',
//     rate: 'RECOMMEND',
//     review: '팀원분들이 너무 열정적이셔서 좋았어요! 다음에도 같이 하고 싶네요.',
//     created_at: '2024-02-01T09:00:00Z',
//     updated_at: '2024-02-01T09:00:00Z',
//     users: {
//       id: 'user1',
//       nickname: '열정개발자',
//       email: 'dev1@example.com',
//       image: null,
//       position: 'FRONTEND',
//       introduction: '프론트엔드 개발자입니다.',
//       tags: ['React', 'TypeScript'],
//       created_at: '2024-01-01T00:00:00Z',
//       updated_at: '2024-01-01T00:00:00Z'
//     }
//   },
//   {
//     id: '2',
//     moim_uuid: 'moim1',
//     user_uuid: 'user2',
//     rate: 'GOOD',
//     review: '다양한 의견을 나눌 수 있어서 유익했습니다. 시간이 조금 부족했네요.',
//     created_at: '2024-02-02T15:30:00Z',
//     updated_at: '2024-02-02T15:30:00Z',
//     users: {
//       id: 'user2',
//       nickname: '기획왕',
//       email: 'pm1@example.com',
//       image: null,
//       position: 'PM',
//       introduction: '서비스 기획자입니다.',
//       tags: ['기획', 'UX'],
//       created_at: '2024-01-02T00:00:00Z',
//       updated_at: '2024-01-02T00:00:00Z'
//     }
//   },
//   {
//     id: '3',
//     moim_uuid: 'moim1',
//     user_uuid: 'user3',
//     rate: 'SOSO',
//     review: '온라인으로 진행되어 아쉬웠지만, 새로운 경험이었습니다.',
//     created_at: '2024-02-03T18:45:00Z',
//     updated_at: '2024-02-03T18:45:00Z',
//     users: {
//       id: 'user3',
//       nickname: '디자인고수',
//       email: 'designer1@example.com',
//       image: null,
//       position: 'DESIGNER',
//       introduction: 'UI/UX 디자이너입니다.',
//       tags: ['Figma', 'Design'],
//       created_at: '2024-01-03T00:00:00Z',
//       updated_at: '2024-01-03T00:00:00Z'
//     }
//   }
// ];

export const MOCK_REVIEWS: IReview[] = [
  {
    userUuid: 'user1',
    review: '팀원분들이 너무 열정적이셔서 좋았어요! 다음에도 같이 하고 싶네요.',
    rate: 'RECOMMEND',
    userNickname: '열정개발자',
    userEmail: 'dev1@example.com',
    userImage: null,
  }
];

// 모임 리뷰 리스트에 들어갈 리뷰 아이템 컴포넌트
interface IReviewItemProps {
  review: TReviewClient;
  className?: string;
}

const ReviewItem: React.FC<IReviewItemProps> = ({ review, className }) => {
  // 작성자 이미지 로딩 실패시 기본 이미지를 보여줌
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DEFAULT_IMAGE.PROFILE;
  };
  return (
    <div
      className={cn("relative flex flex-col min-h-[124px] gap-3 px-4 py-[18px] lg:px-6 lg:py-7 mt-4 bg-background400 rounded-2xl", className)}
    >
        {/* 감정표현 칩 */}
        <div className="flex gap-0.5">
          <ChipSmallRound 
            // variant="soso"
            variant={getRateVariant(review.rate)}
            text={getRate(review.rate)}
          />
        </div>

        {/* 후기 텍스트 */}
        <p className="text-label-reading text-gray400 truncate">
          {review.review}
        </p>
      
        {/* 리뷰 작성자 정보*/}
        <div className="flex items-center justify-end gap-2">
          {/* 작성자 프로핊사진 */}
            <div className="h-6 w-6 overflow-hidden rounded-full">
              <Image 
                src={review.userImage || DEFAULT_IMAGE.PROFILE}
                alt={`${review.userNickname}의 프로필`}
                className="h-full w-full object-cover"
                width={6}
                height={6}
                onError={handleImageError}
              />
          </div>

          {/* 작성자 이름 */}
          <div className="flex items-center gap-2 text-caption-normal text-gray300">
            <span>{review.userNickname}</span>
            <div className="h-2 w-px bg-gray200"></div>
            {/* <span>{formatDate(review.created_at)}</span> */}
          </div>

        </div>
    </div>
  );
};

// 리뷰 아이템들을 포함한 리뷰 섹션 컴포넌트
interface IDetailReviewProps {
  reviews: TReviewClient[];
  totalReviews: number
  className?: string;
}
export const DetailReview: React.FC<IDetailReviewProps> = ({ 
  reviews,
  totalReviews,
  className,
  }) => {    
    console.log('Reviews data:', reviews); // 데이터 확인

  /// 리뷰 아이템 추가 로드
  // 한 페이지에 보여줄 리뷰 개수
  const REIVEW_ITEMS_PER_PAGE = 3;
  // 현재 보여줄 리뷰 개수 상태
  const [visibleCount, setVisibleCount] = useState(REIVEW_ITEMS_PER_PAGE);
  // 현재 보여줄 리뷰들 개수만큼 슬라이스
  const visibleReivews = reviews.slice(0, visibleCount);
  // 더 보여줄 리뷰가 있는지 확인
  const hasMoreReivews = visibleCount < reviews.length;
  // '후기 더보기' 버튼
  const handleLoadMore = () => {setVisibleCount(prev => prev + REIVEW_ITEMS_PER_PAGE)};

    // 리뷰가 없을 때의 빈 화면 UI
        if (!reviews || reviews.length === 0) {
          return (
            <div className="relative flex flex-col">
              {/* 타이틀 */} 
                  <div className="relative w-fit mt-4 lg:mt-8 px-2 font-semibold text-gray800 text-body-1-reading">
                    {"모임 후기"}
                    <span className="ml-2 text-orange200">
                      {reviews.length}
                    </span>
                  </div>
                {/* 빈 화면 UI */}
                <div className="relative flex flex-col items-center justify-center py-16">
                  <DuduEmpty />
                  <p className="mt-4 text-gray400 text-caption-normal">
                    아직 작성된 리뷰가 없어요
                  </p>
                </div>
            </div>
          );
        }
        // 리뷰가 있을 때 UI
        return (
          <div className="relative flex flex-col">
            {/* 타이틀 */}
            <div className="relative w-fit mt-5 lg:mt-8 px-2 font-semibold text-gray800 text-body-1-reading">
              {"모임 후기"}
              <span className="ml-2 text-orange200">
                {reviews.length}
              </span>
            </div>

          {/* 리뷰 리스트 */}
          <div>
            {visibleReivews.map((review, index) => (
              <ReviewItem key={index} review={review} className={className} />
            ))}
          </div>

            <button 
              onClick={handleLoadMore}
              className="mt-6 w-full h-12 rounded-[14px] py-[14px] text-body-2-normal font-semibold text-gray400 bg-gray100"
              disabled={!hasMoreReivews}
            >
              후기 더보기
            </button>

          </div>
        )
  }