// 모임 신청하기 커스텀 훅
// [ ] tanstack query 적용하기
import { useState, useCallback } from "react";
import { toast } from "sonner";

interface UseJoinMoimOptions {
  successMessage?: string;
  errorMessage?: string;
}

export const useJoinMoim = (options: UseJoinMoimOptions = {}) => {
  const [isJoined, setIsJoined] = useState(false); 

  const joinMoim = useCallback(async (moimId: number) => {
    const { 
      successMessage = "모임 신청이 완료되었어요", 
      errorMessage = "잠시후 다시 시도해주세요"
    } = options;

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

  return { joinMoim, isJoined };
};