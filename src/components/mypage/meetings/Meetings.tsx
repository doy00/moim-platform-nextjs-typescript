import GatheringCard from '@/components/mypage/created-meetings/gatheringCard/GatheringCard';
import { IJoind } from '@/types/gathering.type';
import { getJoined } from '@/apis/getJoined';
import { useEffect, useState } from 'react';

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
      {gatheringJoined.map((gathering) => (
        <GatheringCard key={gathering.id} gathering={gathering} />
      ))}
    </div>
  );
}
