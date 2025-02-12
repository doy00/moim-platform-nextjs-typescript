import { editUserInfo, getUserInfo } from '@/apis/userInfo';
import { QUERY_KEY_ME } from '@/constants/auth/auth.const';
import { IEditUserResponse, IUserEdit } from '@/types/mypage/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  return useMutation<IEditUserResponse, Error, IUserEdit>({
    mutationFn: (editData: IUserEdit) => editUserInfo(editData),
    onSuccess: (data: IEditUserResponse) => {
      // queryClient.invalidateQueries({ queryKey: ['getUserInfo'] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
      router.push('/mypage');
    },
    onError: (error: any) => {
      console.error('수정오류:', error);
      console.error('에러응답:', error.response?.data);
      console.error('에러상태:', error.response?.status);
      console.error('에러헤더:', error.response?.headers);
    },
  });
};
