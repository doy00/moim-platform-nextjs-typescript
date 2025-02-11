'use client';

import { useState } from 'react';
import PendingReview from './PendingReview';
import CompletedReview from './CompletedReview';
import { AnimatePresence, motion } from 'framer-motion';

type TReviewTab = '작성 가능한 리뷰' | '작성한 리뷰';

export default function ReviewTabs() {
  const [click, setClick] = useState<TReviewTab>('작성 가능한 리뷰');

  const handleClick = (tab: TReviewTab) => {
    setClick(tab);
  };

  const getButtonStyle = (tab: TReviewTab) => {
    return `w-1/2 rounded-xl px-4 py-3  text-label-nomal font-semibold ${
      click === tab ? 'bg-background100 text-gray800' : 'bg-none text-gray300'
    }`;
  };

  const reviewRenderTab = () => {
    return (
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={click}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full"
          >
            {click === '작성한 리뷰' ? <CompletedReview /> : <PendingReview />}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex bg-background400 rounded-2xl p-1">
        <div className="flex justify-between items-center w-full gap-1.5">
          <button
            onClick={() => handleClick('작성 가능한 리뷰')}
            className={getButtonStyle('작성 가능한 리뷰')}
          >
            작성 가능한 리뷰
          </button>
          <button
            onClick={() => handleClick('작성한 리뷰')}
            className={getButtonStyle('작성한 리뷰')}
          >
            작성한 리뷰
          </button>
        </div>
      </div>
      {reviewRenderTab()}
    </div>
  );
}
