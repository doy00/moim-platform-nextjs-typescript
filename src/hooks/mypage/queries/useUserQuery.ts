import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserInfo, editUserInfo } from '@/apis/userInfo';
import { IUser, IUserEdit } from '@/types/mypage/user';

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['getUserInfo'],
    queryFn: getUserInfo,
    staleTime: 1000 * 60,
    refetchOnMount: false,
  });
};

export const useEditUserMutation = () => {
  const queryClient = useQueryClient();
  const { data: user } = useUserQuery();

  return useMutation({
    mutationFn: (editData: IUserEdit) => editUserInfo(editData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUserInfo'] });
    },
  });
};
