'use client';

import { useState } from 'react';
import Meetings from '@/components/mypage/Meetings';
import CreatedMeetings from '@/components/mypage/CreatedMeetings';
import FilterBar from '@/components/mypage/filterBar/FilterBar';
import MyReview from '@/components/mypage/myReview/MyReview';
import { motion, AnimatePresence } from 'framer-motion';
import ReviewTabs from '@/components/mypage/myReview/ReviewTabs';

export default function RenderTab() {
  const [activeTab, setActiveTab] = useState('meetings');

  const renderTab = () => {
    return (
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full"
          >
            {activeTab === 'meetings' ? (
              <Meetings />
            ) : activeTab === 'reviews' ? (
              <MyReview />
            ) : (
              <CreatedMeetings />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 px-3">
      <div className="flex px-4 justify-evenly items-center">
        <button
          className={`w-1/3 py-3.5 px-4 font-semibold text-sm ${
            activeTab === 'meetings' ? 'border-b-2 border-[#4A4642] ' : 'text-[#C1BDB8] '
          }`}
          onClick={() => setActiveTab('meetings')}
        >
          내 모임
        </button>
        <button
          className={`w-1/3 py-3.5 px-4 font-semibold text-sm ${
            activeTab === 'created-meetings' ? 'border-b-2 border-[#4A4642] ' : 'text-[#C1BDB8]'
          }`}
          onClick={() => setActiveTab('created-meetings')}
        >
          만든 모임
        </button>
        <button
          className={`w-1/3 py-3.5 px-4 font-semibold text-sm ${
            activeTab === 'reviews' ? 'border-b-2 border-[#4A4642] ' : 'text-[#C1BDB8]'
          }`}
          onClick={() => setActiveTab('reviews')}
        >
          내 리뷰
        </button>
      </div>
      {(activeTab === 'meetings' || activeTab === 'created-meetings') && <FilterBar />}
      {activeTab === 'reviews' && <ReviewTabs />}
      {renderTab()}
    </div>
  );
}
