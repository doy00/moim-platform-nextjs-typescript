'use client';
import { useFavoriteStore } from '@/stores/detail/favoriteStore';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/auth.hook';
import { useMoimDetail } from '@/hooks/detail/useMoimDetail';
import { useJoinMoim } from '@/hooks/detail/useJoinMoim';
import { useLikeMoim } from '@/hooks/detail/useLikeMoim';
import DetailPresenter from '@/components/detail/DetailPresenter';
import { SignInDialog } from '@/components/detail/SignInDialog';

interface IDetailContainer {
  moimId: number;
  token?: string;
}

export default function DetailContainer({ moimId, token }: IDetailContainer) {
  const { me } = useAuth();    // useAuth 사용
  const { detail: detailData, isLoading, error } = useMoimDetail(moimId, token);


  // 로그인 상태 확인
  const [showDialog, setShowDialog] = useState(false);

  const handleAuthCheck = (action: () => void) => {
    if (!me) {
      if (typeof window !== 'undefined') {
        // 로그인 후 보고있던 페이지로 이동하기 위해 현재 Path 저장
        const currentPath = window.location.pathname;
        localStorage.setItem('redirect-after-signin', currentPath);
      }
      setShowDialog(true);
      return;
    }
    action();
  };

  // 찜하기 버튼 핸들러
  const handleLike = () => {
    handleAuthCheck(handleToggleLike);
    // handleToggleLike();
  };

  // 신청하기 버튼 핸들러
  const handleJoin = () => {
    handleAuthCheck(() => joinMoim(moimId));
    // joinMoim(moimId);
  };


  // 모임 신청하기, 찜하기 커스텀 훅 사용
  const { joinMoim, isJoining, error: joinError } = useJoinMoim({
    });
  if (joinError) return <div>{joinError.message}</div>;

  const { isLiked, handleToggleLike } = useLikeMoim(moimId);
  
  const { fetchFavorites, favorites } = useFavoriteStore();
  // 로그인 된 경우에만 찜 목록 가져오기
  useEffect(() => {
    if (me) {
    fetchFavorites();
    }
  }, [fetchFavorites, me]);

  // useEffect(() => {
  //   // 현재 모임 찜 상태 디버깅
  //   console.log('현재 모임 찜 상태:', isLiked, '모임ID:', moimId, '전체 찜:', Array.from(favorites));

  // }, [isLiked, moimId, favorites]);

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
        isLiked={isLiked} 
        onJoin={handleJoin} 
        onLikeToggle={handleLike}
      />
      <SignInDialog 
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
}

