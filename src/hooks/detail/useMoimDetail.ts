// 모임 상세 데이터 조회 훅
import { getDetail } from '@/apis/detail/detail.api';
import { IMoimDetail } from '@/types/detail/t-moim';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../auth/auth.hook';

interface UseMoimDetailOptions {
  enabled?: boolean;
}
  
export const useMoimDetail = (moimId: string, options: UseMoimDetailOptions= {}) => {
  const { me, isMeLoading } = useAuth();
  
  return useQuery<IMoimDetail>({
    queryKey: ['detail', moimId],
    queryFn: () => getDetail(moimId),
    enabled: options.enabled,
  });
};
