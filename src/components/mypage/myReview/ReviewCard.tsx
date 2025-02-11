import { IReview } from '@/types/mypage/reviews.type';
import Image from 'next/image';
import profileDefault from '@public/images/mypage/profile-default.svg';
import { reviewRateTag } from '@/utils/mypage/statusTags';

interface Props {
  review: IReview;
}

const ReviewWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col bg-background100 rounded-xl px-4 py-[18px] gap-3">{children}</div>
);

const ReviewRateTagColor = ({ rate }: { rate: IReview['rate'] }) => {
  if (rate === 'SOSO') {
    return (
      <span className="h-[26px] bg-background300 px-2 py-1 rounded-[20px] text-caption-normal font-semibold text-red200">
        {reviewRateTag({ rate } as IReview)}
      </span>
    );
  } else if (rate === 'GOOD') {
    return (
      <span className="h-[26px] bg-orange100 px-2 py-1 rounded-[20px] text-caption-normal font-semibold text-orange200">
        {reviewRateTag({ rate } as IReview)}
      </span>
    );
  } else if (rate === 'RECOMMEND') {
    return (
      <span className="h-[26px] bg-olive100 px-2 py-1 rounded-[20px] text-caption-normal font-semibold text-olive200">
        {reviewRateTag({ rate } as IReview)}
      </span>
    );
  }
};

export function ReviewCard({ review }: Props) {
  return (
    <ReviewWrapper>
      <div className="flex flex-col gap-3">
        <div>
          <ReviewRateTagColor rate={review.rate} />
        </div>
        <div className="flex items-center justify-start gap-2">
          <span className="font-normal text-caption-normal text-gray300 ">
            {review?.moims?.title}
          </span>
          <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
          <span className="font-normal text-caption-normal text-gray300 ">
            {/* //리뷰 작성 날짜 추가 필요 */}
            {new Date(review?.moims?.startDate).toLocaleDateString()}
          </span>
        </div>
      </div>
      <span className="font-normal text-label-reading text-gray400">{review?.review}</span>

      <div className="flex items-center justify-end gap-2">
        <Image
          src={review?.userImage ?? profileDefault}
          alt="profile"
          width={24}
          height={24}
          className="rounded-full w-6 h-6"
        />
        <div className="flex justify-between items-center gap-2">
          <span className="font-normal text-caption-normal text-gray300">
            {review?.userNickname}
          </span>
          <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
          <span className="font-normal text-caption-normal text-gray300">
            {/* 리뷰 작성 날짜 추가 필요, 임시로 모임 시작 날짜 출력 */}
            {new Date(review?.moims?.startDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </ReviewWrapper>
  );
}

export function ReviewSkeleton() {
  return (
    <ReviewWrapper>
      <div className="animate-pulse flex flex-col gap-1">
        <div className="h-6 w-16 bg-gray-200 rounded" />
        <div className="flex items-center justify-start gap-2">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="flex items-center justify-end gap-2">
        <div className="w-6 h-6 bg-gray-200 rounded-full" />
        <div className="flex justify-between items-center gap-2">
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
      </div>
    </ReviewWrapper>
  );
}
