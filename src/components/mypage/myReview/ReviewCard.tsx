import Image from 'next/image';
import profileDefault from '../../../../public/images/mypage/profile-default.svg';
import { IReview } from '@/types/reviews.type';

interface Props {
  review: IReview;
}

const ReviewWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col bg-background100 rounded-xl px-4 py-[18px] gap-3">{children}</div>
);

export function ReviewCard({ review }: Props) {
  return (
    <ReviewWrapper>
      <div className="flex flex-col gap-1">
        <span>{review?.score}</span>
        <div className="flex items-center justify-start gap-2">
          <span className="font-normal text-caption-normal text-gray300 ">
            {review?.Gathering?.name}
          </span>
          <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
          <span className="font-normal text-caption-normal text-gray300 ">
            {new Date(review?.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <span className="font-normal text-label-reading text-gray400">{review?.comment}</span>
      <div className="flex items-center justify-end gap-2">
        <Image src={review?.User?.image ?? profileDefault} alt="profile" width={24} height={24} />
        <div className="flex justify-between items-center gap-2">
          <span className="font-normal text-caption-normal text-gray300">{review?.User?.name}</span>
          <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
          <span className="font-normal text-caption-normal text-gray300">
            {new Date(review?.createdAt).toLocaleDateString()}
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
