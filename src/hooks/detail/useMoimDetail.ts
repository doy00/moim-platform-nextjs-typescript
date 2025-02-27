// 모임 상세 데이터 조회 훅
import { getDetail } from '@/apis/detail/detail.api';
import { IMoimMasterResponse } from '@/types/detail/t-moim';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/detail/detail.const';
import { TMe } from '@/types/auth/auth.type';

interface UseMoimDetailOptions {
  enabled?: boolean;
  user?: TMe | null;
}

export const useMoimDetail = (moimId: string, options: UseMoimDetailOptions = {}) => {
  const { user, enabled = true } = options;

  return useQuery<IMoimMasterResponse>({
    queryKey: QUERY_KEYS.MOIM_DETAIL(moimId),
    queryFn: () => getDetail(moimId),
    enabled: options.enabled,
    // SSR된 데이터 재검증 방지
    staleTime: 1000 * 60, // 1분
    // 캐시 유지
    gcTime: 1000 * 60 * 5 // 5분
  });
};
