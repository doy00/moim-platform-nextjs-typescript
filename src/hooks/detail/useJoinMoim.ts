// 모임 신청하기 커스텀 훅
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinMoim } from "@/apis/detail/detail.api";
import { toast } from "sonner";

interface UseJoinMoimOptions {
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void; // [ ] 성공 시 콜백 함수 타입 정의
}

export const useJoinMoim = (options: UseJoinMoimOptions = {}) => {
  // const [isJoined, setIsJoined] = useState(false); 
  const queryClient = useQueryClient();

  // const joinMoim = useCallback(async (moimId: number) => {
  const { 
    successMessage = "모임 신청이 완료되었어요", 
    errorMessage = "잠시후 다시 시도해주세요",
    onSuccess: onSuccessCallback
  } = options;

  const mutation = useMutation({
    mutationFn: (moimId: number) => joinMoim(moimId),
    onSuccess: () => {
      // [ ] 더알아보기: 관련된 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['detail-info'] });
      queryClient.invalidateQueries({ queryKey: ['detail-participants'] });
      queryClient.invalidateQueries({ queryKey: ['detail-reviews'] });

      toast.success(successMessage);
      onSuccessCallback?.();

    },
    onError: (error: Error) => {
      console.error('모임 신청하기 실패:', error);
      toast.error(errorMessage);
    }
  });
  
  /* useCallback 사용
  // const handleJoinClick = async () => {
    setIsJoined(true);
    try {
    // console.log('신청하기 클릭');
    // await joinMoim(id)   // [ ] 모임 신청 API 호출
      toast.success(successMessage)
      return {
      success: true,
      message: successMessage
    };
  } catch (error) {
    console.error("모임 신청하기를 실패했습니다:", error)
    return {
      success: false,
      message: errorMessage
    };
  } finally {
    setIsJoined(false);
  }
}, [options]);
*/

  return { 
    joinMoim: mutation.mutate,
    isJoining: mutation.isPending,  // 로딩 상태
    error: mutation.error          // 에러 상태
  };
};