interface IMakeState {
  type: string; // 모임 카테고리
  title: string; // 모임 제목 (기존 name)
  content: string; // 모임 설명 (기존 description)
  si: string; // 시 (도시)
  district: string; // 구
  roadAddress: string; // 도로명 주소
  recruitmentDeadline: string; // 모집 종료 날짜
  startDate: string; // 모임 시작 날짜
  endDate: string; // 모임 종료 날짜
  minParticipants: number; // 최소 참가자 수
  maxParticipants: number; // 최대 참가자 수
}

export interface MakeStoreState extends IMakeState {
  setType: (type: string) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setSi: (si: string) => void;
  setDistrict: (district: string) => void;
  setRoadAddress: (roadAddress: string) => void;
  setRecruitmentDeadline: (recruitmentDeadline: string) => void;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  setMinParticipants: (minParticipants: number) => void;
  setMaxParticipants: (maxParticipants: number) => void;
  reset: () => void; // 상태 초기화
}
