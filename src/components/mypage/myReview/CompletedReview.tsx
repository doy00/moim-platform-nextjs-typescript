import { ReviewCard, ReviewSkeleton } from '@/components/mypage/myReview/ReviewCard';
import Image from 'next/image';
import { useReviewQuery } from '@/hooks/mypage/queries/useReviewQuery';

export default function CompletedReview() {
  const { data, isLoading } = useReviewQuery();

  if (isLoading) {
    return <ReviewSkeleton />;
  }

  console.log(data);

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <Image src="/images/mypage/dudu-empty.svg" alt="empty" width={180} height={180} />
          <p className="text-body-2-reading text-gray300">아직 작성한 리뷰가 없어요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
      {/* TODO : 고유식별자 reviewId가 없어 임시로 index로 지정 */}
      {data.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  );
}
