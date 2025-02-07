import { useRouter } from "next/navigation";
import axiosHomeInstance from "@/libs/home/home-axios";
import { useMakeStore } from "@/stores/make/makeStore";
import { useQueryClient } from "@tanstack/react-query"; 
import { makeSuccessToast, makeErrorToast } from "@/components/make/MakeSoner";

export function useCreateMoim() {
  const router = useRouter();
  const queryClient = useQueryClient(); 

  const createMoim = async () => {
    const currentState = useMakeStore.getState();
    const moimData = {
      title: currentState.title,
      content: currentState.content,
      roadAddress: currentState.isOnline ? "온라인으로 진행합니다" : currentState.roadAddress, 
      recruitmentDeadline: currentState.recruitmentDeadline,
      startDate: currentState.startDate,
      endDate: currentState.endDate,
      minParticipants: currentState.minParticipants,
      maxParticipants: currentState.maxParticipants,
      moimType: currentState.type.toUpperCase(),
      status: 'RECRUIT',
    };

    const formData = new FormData();
    formData.append('moim_json', JSON.stringify(moimData));
    if (currentState.image) {
      formData.append('moim_image', currentState.image);
    }

    try {
      const response = await axiosHomeInstance.post('/moims', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data && response.data.moimId) {
        makeSuccessToast(response.data.moimId, () => router.push(`/detail/${response.data.moimId}`));
        // 새로운 모임 데이터가 즉시 반영되도록 캐시 무효화
        await queryClient.invalidateQueries({ queryKey: ['moims'] });

        useMakeStore.getState().reset();
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        makeErrorToast("모임 생성에 실패했습니다.");
      }
    } catch (error: any) {
      console.error('모임 생성 실패:', error);
      makeErrorToast();
    }
  };

  return { createMoim };
}
