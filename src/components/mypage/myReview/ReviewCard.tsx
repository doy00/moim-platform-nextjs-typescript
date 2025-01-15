import Image from 'next/image';
import profileDefault from '../../../../public/images/mypage/profile-default.svg';
import { IReview } from '@/types/reviews.type';

interface Props {
  review: IReview;
}

export default function ReviewCard({ review }: Props) {
  return (
    <div className="flex flex-col bg-background100 rounded-xl px-4 py-[18px] gap-3">
      <div className="flex flex-col gap-1">
        <span>{review.score}</span>
        <div className="flex items-center justify-start gap-2">
          <span className="font-normal text-caption-normal text-gray300 ">
            {review.Gathering.name}
          </span>
          <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
          <span className="font-normal text-caption-normal text-gray300 ">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <span className="font-normal text-label-reading text-gray400">{review.comment}</span>
      <div className="flex items-center justify-end gap-2">
        <Image src={review.User.image ?? profileDefault} alt="profile" width={24} height={24} />
        <div className="flex justify-between items-center gap-2">
          <span className="font-normal text-caption-normal text-gray300">{review.User.name}</span>
          <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
          <span className="font-normal text-caption-normal text-gray300">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
