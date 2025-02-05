import { IMoim } from '@/types/mypage/moim.type';
import { IReview } from '@/types/mypage/reviews.type';
import projectIcon from '@images/mypage/puzzle-on.svg';
import studyIcon from '@images/mypage/open-book.svg';
import interviewIcon from '@images/mypage/conversation-icon.svg';

export const statusTag = (moim: IMoim) => {
  if (moim.status === 'RECRUIT') {
    return '모집중';
  } else if (moim.status === 'PROGRESS') {
    return '진행중';
  } else if (moim.status === 'END') {
    return '종료';
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

export const moimTypeTag = (moim: IMoim) => {
  if (moim.moimType === 'PROJECT') {
    return '프로젝트';
  } else if (moim.moimType === 'STUDY') {
    return '스터디';
  } else if (moim.moimType === 'INTERVIEW') {
    return '면접';
  }
};

export const moimTypeIcon = (moim: IMoim) => {
  if (moim.moimType === 'PROJECT') {
    return projectIcon;
  } else if (moim.moimType === 'STUDY') {
    return studyIcon;
  } else if (moim.moimType === 'INTERVIEW') {
    return interviewIcon;
  }
};
