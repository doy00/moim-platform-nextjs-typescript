// 반응형을 위한 사이즈 상수
export const IMAGE_SIZE = {
  DEFAULT: `
  (max-width: 460px) 100vw, 
  (max-width: 640px) 460px, 
  (max-width: 744px) 640px, 
  (max-width: 1024px) 744px, 
  (max-width: 1280px) 1024px, 
  1280px
  `,

  ASPECT_RATIO: {
    MOBILE: '16/9',
    DESKTOP: '21/9'
  }
} as const;

// 기본 두두 프로필 이미지
export const DEFAULT_IMAGE = {
  PROFILE: '/svgs/img_detail-profile.svg',
  MOIM: '/images/img_moim-image.png',
} as const;

// 리뷰 평점
export const REVIEW_RATE = {
  SOSO: '그냥그래요',
  GOOD: '괜찮아요',
  RECOMMEND: '추천해요',
} as const;

export type ReviewRate = typeof REVIEW_RATE[keyof typeof REVIEW_RATE];