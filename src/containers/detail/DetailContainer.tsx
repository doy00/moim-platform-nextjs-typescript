'use client';

import { useMoimDetail } from '@/hooks/detail/useMoimDetail';
import { useJoinMoim } from '@/hooks/detail/useJoinMoim';
import { useLikeMoim } from '@/hooks/detail/useLikeMoim';
import DetailPresenter from '@/components/detail/DetailPresenter';
import { SignInDialog } from '@/components/detail/SignInDialog';
import { IParticipant } from '@/types/detail/i-participant';
import { useState } from 'react';
import { useCheckAuth, getLocalStorageItem } from '@/hooks/detail/useCheckAuth';

interface IDetailContainer {
  id: number;
}

// mock participants
const participants: IParticipant[] = [
  {
    teamId: 1,
    userId: 1,
    gatheringId: 1,
    joinedAt: new Date().toISOString(),
    User: {
      id: 1,
      email: "user1@example.com",
      name: "User 1",
      companyName: "Company A",
      image: "/svgs/profile.svg"
    }
  },
  {
    teamId: 1,
    userId: 2,
    gatheringId: 1,
    joinedAt: new Date().toISOString(),
    User: {
      id: 2,
      email: "user2@example.com",
      name: "User 2",
      companyName: "Company B",
      image: "/svgs/profile.svg"
    }
  },
  {
    teamId: 1,
    userId: 3,
    gatheringId: 1,
    joinedAt: new Date().toISOString(),
    User: {
      id: 3,
      email: "user3@example.com",
      name: "User 3",
      companyName: "Company C",
      image: "/svgs/profile.svg"
    }
  },
  {
    teamId: 1,
    userId: 4,
    gatheringId: 1,
    joinedAt: new Date().toISOString(),
    User: {
      id: 4,
      email: "user4@example.com",
      name: "User 4",
      companyName: "Company D",
      image: "/svgs/profile.svg"
    }
  },
  {
    teamId: 1,
    userId: 5,
    gatheringId: 1,
    joinedAt: new Date().toISOString(),
    User: {
      id: 5,
      email: "user5@example.com",
      name: "User 5",
      companyName: "Company E",
      image: "/svgs/profile.svg"
    }
  },
  {
    teamId: 1,
    userId: 6,
    gatheringId: 1,
    joinedAt: new Date().toISOString(),
    User: {
      id: 6,
      email: "user6@example.com",
      name: "User 6",
      companyName: "Company F",
      image: "/svgs/profile.svg"
    }
  },
];

export default function DetailContainer({ id }: IDetailContainer) {
  const { detail: detailData, isLoading, error } = useMoimDetail(id);

  // 모임 신청하기, 찜하기 클릭시 로그인 확인 
  const { checkAuthAndExecute } = useCheckAuth();  
  const [showDialog, setShowDialog] = useState(false);

  // 로그인 상태 확인 및 액션 처리
  const handleAuthAction = (action: () => void) => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') return;

    const token = getLocalStorageItem('dothemeet-token');
    
    if (!token) {
      // 현재 URL 저장 (로그인 후 리다이렉트용)
      const currentPath = window.location.pathname;
      localStorage.setItem('redirect-after-login', currentPath);
      
      setTimeout(() => setShowDialog(true), 0);   // [ ] ForwardRef 컴포넌트 상태 업데이트 문제 해결
      return;
    }

    action();
  };

  // 신청하기 버튼 핸들러
  const handleJoin = () => {
    handleAuthAction(() => joinMoim(id));
    // joinMoim(id);
  };

  // 찜하기 버튼 핸들러
  const handleLike = () => {
    handleAuthAction(toggleLike);
    // toggleLike();
  };

  // 모임 신청하기, 찜하기 커스텀 훅 사용
  const { joinMoim, isJoining, error: joinError } = useJoinMoim({
    // onSuccess: () => {
    //   // 토스트 메시지
    //   toast.success('모임 신청이 완료되었습니다.');
    });
  if (joinError) return <div>{joinError.message}</div>;

  const { isLiked, isProcessing, toggleLike } = useLikeMoim(id);
  
  // 로딩 상태 처리
  if (isLoading) return <div>Loading...</div>;
  // 에러 상태 처리
  if (error) return <div>Error: {error.message}</div>;

  // 데이터 처리 로직
  const processedData = detailData ? {
    ...detailData,
    location: `${detailData.si} ${detailData.district} ${detailData.roadAddress}`,  // 지역 데이터
    dateTime:detailData.startDate,    // 모집 시작 날짜
    registratonEnd: detailData.endDate,  // 모집 마감 날짜
    participantCount: detailData.participants,  // 참여 인원 수
    capacity: detailData.maxParticipants,       // 정원
    // 이미지 관련 코드 - 보류
    // image: detailData.image
    //   ? `${process.env.NEXT_PUBLIC_API_URL}/${detailData.image}`
    //   : DEFAULT_IMAGE.MOIM
  } : undefined;

  return (
    <div>
      <DetailPresenter 
        data={processedData}
        participants={participants} // 임시로 빈 배열
        reviews={processedData?.reviews} // 임시로 undefined
        isJoining={false} // 임시로 false
        isLiked={false} // 임시로 false
        onJoin={handleJoin} // 임시로 빈 함수
        onLikeToggle={handleLike} // 임시로 빈 함수
      />
      <SignInDialog 
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
}

