'use client';

import GatheringCard from '@/components/mypage/created-meetings/gatheringCard/GatheringCard';
import { IGathering } from '@/types/gathering.type';
import { useEffect, useState } from 'react';
import { getGatherings } from '@/apis/gatherings';

export default function CreatedMeetings() {
  const [gatherings, setGatherings] = useState<IGathering[]>([]);
  // 임시 userId
  const userId = 1006;

  useEffect(() => {
    const fetchGatherings = async () => {
      const data = await getGatherings();
      const filteredData = data.filter((gathering) => gathering.createdBy === userId);
      setGatherings(filteredData);
    };
    fetchGatherings();
  }, [userId]);

  return (
    <div>
      {gatherings.map((gathering) => (
        <GatheringCard key={gathering.id} gathering={gathering} />
      ))}
    </div>
  );
}
