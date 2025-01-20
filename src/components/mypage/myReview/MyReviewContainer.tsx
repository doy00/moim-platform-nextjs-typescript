import { useState } from 'react';
import ReviewTabs from './ReviewTabs';
import CompletedReview from './CompletedReview';
import { ReviewCard } from './ReviewCard';

type TReviewTab = '작성 가능한 리뷰' | '작성한 리뷰';

export default function MyReviewContainer() {
  const [activeReviewTab, setActiveReviewTab] = useState<TReviewTab>('작성 가능한 리뷰');

  return (
    <div className="flex flex-col gap-4">
      <ReviewTabs activeTab={activeReviewTab} onTabChange={setActiveReviewTab} />
      <ReviewCard activeTab={activeReviewTab} />
      <CompletedReview />
    </div>
  );
}
