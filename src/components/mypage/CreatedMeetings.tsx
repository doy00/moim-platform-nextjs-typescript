import { GatheringCard, GatheringSkeleton } from '@/components/mypage/gatheringCard/GatheringCard';
import Image from 'next/image';
import Link from 'next/link';
import { useMyMoimQuery } from '@/hooks/mypage/queries/useMoimsQuery';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function CreatedMeetings({
  filter,
  isConfirmed,
}: {
  filter: string;
  isConfirmed: boolean;
}) {
  const { data, isLoading, refetch } = useMyMoimQuery();

  const filteredData = useMemo(() => {
    if (!data) return data;

    console.log(
      'CreatedMeetings Data Structure:',
      data.map((moim) => ({
        moimId: moim.moimId,
        status: moim.status,
        isConfirmed: moim.isConfirmed,
      })),
    );

    return data.filter((moim) => {
      if (isConfirmed && !moim.isConfirmed) return false;

      if (filter === '전체') return true;
      if (filter === '모집중') return moim?.isConfirmed === false;
      if (filter === '모집완료')
        return moim?.maxParticipants === moim?.participants && moim?.status !== 'END';
      if (filter === '종료') return moim?.status === 'END';
      return true;
    });
  }, [data, filter, isConfirmed]);

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 max-w-[960px] 2xl:grid 2xl:grid-cols-2 ">
        <GatheringSkeleton />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <Image
            src="/images/mypage/dudu-empty.svg"
            alt="empty"
            width={180}
            height={180}
            priority
          />
          <p className="text-body-2-reading text-gray300">아직 만든 모임이 없어요</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Link href="/make" className="rounded-xl bg-gray950 px-5 py-2">
            <span className="font-semibold text-label-normal text-gray50">모임 개설하기</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 max-w-[960px] 2xl:grid 2xl:grid-cols-2 ">
        {filteredData?.map((moim) => (
          <div key={moim.moimId} className="relative">
            <GatheringCard moim={moim} refetch={refetch} hideStatus={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
