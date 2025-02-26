'use client';
import { useAuth } from '@/hooks/auth/auth.hook';
import { useMoimDetail } from '@/hooks/detail/useMoimDetail';
import { useJoinMoim } from '@/hooks/detail/useJoinMoim';
import { useLikeMoim } from '@/hooks/detail/useLikeMoim';
import { useRouter } from 'next/navigation';
import DetailPresenter from '@/components/detail/DetailPresenter';
import { DetailSkeleton } from '@/components/detail/DetailSkeleton';
import { toast } from 'sonner';
import { CheckCircle, XCircle } from 'lucide-react';
import { DEFAULT_IMAGE } from '@/constants/detail/detail.const';
import { CancelJoinDialog } from '@/components/detail/join/CancelJoinDialog';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface IDetailContainerProps {
  moimId: string;
}

export default function DetailContainer({ moimId }: IDetailContainerProps) {
  const router = useRouter();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const { me, isMeLoading } = useAuth(); // 로그인 상태 확인
  // 메인 모임 상세 데이터 쿼리
  const {
    data: detail,
    isLoading: isDetailLoading,
  } = useMoimDetail(moimId, {
    enabled: !isMeLoading,
    user: me
  });

  // like, join 훅. 모임 상세 데이터 전달
  const { isLiked, handleToggleLike } = useLikeMoim(moimId, { user: me });
  const { isJoined, canJoin, isHost, handleJoinMoim, handleLeaveMoim, isLoading: isJoining } = useJoinMoim(moimId, {
    user: me,
  });



  // 메모이제이션 안한 데이터
  // const detailData = detail?.moim;
  // const masterUser = detail?.masterUser;

  // 모임 데이터 메모이제이션
  const moim = useMemo(() => {
    if (!detail?.moim) return null;
    return {
      ...detail.moim,
      image: detail.moim.image || DEFAULT_IMAGE.MOIM
    };
  }, [detail?.moim]);
  // 주최자 데이터 메모이제이션
  const masterUser = useMemo(() => detail?.masterUser || null, [detail?.masterUser]);

  // 신청하기 버튼 라벨 결정
  const getActionLabel = useMemo(() => {
    if (isHost) return '내가 작성한 모임입니다';
    // if (isJoined) return '신청완료';
    if (isJoined) return '신청 취소하기';
    if (!canJoin || moim?.status !== 'RECRUIT') return '모집마감';
    return '신청하기';
  }, [isHost, isJoined, canJoin, moim?.status]);

  // 신청하기 버튼 라벨 결정 로직을 클라이언트에서만 실행되도록 useEffect 적용
  const [actionLabel, setActionLabel] = useState(''); 
  const [clientDisabled, setClientDisabled] = useState(false);

  useEffect(() => {
    if (isHost) setActionLabel('내가 작성한 모임입니다');
    else if (isJoined) setActionLabel('신청 취소하기');
    else if (!canJoin || moim?.status !== 'RECRUIT') setActionLabel('모집마감');
    else setActionLabel('신청하기');
    setClientDisabled(isHost || moim?.status !== 'RECRUIT');
  }, [isHost, isJoined, canJoin, moim?.status]);

  // 메모ㅇ) 찜하기 버튼 핸들러
  const handleLike = useCallback(async () => {
    try {
      await handleToggleLike();
      toast.success(isLiked ? '찜하기가 취소되었어요' : '찜하기가 완료되었어요', {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        action: {
          label: '내역 확인',
          onClick: () => {
            router.push('/mylike');
          },
        },
      });
    } catch (error) {
      toast.error('잠시후 다시 시도해주세요');
    }
  }, [handleToggleLike, isLiked, router]);
  // 찜하기 버튼 핸들러
  // const handleLike = async () => {
  //   try {
  //     await handleToggleLike();
  //     toast.success(isLiked ? '찜하기가 취소되었어요' : '찜하기가 완료되었어요', {
  //       icon: <CheckCircle className="w-5 h-5 text-green-500" />,
  //       action: {
  //         label: '내역 확인',
  //         onClick: () => {
  //           router.push('/mylike');
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     toast.error('잠시후 다시 시도해주세요');
  //   }
  // };

  // 메모ㅇ) 신청하기 버튼 핸들러
  const handleJoin = useCallback(async () => {
    try {
      const result = await handleJoinMoim();
      if (!result.success) {
        toast.info(result.message);
        return;
      }
      toast.success('모임 신청이 완료되었어요', {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        action: {
          label: '내역 확인',
          onClick: () => {
            router.push('/mypage');
          },
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('잠시후 다시 시도해주세요', {
          icon: <XCircle className="w-5 h-5 text-red-500" />,
        });
      }
    }
  }, [handleJoinMoim, router]);
  // // 신청하기 버튼 핸들러
  // const handleJoin = async () => {
  //   try {
  //     const result = await handleJoinMoim();
  //     if (!result.success) {
  //       toast.info(result.message);
  //       return;
  //     }
  //     toast.success('모임 신청이 완료되었어요', {
  //       icon: <CheckCircle className="w-5 h-5 text-green-500" />,
  //       action: {
  //         label: '내역 확인',
  //         onClick: () => {
  //           router.push('/mypage');
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       toast.error(error.message);
  //     } else {
  //       toast.error('잠시후 다시 시도해주세요', {
  //         icon: <XCircle className="w-5 h-5 text-red-500" />,
  //       });
  //     }
  //   }
  // };

  // // 모임 신청 취소 버튼 핸들러
  // const handleCancelClick = () => {
  //   setShowCancelDialog(true);
  // }
  // 메모ㅇ) 모임 신청 취소 버튼 핸들러
  const handleCancelClick = useCallback(() => {
    setShowCancelDialog(true);
  }, [])

  // // 버튼 클릭 핸들러
  // const handleActionClick = () => {
  //   if (isJoined) {
  //     handleCancelClick();
  //   } else {
  //     handleJoin();
  //   }
  // }
  // 메모ㅇ) 버튼 클릭 핸들러
  const handleActionClick = useCallback(() => {
    if (isJoined) {
      handleCancelClick();
    } else {
      handleJoin();
    }
  }, [isJoined, handleCancelClick, handleJoin]);

  const handleCancelConfirm = useCallback(async () => {
    try {
      const result = await handleLeaveMoim();
      if (result.success) {
        toast.success('모임 신청이 취소되었어요', {
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
          action: {
            label: '내역 확인',
            onClick: () => {
              router.push('/mypage');
          },
        },
      });
        setShowCancelDialog(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          icon: <XCircle className="w-5 h-5 text-red-500" />,
        });
      } else {
        toast.error('잠시후 다시 시도해주세요', {
          icon: <XCircle className="w-5 h-5 text-red-500" />,
        });
      }
    }
  }, [handleLeaveMoim, router]);

  // 다이얼로그 닫기 핸들러
  const handleCloseDialog = useCallback(() => {
    setShowCancelDialog(false);
  }, []);

  if (isDetailLoading || isMeLoading || !moim || !masterUser) return <DetailSkeleton />;

  return (
    <>
      <DetailPresenter
        data={moim || null}
        masterUser={masterUser || null}
        participants={moim?.participatedUsers || []}
        reviews={moim?.reviews}
        isJoining={isJoining}
        canJoin={canJoin}
        isLiked={isLiked || false}
        onJoin={handleActionClick}
        onLikeToggle={handleLike}
        actionLabel={getActionLabel}
        disabled={clientDisabled}
      />
      <CancelJoinDialog
        isOpen={showCancelDialog}
        onClose={handleCloseDialog}
        onConfirm={handleCancelConfirm}
      />
    </>
  );
}
