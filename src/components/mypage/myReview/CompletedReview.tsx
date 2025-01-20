import { ReviewCard, ReviewSkeleton } from '@/components/mypage/myReview/ReviewCard';
import Image from 'next/image';
import { useReviewQuery } from '@/hooks/mypage/queries/useReviewQuery';
import emptyDudu from '../../../../public/images/mypage/dudu-empty.svg';

export default function CompletedReview() {
  const { data, isLoading } = useReviewQuery();

  if (isLoading) {
    return <ReviewSkeleton />;
  }

  if (!data || data.totalItemCount === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <Image src={emptyDudu} alt="empty" width={180} height={180} />
          <p className="text-body-2-reading text-gray300">아직 작성한 리뷰가 없어요</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {data.data.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
