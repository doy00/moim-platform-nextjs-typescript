import { TMe } from '@/types/auth/auth.type';
import { IMoim } from '@/types/mypage/moim.type';
import { IReview } from '@/types/mypage/reviews.type';
import { IUser } from '@/types/mypage/user';

export const statusTag = (moim?: IMoim) => {
  if (moim?.status === 'END') {
    return '종료';
  } else if (moim?.maxParticipants === moim?.participants) {
    return '모집완료';
  } else if (moim?.isConfirmed === true) {
    return '개설확정';
  } else if (moim?.isConfirmed === false) {
    return '모집중';
  }
};

export const reviewRateTag = (review: IReview) => {
  if (review.rate === 'SOSO') {
    return '그냥그래요';
  } else if (review.rate === 'GOOD') {
    return '괜찮아요';
  } else if (review.rate === 'RECOMMEND') {
    return '추천해요';
  }
};

export const moimTypeTag = (moim?: IMoim) => {
  if (moim?.moimType === 'PROJECT') {
    return '프로젝트';
  } else if (moim?.moimType === 'STUDY') {
    return '스터디';
  } else if (moim?.moimType === 'INTERVIEW') {
    return '면접';
  }
};

export const moimTypeIcon = (moim?: IMoim) => {
  if (moim?.moimType === 'PROJECT') {
    return '/images/mypage/puzzle-on.svg';
  } else if (moim?.moimType === 'STUDY') {
    return '/images/mypage/open-book.svg';
  } else if (moim?.moimType === 'INTERVIEW') {
    return '/images/mypage/conversation-icon.svg';
  }
  return '/images/mypage/puzzle-on.svg'; // 기본값 설정
};

export const userPositionTag = (user?: IUser | TMe) => {
  if (user?.position === 'FRONTEND') {
    return '프론트엔드';
  } else if (user?.position === 'BACKEND') {
    return '백엔드';
  } else if (user?.position === 'PM') {
    return 'PM';
  } else if (user?.position === 'DESIGNER') {
    return '디자이너';
  }
  return null;
};

// export const moimHeartLike = (moim?: IMoim, isLiked?: boolean) => {
//   return {
//     icon: !moim?.likes || (moim.likes === 0 && !isLiked) ? emptyHeart : fullHeart,
//     count: moim?.likes ? (isLiked ? moim.likes - 1 : moim.likes + 1) : 0,
//   };
// };
