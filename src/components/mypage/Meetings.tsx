import { GatheringCard, GatheringSkeleton } from '@/components/mypage/gatheringCard/GatheringCard';
import Image from 'next/image';
import emptyDudu from '@images/mypage/dudu-empty.svg';
import { useMyMoimQuery } from '@/hooks/mypage/queries/useMoimsQuery';
import { IMyMoim } from '@/types/mypage/moim.type';

export default function Meetings() {
  const { data, isLoading } = useMyMoimQuery();

  if (isLoading) {
    return <GatheringSkeleton />;
  }

  console.log(data);

  if (!data?.data || data?.data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <Image src={emptyDudu} alt="empty" width={180} height={180} priority />
          <p className="text-body-2-reading text-gray300">아직 내 모임이 없어요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
      {data.data.map((moim) => (
        <GatheringCard key={moim.moimId} moim={moim} />
      ))}
    </div>
  );
}
