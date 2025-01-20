import { useQuery } from '@tanstack/react-query';
import { getJoined } from '@/apis/myMoim';
import { getGatherings } from '@/apis/ownMoim';

export const useJoinedGatheringsQuery = () => {
  return useQuery({
    queryKey: ['getJoinedGatherings'],
    queryFn: getJoined,
    staleTime: 1000 * 60,
    refetchOnMount: false,
  });
};

export const useCreatedGatheringsQuery = () => {
  return useQuery({
    queryKey: ['getCreatedGatherings'],
    queryFn: getGatherings,
    staleTime: 1000 * 60,
    refetchOnMount: false,
  });
};
