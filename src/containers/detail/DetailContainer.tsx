'use client';
import { useFavoriteStore } from '@/stores/detail/favoriteStore';
import { useState, useEffect } from 'react';
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
  // const [showDialog, setShowDialog] = useState(false);

  const handleAuthCheck = (action: () => void) => {
    if (!me) {
      if (typeof window !== 'undefined') {
        // 로그인 후 보고있던 페이지로 이동하기 위해 현재 Path 저장
        const currentPath = window.location.pathname;
        localStorage.setItem('redirect-after-signin', currentPath);
      }
    // setShowDialog(true);
    return;
    }
    action();
  };

  // 신청하기 버튼 핸들러
  const handleJoin = () => {
    // handleAuthCheck(() => joinMoim(moimId));
    joinMoim(moimId);
  };

  // 찜하기 버튼 핸들러
  const handleLike = () => {
    // handleAuthCheck(handleToggleLike);
    handleToggleLike();
  };

  // 모임 신청하기, 찜하기 커스텀 훅 사용
  const { joinMoim, isJoining, error: joinError } = useJoinMoim({
    });
  if (joinError) return <div>{joinError.message}</div>;

  const { isLiked, handleToggleLike } = useLikeMoim(moimId);
  
  const { fetchFavorites } = useFavoriteStore();
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  useEffect(() => {
    // 디버깅을 위한 로그 추가
    console.log('현재 모임 찜 상태:', isLiked);
  }, [isLiked]);
  // // 로딩 상태 처리
  // if (isLoading) return <div>Loading...</div>;
  // // 에러 상태 처리
  // if (error) return <div>Error: {error.message}</div>;

  // 데이터 처리 로직
  const data = detailData ? {
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
        data={data}
        participants={[]} // 임시로 빈 배열
        reviews={data?.reviews}
        isJoining={false} // 임시로 false
        isLiked={isLiked} // 임시로 false
        onJoin={handleJoin} 
        onLikeToggle={handleLike}
      />
      {/* <SignInDialog 
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      /> */}
    </div>
  );
}

