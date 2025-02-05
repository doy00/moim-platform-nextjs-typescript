import { useQuery } from '@tanstack/react-query';
import { getMyMoim } from '@/apis/myMoim';
import { getParticipatedMoim } from '@/apis/participatedMoim';

export const useMyMoimQuery = () => {
  return useQuery({
    queryKey: ['getMyMoim'],
    queryFn: getMyMoim,
    staleTime: 1000 * 60,
    refetchOnMount: false,
  });
};

export const useParticipatedMoimQuery = () => {
  return useQuery({
    queryKey: ['getParticipatedMoim'],
    queryFn: getParticipatedMoim,
    staleTime: 1000 * 60,
    refetchOnMount: false,
  });
};
