import { useQuery } from '@tanstack/react-query';
import { getMyMoim } from '@/apis/myMoim';
import { getOwnMoim } from '@/apis/ownMoim';

export const useMyMoimQuery = () => {
  return useQuery({
    queryKey: ['getMyMoim'],
    queryFn: getMyMoim,
    staleTime: 1000 * 60,
    refetchOnMount: false,
  });
};

export const useOwnMoimQuery = () => {
  return useQuery({
    queryKey: ['getOwnMoim'],
    queryFn: getOwnMoim,
    staleTime: 1000 * 60,
    refetchOnMount: false,
  });
};
