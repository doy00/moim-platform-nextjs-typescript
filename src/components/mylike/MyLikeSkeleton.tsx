import { Header } from '../detail/Header';
// import { GatheringSkeleton } from '../mypage/gatheringCard/GatheringCard';
import { motion } from 'framer-motion';

export const MyLikeSkeleton = () => {
  return (
    <div className="w-full min-h-screen mx-auto px-4 md:px-20 bg-background200 xs:max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg" aria-label="찜한 모임 목록을 불러오는 중" role="status" aria-live="polite">
      <Header />
      <h1 className="sr-only">찜한 모임 목록 로딩 중</h1>
      <motion.div
        className="flex flex-col gap-4 md:gap-6 lg:grid lg:grid-cols-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </motion.div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl h-36 animate-pulse shadow-sm">
      <div className="flex p-4">
        <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
        <div className="ml-5 flex-1">
          <div className="flex justify-between">
            <div className="flex gap-1">
              <div className="h-5 w-16 bg-gray-200 rounded"></div>
              <div className="h-5 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mt-2"></div>
          <div className="h-3 w-1/2 bg-gray-200 rounded mt-2"></div>
          <div className="h-3 w-1/4 bg-gray-200 rounded mt-3"></div>
        </div>
      </div>
    </div>
  );
}
