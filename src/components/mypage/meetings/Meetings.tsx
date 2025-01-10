'use client';

import GatheringCard from '@/components/mypage/created-meetings/gatheringCard/GatheringCard';
import Image from 'next/image';
import emptyDudu from '../../../../public/images/mypage/dudu-empty.svg';
import { useJoinedGatheringsQuery } from '@/hooks/mypage/queries/useGatheringsQuery';

export default function Meetings() {
  const { data, isLoading } = useJoinedGatheringsQuery();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <Image src={emptyDudu} alt="empty" width={180} height={180} />
          <p className="text-body-2-reading text-gray300">아직 내 모임이 없어요</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {data.map((gathering) => (
        <GatheringCard key={gathering.id} gathering={gathering} />
      ))}
    </div>
  );
}
