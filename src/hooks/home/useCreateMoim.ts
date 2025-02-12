import { useRouter } from "next/navigation";
import axiosHomeInstance from "@/libs/home/home-axios";
import { useMakeStore } from "@/stores/make/makeStore";
import { useQueryClient } from "@tanstack/react-query";
import { makeSuccessToast, makeErrorToast } from "@/components/make/MakeSoner";
import { useState, useCallback } from "react";

export function useCreateMoim() {
  const router = useRouter();
  const queryClient = useQueryClient(); 

  // 요청 중인지 상태 추적 (중복 제출 방지)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createMoim = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // 현재 상태를 조회하여 폼 데이터 구성
    const currentState = useMakeStore.getState();
    const moimData = {
      title: currentState.title,
      content: currentState.content,
      // isOnline 상태에 따라 주소 값 결정
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
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, queryClient, router]);

  return { createMoim };
}
