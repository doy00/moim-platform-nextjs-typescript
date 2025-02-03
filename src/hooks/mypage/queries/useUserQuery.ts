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
    mutationFn: (editData: IUserEdit) => {
      if (!user?.id) throw new Error('User ID not found');
      return editUserInfo(user.id, editData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUserInfo'] });
    },
  });
};
