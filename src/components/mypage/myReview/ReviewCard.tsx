import { IReview } from '@/types/mypage/reviews.type';
import { IMoim } from '@/types/mypage/moim.type';
// import profileDefault from '@images/mypage/profile-default.svg';
// import Image from 'next/image';

interface Props {
  review: IReview;
  moim: IMoim;
}

const ReviewWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col bg-background100 rounded-xl px-4 py-[18px] gap-3">{children}</div>
);

export function ReviewCard({ review, moim }: Props) {
  return (
    <ReviewWrapper>
      <div className="flex flex-col gap-1">
        <span>{review?.rate}</span>
        <div className="flex items-center justify-start gap-2">
          <span className="font-normal text-caption-normal text-gray300 ">{moim?.title}</span>
          <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
          <span className="font-normal text-caption-normal text-gray300 ">
            {/* //리뷰 작성 날짜 추가 필요 */}
            {new Date(moim?.startDate).toLocaleDateString()}
          </span>
        </div>
      </div>
      <span className="font-normal text-label-reading text-gray400">{review?.review}</span>

      {/* api 미완성으로 인해 주석처리 */}
      <div className="flex items-center justify-end gap-2">
        {/* <Image src={review?.User?.image ?? profileDefault} alt="profile" width={24} height={24} /> */}
        <div className="flex justify-between items-center gap-2">
          <span className="font-normal text-caption-normal text-gray300">
            {review?.userNickname}
          </span>
          <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
          <span className="font-normal text-caption-normal text-gray300">
            {/* //리뷰 작성 날짜 추가 필요 */}
            {new Date(moim?.startDate).toLocaleDateString()}
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
