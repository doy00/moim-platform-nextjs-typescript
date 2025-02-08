import { IMoim } from '@/types/mypage/moim.type';
import { IReview } from '@/types/mypage/reviews.type';
import { IUser } from '@/types/mypage/user';
import projectIcon from '@images/mypage/puzzle-on.svg';
import studyIcon from '@images/mypage/open-book.svg';
import interviewIcon from '@images/mypage/conversation-icon.svg';
import emptyHeart from '@public/images/mypage/empty-heart.svg';
import fullHeart from '@public/images/mypage/heart.svg';

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
    return projectIcon;
  } else if (moim?.moimType === 'STUDY') {
    return studyIcon;
  } else if (moim?.moimType === 'INTERVIEW') {
    return interviewIcon;
  }
};

export const userPositionTag = (user?: IUser) => {
  if (user?.position === 'FRONTEND') {
    return '프론트엔드';
  } else if (user?.position === 'BACKEND') {
    return '백엔드';
  } else if (user?.position === 'PM') {
    return 'PM';
  } else if (user?.position === 'DESIGNER') {
    return '디자이너';
  }
};

export const moimHeartLike = (moim?: IMoim, isLiked?: boolean) => {
  return {
    icon: !moim?.likes || (moim.likes === 0 && !isLiked) ? emptyHeart : fullHeart,
    count: moim?.likes ? (isLiked ? moim.likes - 1 : moim.likes + 1) : 0,
  };
};
