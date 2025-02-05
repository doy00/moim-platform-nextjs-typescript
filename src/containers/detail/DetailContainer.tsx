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
  const { me, signOut, isMeLoading } = useAuth();    // 로그인 상태 확인
  const { data: detail, isLoading, error } = useMoimDetail(moimId, { enabled: !isMeLoading });
  const { isLiked, handleToggleLike } = useLikeMoim(moimId);

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

  if (isLoading || isMeLoading) return null;

  return (
    <div>
      <DetailPresenter 
        data={detail || null}
        participants={detail?.participatedUsers || []} 
        reviews={detail?.reviews}
        isJoining={false} // 임시로 false
        isLiked={isLiked || false}
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

