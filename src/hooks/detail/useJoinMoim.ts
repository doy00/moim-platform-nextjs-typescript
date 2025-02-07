// 모임 참여하기 커스텀 훅
import { getDetail, joinApi } from '@/apis/detail/detail.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/auth.hook';
import { IMoimDetail } from '@/types/detail/t-moim';
import { QUERY_KEYS } from '@/constants/detail/detail.const';

interface IUseJoinMoimOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) =>  void;
}

export const useJoinMoim = (moimId: string, options: IUseJoinMoimOptions = {}) => {
  const { me, isMeLoading } = useAuth();
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options;

  // 모임상세 조회
  const { data: moimDetail, isLoading: isLoadingDetail } = useQuery({
    // queryKey: ['moim', moimId],
    queryKey: QUERY_KEYS.MOIM_DETAIL(moimId),
    queryFn: () => getDetail(moimId),
    enabled: !!moimId,
  });

  // 현재 유저가 이 모임을 이미 참여했는지 확인
  const isJoined = me && moimDetail?.participatedUsers?.some(user => user.userUuid === me.id);
  // 참여 가능한 모임인지 확인 - 유저 신청 여부, 정원, 모집중(RECRUIT)
  const canJoin = me && moimDetail && !isJoined && moimDetail.participants < moimDetail.maxParticipants && moimDetail.status === 'RECRUIT';

  const { mutateAsync: joinMutation, isPending: isJoining } = useMutation({
    mutationFn: async () => {
      if (!me) throw new Error('로그인이 필요합니다.');
      if (!canJoin) throw new Error('참여할 수 없는 모임입니다');

      const response = await joinApi.join(moimId);
      return response;
    },

    // 낙관적 업데이트
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.MOIM_DETAIL(moimId) });
      const previousMoim = queryClient.getQueryData<IMoimDetail>(QUERY_KEYS.MOIM_DETAIL(moimId));
      if (previousMoim && me) {
        const newParticipant = {
          userUuid: me.id,
          userEmail: me.email,
          userImage: me.image || '',
          userNickname: me.nickname,
        };

        queryClient.setQueryData<IMoimDetail>(QUERY_KEYS.MOIM_DETAIL(moimId), {
          ...previousMoim,
          participants: previousMoim.participants + 1,
          participatedUsers: [...previousMoim.participatedUsers, newParticipant],
        });
      }
      return { previousMoim };
    },

    // 서버 응답 성공시
    onSuccess: (response) => {
      // 모임 상세 데이터 캐시 업데이트
      // queryClient.setQueryData<IMoimDetail>(['moim', moimId], (oldData) => {
      //   if (!oldData || !me) return oldData;
      //   return response.data;
      //   // return {
      //   //   ...oldData,
      //   //   ...response,
      //   // };
      // });
      queryClient.setQueryData<IMoimDetail>(QUERY_KEYS.MOIM_DETAIL(moimId), response.data);

      // 관련 쿼리 무효화 (내가 참여한 모임 목록)
      // queryClient.invalidateQueries({ queryKey: ['joined-moims']});
      queryClient.invalidateQueries({ queryKey: ['getParticipatedMoim']});
      onSuccess?.();
    },
    onError: (error, _, context) => {
      // 이전 상태로
      if (context?.previousMoim) {
        queryClient.setQueryData(QUERY_KEYS.MOIM_DETAIL(moimId), context.previousMoim);
      }
      console.error('모임 참여 실패:', error);
      onError?.(error);
    },
  });

  // 참여 토글 핸들러
  const handleJoinMoim = async () => {
    if (!me) throw new Error('로그인이 필요합니다');
    if (isJoined) {
      return { success: false, message: '이미 신청한 모임입니다'};
    }
    if (!canJoin) throw new Error('참여할 수 없는 모임입니다');
    try {
      await joinMutation();
      return { 
        success: true, 
        message: '모임 신청이 완료되었습니다'
      };
    } catch (error) {
      throw error;
    }
  };
  return {
    isJoined: !!isJoined,
    canJoin: !!canJoin,
    handleJoinMoim,
    isLoading: isLoadingDetail || isJoining || isMeLoading,
    participantsCount: moimDetail?.participants ?? 0,
    maxParticipants: moimDetail?.maxParticipants ?? 0,
  };
};