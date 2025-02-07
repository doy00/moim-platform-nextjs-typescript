'use client';
import { useState } from 'react';
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
  const { me, signOut, isMeLoading } = useAuth();    // 로그인 상태 확인
  const { data: detail, isLoading: isDetailLoading, error } = useMoimDetail(moimId, { enabled: !isMeLoading });
  const { isLiked, handleToggleLike } = useLikeMoim(moimId);
  const { isJoined, canJoin, handleJoinMoim, isLoading: isJoining } = useJoinMoim(moimId);

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
  const handleJoin = async () => {
    try {
      const result = await handleJoinMoim();
      if (!result.success) {
        toast.info(result.message);
        return;
      }
      toast.success('모임 신청이 완료되었어요');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('잠시후 다시 시도해주세요');
      }
    }
  };

  if (isDetailLoading || isMeLoading) return null;

  // 신청하기 버튼 라벨 결정
  const getActionLabel = () => {
    if (isJoined) return '신청완료';
    if (!canJoin && detail?.status !== 'RECRUIT') return '모집마감';
    return '신청하기';
  };

  return (
    <div>
      <DetailPresenter
        data={detail || null}
        participants={detail?.participatedUsers || []}
        reviews={detail?.reviews}
        isJoining={isJoining}
        canJoin={canJoin}
        isLiked={isLiked || false}
        onJoin={handleJoin} 
        onLikeToggle={handleLike}
        actionLabel={getActionLabel()}
        disabled={!canJoin || isJoined}
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

