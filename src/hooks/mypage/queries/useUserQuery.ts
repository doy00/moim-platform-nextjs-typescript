import { useQuery } from '@tanstack/react-query';
import { getUserInfo, editUserInfo } from '@/apis/userInfo';
import { IUser } from '@/types/user';

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['getUserInfo'],
    queryFn: getUserInfo,
    staleTime: 1000 * 60,
    refetchOnMount: false,
  });
};

export const useEditUserQuery = (id: number, editUser: IUser) => {
  return useQuery({
    queryKey: ['editUserInfo'],
    queryFn: () => editUserInfo(id, editUser),
    staleTime: 1000 * 60,
    refetchOnMount: false,
  });
};
