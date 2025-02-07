// /stores/make/makeStore.ts
import { create } from "zustand";
import { MakeStoreState } from "@/types/make/i-makeState";

export const useMakeStore = create<MakeStoreState>((set) => ({
  type: "",
  title: "",
  content: "",
  si: "",
  district: "",
  roadAddress: "",
  isOnline: false,
  recruitmentDeadline: "",
  startDate: "",
  endDate: "",
  minParticipants: 0,
  maxParticipants: 0,
  image: null, // File | null
  setType: (type) => set({ type }),
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setSi: (si) => set({ si }),
  setDistrict: (district) => set({ district }),
  setRoadAddress: (roadAddress) =>
    set((state) => ({
      roadAddress,
      isOnline: roadAddress === "온라인으로 진행합니다" ? true : false, // ✅ 주소가 변경되면 자동 해제
    })),
  toggleOnline: () =>
    set((state) => {
      const newIsOnline = !state.isOnline;
      return {
        isOnline: newIsOnline,
        roadAddress: newIsOnline ? '온라인으로 진행합니다' : '', // ✅ 체크되면 주소 변경
      };
    }),
  setRecruitmentDeadline: (recruitmentDeadline) => set({ recruitmentDeadline }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setMinParticipants: (minParticipants) => set({ minParticipants }),
  setMaxParticipants: (maxParticipants) => set({ maxParticipants }),
  setImage: (image: File | null) => set({ image }),
  reset: () =>
    set({
      type: "",
      title: "",
      content: "",
      si: "",
      district: "",
      roadAddress: "",
      isOnline: false,
      recruitmentDeadline: "",
      startDate: "",
      endDate: "",
      minParticipants: 0,
      maxParticipants: 0,
      image: null,
    }),
}));
