// types/detail/i-presenter.ts
import type { IMoimDetail, IParticipant, IReview } from './t-moim';

export interface IDetailPresenterProps {
  // 기본 데이터
  data: IMoimDetail | null;
  participants: IParticipant[];
  reviews: IReview[] | undefined;
  
  // 상태
  isJoining: boolean;
  isLiked: boolean;
  canJoin: boolean;
  
  // 이벤트 핸들러
  onJoin: () => void;
  onLikeToggle: () => void;
  
  // 신청하기 버튼 관련 props
  actionLabel?: string;  // 신청하기 버튼 라벨
  disabled?: boolean;    // 신청불가 상태일때 버튼 비활성화
  
  // 옵셔널 props
  className?: string;
  isHost?: boolean;  // 현재 사용자가 주최자인지 여부
  onShare?: () => void;  // 공유하기 기능
  onCancel?: () => void; // 모임 취소 기능 (주최자용)
}