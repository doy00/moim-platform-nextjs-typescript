import { GatheringCard, GatheringSkeleton } from '@/components/mypage/gatheringCard/GatheringCard';
import Image from 'next/image';
import emptyDudu from '../../../public/images/mypage/dudu-empty.svg';
import Link from 'next/link';
import { useCreatedGatheringsQuery } from '@/hooks/mypage/queries/useGatheringsQuery';
import { motion } from 'framer-motion';

export default function CreatedMeetings() {
  const { data, isLoading } = useCreatedGatheringsQuery();

  if (isLoading) {
    return <GatheringSkeleton />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <Image src={emptyDudu} alt="empty" width={180} height={180} />
          <p className="text-body-2-reading text-gray300">아직 만든 모임이 없어요</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Link href="/gatherings" className="rounded-xl bg-gray950 px-5 py-2">
            <span className="font-semibold text-label-normal text-gray50">모임 개설하기</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
      {data.map((gathering) => (
        <GatheringCard key={gathering.id} gathering={gathering} />
      ))}
    </div>
  );
}
