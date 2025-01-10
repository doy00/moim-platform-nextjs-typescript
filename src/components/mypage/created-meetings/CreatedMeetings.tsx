import GatheringCard from '@/components/mypage/created-meetings/gatheringCard/GatheringCard';
import { IGathering } from '@/types/gathering.type';
import { useEffect, useState } from 'react';
import { getGatherings } from '@/apis/gatherings';
import { getUserInfo } from '@/apis/userInfo';
import Image from 'next/image';
import emptyDudu from '../../../../public/images/mypage/dudu-empty.svg';

import { useRouter } from 'next/navigation';
export default function CreatedMeetings() {
  const router = useRouter();
  const [gatherings, setGatherings] = useState<IGathering[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserInfo();
      setUserId(data.id);
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchGatherings = async () => {
      const data = await getGatherings();
      const filteredData = data.filter((gathering) => gathering.createdBy === userId);
      setGatherings(filteredData);
    };
    fetchGatherings();
  }, [userId]);

  const handleCreateGathering = () => {
    router.push('/gatherings');
  };

  return (
    <div className="flex flex-col gap-4">
      {gatherings.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full gap-6">
          <div className="flex flex-col justify-center items-center gap-4">
            <Image src={emptyDudu} alt="empty" width={180} height={180} />
            <div className="flex flex-col justify-center items-center ">
              <p className="text-body-2-reading text-gray300">아직 만든 모임이 없어요</p>
              <p className="text-body-2-reading text-gray300">새로운 모임을 만들어보세요</p>
            </div>
          </div>
          <button className="rounded-xl bg-gray950 px-5 py-2">
            <span
              className="font-semibold text-label-normal text-gray50"
              onClick={handleCreateGathering}
            >
              모임 개설하기
            </span>
          </button>
        </div>
      ) : (
        gatherings.map((gathering) => <GatheringCard key={gathering.id} gathering={gathering} />)
      )}
    </div>
  );
}
