import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/apis/userInfo';

export const useUserQuery = () => {
  return useQuery({ queryKey: ['userInfo'], queryFn: getUserInfo });
};
