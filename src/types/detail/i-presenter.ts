// types/detail/i-presenter.ts
import type { IMoimDetail, IParticipant, IDetailReviewResponse, IMoimReview } from './i-moim';

export interface DetailPresenterProps {
  // 기본 데이터
  data: IMoimDetail | undefined;
  participants: IParticipant[] | undefined;
  // reviews: IDetailReviewResponse | undefined;
  reviews: IMoimReview[] | undefined;
  
  // 상태
  isJoining: boolean;
  isLiked: boolean;
  
  // 이벤트 핸들러
  onJoin: () => void;
  onLikeToggle: () => void;
  
  // 옵셔널 props
  className?: string;
  isHost?: boolean;  // 현재 사용자가 주최자인지 여부
  onShare?: () => void;  // 공유하기 기능
  onCancel?: () => void; // 모임 취소 기능 (주최자용)
}