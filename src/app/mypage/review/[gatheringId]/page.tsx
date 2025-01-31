// import CreateReview from '@/components/mypage/myReview/CreateReview';

// interface PageProps {
//   params: {
//     gatheringId: string;
//   };
//   searchParams: {
//     userId: string;
//   };
// }

'use client';
import { LoadingAnimation } from '@/components/mypage/LoadingAnimation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Review() {
  // const { gatheringId } = params;
  // const { userId } = searchParams;

  return (
    <div>
      {/* <CreateReview gathering={gatheringId} user={userId} /> */}
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <LoadingAnimation />
        <p className="text-heading-2 text-gray500">리뷰페이지 개발중입니다</p>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Link href="/mypage" className="rounded-xl bg-gray950 px-5 py-2">
            <span className="font-semibold text-label-normal text-gray50">뒤로가기</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
