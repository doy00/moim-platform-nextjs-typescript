// utils/detail/enums.ts
import { ECategory, EMoimStatus, ERate, EPosition } from "@/types/supabase/supabase-custom.type";

// 1. moim_category Enum을 moimType(모임유형) 텍스트로 변환하는 함수
export const getMoimTypeText = (moimCategory: ECategory): string => {
  // 카테고리별 매핑 객체를 만들어 관리
  const categoryMap: Record<ECategory, string> = {
    PROJECT: '프로젝트',
    STUDY: '스터디',
    INTERVIEW: '면접'
  };

  // 매핑된 값을 반환하되, 만약 매핑되지 않은 값이 들어오면 'PROJECT'의 값을 기본으로 반환
  return categoryMap[moimCategory] || categoryMap.PROJECT;
}

// 2. moim_status Enum을 status(모임상태) 텍스트로 변환하는 함수
export const getMoimStatusText = (moimStatus: EMoimStatus): string => {
  // 모임 상태별 매핑 객체를 만들어 관리
  const statusMap: Record<EMoimStatus, string> = {
    RECRUIT: '모집중',
    PROGRESS: '진행중',
    END: '모집종료'
  };
  // 매핑된 값을 반환. 매핑되지 않은 값이 들어오면 'RECRUIT'의 값을 기본으로 반환
  return statusMap[moimStatus] || statusMap.RECRUIT
}

// 3. review_status Enum을 rate(리뷰평점) 텍스트로 변환하는 함수
export const getRate = (reviewStatus: ERate): string => {
  // 리뷰 평점별 매핑 객체를 만들어 관리
  const rateMap: Record<ERate, string> = {
    SOSO: '그냥그래요',
    GOOD: '괜찮아요',
    RECOMMEND: '추천해요'
  };
  // 매핑된 값을 반환. 매핑되지 않은 값이 들어오면 'GOOD'의 값을 기본으로 반환
  return rateMap[reviewStatus] || rateMap.GOOD
}

// 4. user_position Enum을 position(직군) 텍스트로 변환하는 함수
export const getPosition = (position: EPosition): string => {
  // 직군 매핑 객체를 만들어 관리
  const positionMap: Record<EPosition, string> = {
    BACKEND: '백엔드',
    FRONTEND: '프론트엔드',
    PM: 'PM',
    DESIGNER: '디자이너'
  };
  // 매핑된 값을 반환. 매핑되지 않은 값이 들어오면 'BACKEND'의 값을 기본으로 반환
  return positionMap[position] || positionMap.BACKEND
}