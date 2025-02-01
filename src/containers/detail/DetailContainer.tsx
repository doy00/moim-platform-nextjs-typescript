'use client';
import { useState } from 'react';
import { useAuth } from '@/hooks/auth/auth.hook';
import { useMoimDetail } from '@/hooks/detail/useMoimDetail';
import { useJoinMoim } from '@/hooks/detail/useJoinMoim';
import { useLikeMoim } from '@/hooks/detail/useLikeMoim';
import DetailPresenter from '@/components/detail/DetailPresenter';
import { SignInDialog } from '@/components/detail/SignInDialog';
import { IReview } from '@/types/detail/t-moim';
interface IDetailContainerProps {
  moimId: string;
}

export default function DetailContainer({ moimId }: IDetailContainerProps) {
  const { me, isMeLoading } = useAuth();    // 로그인 상태 확인
  const { detail: processedData, isLoading, error } = useMoimDetail(moimId, { enabled: !isMeLoading });


  // 로그인 상태 확인
  const [showDialog, setShowDialog] = useState(false);

  // 찜하기 버튼 핸들러
  const handleLike = () => {
    if (!me) {
      setShowDialog(true);
      return;
    }
    // [ ] 로그인된 경우 찜 토글
    // handleToggleLike();
    // 
  };

  // 신청하기 버튼 핸들러
  const handleJoin = () => {
    // joinMoim(moimId);
  };


  // 모임 신청하기, 찜하기 커스텀 훅 사용
  // const { isLiked, handleToggleLike } = useLikeMoim(moimId);
  const { joinMoim, isJoining, error: joinError } = useJoinMoim({});
  if (joinError) return <div>{joinError.message}</div>;

  
  // const { fetchFavorites, favorites } = useFavoriteStore();
  // [ ] 로그인 된 경우에만 찜 목록 가져오기
  // useEffect(() => {
  //   if (me) {
  //   fetchFavorites();
  //   }
  // }, [fetchFavorites, me]);

  // useEffect(() => {
  //   // 현재 모임 찜 상태 디버깅
  //   console.log('현재 모임 찜 상태:', isLiked, '모임ID:', moimId, '전체 찜:', Array.from(favorites));

  // }, [isLiked, moimId, favorites]);

  
  return (
    <div>
      <DetailPresenter 
        data={processedData}
        participants={[]} // 임시로 빈 배열 data?.participantsMoims
        reviews={processedData?.reviews}
        isJoining={false} // 임시로 false
        isLiked={false}   // 임시로 false
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

