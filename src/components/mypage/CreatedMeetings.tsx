import { GatheringCard, GatheringSkeleton } from '@/components/mypage/gatheringCard/GatheringCard';
import Image from 'next/image';
import emptyDudu from '@images/mypage/dudu-empty.svg';
import Link from 'next/link';
import { useMyMoimQuery } from '@/hooks/mypage/queries/useMoimsQuery';
import { motion } from 'framer-motion';
import { mockMoimList } from '@/containers/mypage/TemporaryLogin';
import { enrollMoim } from '@/apis/login';
import { useState } from 'react';

export default function CreatedMeetings() {
  // const { data, isLoading } = useMyMoimQuery();
  const { data: apiData, isLoading, refetch } = useMyMoimQuery();
  const [mockData, setMockData] = useState(mockMoimList);

  // 테스트용 모임 생성 함수
  const handleCreateTestMoim = async () => {
    const mockMoimData = {
      title: '프로젝트 만들어요',
      content: '프로젝트 만들어요',
      address: '서울시 강남구',
      recruitmentDeadline: new Date('2025-02-05'),
      startDate: new Date('2025-02-05'),
      endDate: new Date('2025-02-11'),
      minParticipants: 3,
      maxParticipants: 5,
      moimType: 'PROJECT' as const,
      status: 'RECRUIT' as const,
    };

    const mockImageFile = new File([''], 'mock-image.png', { type: 'image/png' });

    const requestData = {
      moim_json: JSON.stringify(mockMoimData),
      moim_image: mockImageFile,
    };

    try {
      const response = await enrollMoim(requestData);
      console.log('생성된 모임:', response);
      refetch();
    } catch (error) {
      console.error('모임 생성 실패:', error);
      // API 호출 실패 시 목데이터에 추가
      const newMockMoim = {
        moimId: `mock${mockData.length + 1}`,
        ...mockMoimData,
        likes: 0,
        participants: 1,
        reviewsCount: 0,
        participantsMoims: [],
        reviews: [],
      };
      setMockData([...mockData, newMockMoim]);
    }
  };

  if (isLoading) {
    return <GatheringSkeleton />;
  }

  // API 데이터와 목데이터를 합침
  const combinedData = [...(apiData || []), ...mockData];

  if (!combinedData || combinedData.length === 0) {
    // if (!data || data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-6">
        <div className="flex flex-col justify-center items-center gap-4">
          <Image src={emptyDudu} alt="empty" width={180} height={180} priority />
          <p className="text-body-2-reading text-gray300">아직 만든 모임이 없어요</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Link href="/moim/create" className="rounded-xl bg-gray950 px-5 py-2">
            <span className="font-semibold text-label-normal text-gray50">모임 개설하기</span>
          </Link>
        </motion.div>
        <motion.button
          onClick={handleCreateTestMoim}
          className="rounded-xl bg-blue500 px-5 py-2"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <span className="font-semibold text-label-normal text-gray50">테스트 모임 생성</span>
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
      {/* {data.map((moim) => ( */}
      {combinedData.map((moim) => (
        <GatheringCard key={moim.moimId} moim={moim} />
      ))}
    </div>
  );
}
