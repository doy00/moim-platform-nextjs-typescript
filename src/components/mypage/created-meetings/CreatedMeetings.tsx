'use client';

import GatheringCard from '@/components/mypage/created-meetings/gatheringCard/GatheringCard';
import { IGathering } from '@/types/gathering.type';
import { useEffect, useState } from 'react';
import { getGatherings } from '@/apis/gatherings';
import { getUserInfo } from '@/apis/getUserInfo';

export default function CreatedMeetings() {
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

  return (
    <div>
      {gatherings.map((gathering) => (
        <GatheringCard key={gathering.id} gathering={gathering} />
      ))}
    </div>
  );
}
