'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/auth.hook';
import { useMoimDetail } from '@/hooks/detail/useMoimDetail';
import { useJoinMoim } from '@/hooks/detail/useJoinMoim';
import { useLikeMoim } from '@/hooks/detail/useLikeMoim';
import DetailPresenter from '@/components/detail/DetailPresenter';
import { SignInDialog } from '@/components/detail/SignInDialog';
import { ToasterDark } from '@/components/detail/ToasterDark';
import { toast } from 'sonner';

interface IDetailContainerProps {
  moimId: string;
}

export default function DetailContainer({ moimId }: IDetailContainerProps) {
  const { me, isMeLoading } = useAuth();    // 로그인 상태 확인
  const { detail: processedData, isLoading, error } = useMoimDetail(moimId, { enabled: !isMeLoading });
  const { isLiked = false, handleToggleLike } = useLikeMoim(moimId);

  // 로그인 상태 확인
  const [showDialog, setShowDialog] = useState(false);

  // 찜하기 버튼 핸들러
  const handleLike = async () => {
    if (!me) {
      setShowDialog(true);
      return;
    }
    try {
      await handleToggleLike();
      toast.success(
        isLiked ? "찜하기가 취소되었어요" : "찜하기가 완료되었어요"
      );
    } catch (error) {
      toast.error("잠시후 다시 시도해주세요");
    }
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
        participants={processedData?.participantsMoims || []} 
        reviews={processedData?.reviews}
        isJoining={false} // 임시로 false
        isLiked={isLiked}   // 임시로 false
        onJoin={handleJoin} 
        onLikeToggle={handleLike}
      />
      <SignInDialog 
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      />
      <ToasterDark 
        position="bottom-center"
        duration={2000}
      />
    </div>
  );
}

