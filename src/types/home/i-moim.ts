export interface IMoim {
  moimId: number; // 기존 id -> moimId
  moimType: string; // 기존 type -> moimType
  title: string; // 기존 name -> title
  roadAddress: string; // 기존 location -> roadAddress
  startDate: string; // 기존 dateTime -> startDate
  endDate: string; // 기존 registrationEnd -> endDate
  participants: number; // 참가자 수 (동일)
  moimStatus: string; // 기존 status -> moimStatus
  si: string; // 지역 (시)
  district: string; // 지역 (구)
  likes?: number; // 좋아요 수
}

