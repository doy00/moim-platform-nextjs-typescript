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
  setRoadAddress: (roadAddress) => set({ roadAddress }),
  setRecruitmentDeadline: (recruitmentDeadline) => set({ recruitmentDeadline }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setMinParticipants: (minParticipants) => set({ minParticipants }),
  setMaxParticipants: (maxParticipants) => set({ maxParticipants }),
  setImage: (image: File | null) => set({ image }), // 수정된 타입
  reset: () =>
    set({
      type: "",
      title: "",
      content: "",
      si: "",
      district: "",
      roadAddress: "",
      recruitmentDeadline: "",
      startDate: "",
      endDate: "",
      minParticipants: 0,
      maxParticipants: 0,
      image: null,
    }),
}));
