interface IMakeState {
  type: string; // 모임 카테고리
  name: string; // 모임 제목
  description: string; // 모임 설명
  dateTime: string; // 모임 시작 날짜와 시간
  location: string; // 모임 장소
  isOnline: boolean; // 온라인 여부
  participantCount?: number; // 현재 참가자 수
  capacity: number; // 최대 참가자 수
  image: string; // 이미지 URL
  recruitmentStart: string; // 모집 시작 날짜
  registrationEnd: string; // 모집 종료 날짜와 시간
  moimStart: string; // 모임 시작 날짜
  moimEnd: string; // 모임 종료 날짜
  minParticipants: number; // 최소 참가자 수
  maxParticipants: number; // 최대 참가자 수
}

export interface MakeStoreState extends IMakeState {
  setType: (type: string) => void;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setLocation: (location: string) => void;
  toggleIsOnline: () => void;
  setDateTime: (dateTime: string) => void;
  setRecruitmentStart: (recruitmentStart: string) => void;
  setRegistrationEnd: (registrationEnd: string) => void;
  setMoimStart: (moimStart: string) => void;
  setMoimEnd: (moimEnd: string) => void;
  setCapacity: (capacity: number) => void;
  setMinParticipants: (minParticipants: number) => void;
  setMaxParticipants: (maxParticipants: number) => void;
  setImage: (image: string) => void;
  reset: () => void; // 상태 초기화
}