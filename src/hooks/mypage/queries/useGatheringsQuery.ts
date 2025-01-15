import { useQuery } from '@tanstack/react-query';
import { getJoined } from '@/apis/getJoined';
import { getGatherings } from '@/apis/gatherings';

export const useJoinedGatheringsQuery = () => {
  return useQuery({
    queryKey: ['joinedGatherings'],
    queryFn: getJoined,
  });
};

export const useCreatedGatheringsQuery = () => {
  return useQuery({
    queryKey: ['createdGatherings'],
    queryFn: getGatherings,
  });
};
