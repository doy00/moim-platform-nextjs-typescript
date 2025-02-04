import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserInfo, editUserInfo } from '@/apis/userInfo';
import { IUserEdit, IEditUserResponse } from '@/types/mypage/user';
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
      queryClient.invalidateQueries({ queryKey: ['getUserInfo'] });
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
