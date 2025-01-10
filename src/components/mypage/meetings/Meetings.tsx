import GatheringCard from '@/components/mypage/created-meetings/gatheringCard/GatheringCard';
import { IJoind } from '@/types/gathering.type';
import { getJoined } from '@/apis/getJoined';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import emptyDudu from '../../../../public/images/mypage/dudu-empty.svg';

export default function Meetings() {
  const [gatheringJoined, setGatheringJoined] = useState<IJoind[]>([]);

  useEffect(() => {
    const fetchGatheringJoined = async () => {
      const token = localStorage.getItem('dudemeet-token');
      console.log('저장된 토큰:', token);

      try {
        const data = await getJoined();
        setGatheringJoined(data);
      } catch (error) {
        console.error('모임 조회 실패:', error);
      }
    };
    fetchGatheringJoined();
  }, []);

  return (
    <div>
      {gatheringJoined.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full gap-6">
          <div className="flex flex-col justify-center items-center gap-4">
            <Image src={emptyDudu} alt="empty" width={180} height={180} />
            <p className="text-body-2-reading text-gray300">아직 내 모임이 없어요</p>
          </div>
        </div>
      ) : (
        gatheringJoined.map((gathering) => (
          <GatheringCard key={gathering.id} gathering={gathering} />
        ))
      )}
    </div>
  );
}
