import { IMoim } from '@/types/mypage/moim.type';
import Image from 'next/image';
import projectIcon from '@images/mypage/puzzle-on.svg';
import studyIcon from '@images/mypage/open-book.svg';
import interviewIcon from '@images/mypage/conversation-icon.svg';

export const getStatusTag = (moim: IMoim) => {
  if (moim.status === 'RECRUIT') {
    return '모집중';
  } else if (moim.status === 'PROGRESS') {
    return '진행중';
  } else if (moim.status === 'END') {
    return '종료';
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
