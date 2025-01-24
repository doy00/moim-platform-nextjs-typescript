'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/auth/auth.hook';
import { useMoimDetail } from '@/hooks/detail/useMoimDetail';
import { useJoinMoim } from '@/hooks/detail/useJoinMoim';
import { useLikeMoim } from '@/hooks/detail/useLikeMoim';
import DetailPresenter from '@/components/detail/DetailPresenter';
import { SignInDialog } from '@/components/detail/SignInDialog';
// import { IParticipant } from '@/types/detail/i-participant';

interface IDetailContainer {
  moimId: number;
  token?: string;
}

export default function DetailContainer({ moimId, token }: IDetailContainer) {
  const { detail: detailData, isLoading, error } = useMoimDetail(moimId, token);

  // 로그인 상태 확인
  const { me, isMeLoading } = useAuth();    // useAuth 사용
  const [showDialog, setShowDialog] = useState(false);

  const handleAuthCheck = (action: () => void) => {
    if (!me) {
      if (typeof window !== 'undefined') {
        // 로그인 후 보고있던 페이지로 이동하기 위해 현재 Path 저장
        const currentPath = window.location.pathname;
        localStorage.setItem('redirect-after-signin', currentPath);
      }
    setShowDialog(true);
    // setTimeout(() => setShowDialog(true), 0);   // [ ] ForwardRef 컴포넌트 상태 업데이트 문제 해결
    return;
    }
    action();
  };

  // 신청하기 버튼 핸들러
  const handleJoin = () => {
    handleAuthCheck(() => joinMoim(moimId));
    // joinMoim(moimId);
  };

  // 찜하기 버튼 핸들러
  const handleLike = () => {
    handleAuthCheck(toggleLike);
  };

  // 모임 신청하기, 찜하기 커스텀 훅 사용
  const { joinMoim, isJoining, error: joinError } = useJoinMoim({
    // onSuccess: () => {
    //   // 토스트 메시지
    //   toast.success('모임 신청이 완료되었습니다.');
    });
  if (joinError) return <div>{joinError.message}</div>;

  const { isLiked, isProcessing, toggleLike } = useLikeMoim(moimId);
  
  // 로딩 상태 처리
  if (isLoading) return <div>Loading...</div>;
  // 에러 상태 처리
  if (error) return <div>Error: {error.message}</div>;

  // 데이터 처리 로직
  const processedData = detailData ? {
    ...detailData,
    location: `${detailData.si} ${detailData.district} ${detailData.roadAddress}`,  // 모임 장소 지역
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
        participants={[]} // 임시로 빈 배열
        reviews={processedData?.reviews} // 임시로 undefined
        isJoining={false} // 임시로 false
        isLiked={isLiked} // 임시로 false
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

