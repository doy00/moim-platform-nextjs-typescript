import CreateReview from '@/components/mypage/myReview/CreateReview';

interface PageProps {
  params: {
    gatheringId: string;
  };
  searchParams: {
    userId: string;
  };
}

export default function Review({ params, searchParams }: PageProps) {
  const { gatheringId } = params;
  const { userId } = searchParams;

  return (
    <div>
      <CreateReview gathering={gatheringId} user={userId} />
      {/* 리뷰페이지 */}
    </div>
  );
}
