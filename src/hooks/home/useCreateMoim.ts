// src/hooks/useCreateMoim.ts
import { useRouter } from "next/navigation";
import axiosHomeInstance from "@/libs/home/home-axios";
import { useMakeStore } from "@/stores/make/makeStore";

export function useCreateMoim() {
  const router = useRouter();

  const createMoim = async () => {
    // 제출 시점에 최신 상태를 읽습니다.
    const currentState = useMakeStore.getState();
    const moimData = {
      title: currentState.title,
      content: currentState.content,
      roadAddress: currentState.roadAddress, // "roadAddress"로 변경
      recruitmentDeadline: currentState.recruitmentDeadline,
      startDate: currentState.startDate,
      endDate: currentState.endDate,
      minParticipants: currentState.minParticipants,
      maxParticipants: currentState.maxParticipants,
      moimType: currentState.type.toUpperCase(),
      status: 'RECRUIT',
    };

    const formData = new FormData();
    // 이제 서버에서는 moimDataOrigin.roadAddress 로 값을 찾게 됩니다.
    formData.append('moim_json', JSON.stringify(moimData));
    if (currentState.image) {
      formData.append('moim_image', currentState.image);
    }

    try {
      const response = await axiosHomeInstance.post('/moims', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data && response.data.moimId) {
        alert('모임 생성에 성공했습니다!');
        useMakeStore.getState().reset();
        router.push('/');
      } else {
        alert('모임 생성에 실패했습니다.');
      }
    } catch (error: any) {
      console.error('모임 생성 실패:', error);
      alert('모임 생성 중 문제가 발생했습니다.');
    }
  };

  return { createMoim };
}
