// 테스트 계정 정보
export const testAccount = {
  email: 'test@example.com',
  password: 'test123',
  nickname: '테스트 사용자'
};

export const mockUsers = [
  {
    id: '1',
    email: 'test@example.com',
    nickname: '테스트 사용자',
    image: null,
    introduction: '안녕하세요! 모임 플랫폼을 체험해보세요.',
    position: 'FRONTEND' as const,
    tags: ['React', 'TypeScript', 'Next.js'],
    is_social: false,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '2',
    email: 'user2@example.com',
    nickname: '백엔드 개발자',
    image: null,
    introduction: 'Node.js와 Python을 이용한 백엔드 개발을 전문으로 합니다.',
    position: 'BACKEND' as const,
    tags: ['Node.js', 'Python', 'PostgreSQL'],
    is_social: false,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
];

export const mockMoims = [
  {
    id: '1',
    title: 'React 스터디 모임',
    content: 'React 18의 새로운 기능들을 함께 학습하는 스터디입니다. 매주 화요일 저녁에 만나서 공부합니다.',
    category: 'STUDY' as const,
    address: '서울특별시 강남구',
    online: false,
    start_date: '2024-03-01T19:00:00',
    end_date: '2024-03-01T21:00:00',
    recruitment_deadline: '2024-02-25T23:59:59',
    min_participants: 3,
    max_participants: 8,
    participants_counts: 5,
    liked_counts: 12,
    reviews_counts: 3,
    status: 'RECRUIT' as const,
    is_confirmed: false,
    master_email: 'user1@example.com',
    images: ['/images/temp.png'],
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '2',
    title: 'Next.js 프로젝트 개발',
    content: 'Next.js 14를 사용해서 실제 서비스를 개발하는 프로젝트 모임입니다. 포트폴리오로 활용 가능합니다.',
    category: 'PROJECT' as const,
    address: '서울특별시 서초구',
    online: true,
    start_date: '2024-03-05T10:00:00',
    end_date: '2024-04-30T18:00:00',
    recruitment_deadline: '2024-02-28T23:59:59',
    min_participants: 4,
    max_participants: 6,
    participants_counts: 4,
    liked_counts: 8,
    reviews_counts: 1,
    status: 'PROGRESS' as const,
    is_confirmed: true,
    master_email: 'user2@example.com',
    images: ['/images/temp.png'],
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '3',
    title: '프론트엔드 취업 면접 준비',
    content: '프론트엔드 개발자 취업을 위한 면접 스터디입니다. 기술 면접과 코딩 테스트를 함께 준비합니다.',
    category: 'INTERVIEW' as const,
    address: '서울특별시 마포구',
    online: false,
    start_date: '2024-03-10T14:00:00',
    end_date: '2024-03-10T17:00:00',
    recruitment_deadline: '2024-03-08T23:59:59',
    min_participants: 3,
    max_participants: 5,
    participants_counts: 3,
    liked_counts: 15,
    reviews_counts: 0,
    status: 'RECRUIT' as const,
    is_confirmed: false,
    master_email: 'user1@example.com',
    images: ['/images/temp.png'],
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
];

export const mockParticipatedMoims = [
  {
    id: '1',
    moim_uuid: '1',
    user_uuid: '1',
    user_email: 'user1@example.com',
    user_nickname: '프론트엔드 개발자',
    user_image: null,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '2',
    moim_uuid: '2',
    user_uuid: '2',
    user_email: 'user2@example.com',
    user_nickname: '백엔드 개발자',
    user_image: null,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
];

export const mockLikedMoims = [
  {
    id: '1',
    moim_uuid: '1',
    user_uuid: '1',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '2',
    moim_uuid: '3',
    user_uuid: '1',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
];

export const mockReviews = [
  {
    id: '1',
    moim_uuid: '1',
    user_uuid: '2',
    user_email: 'user2@example.com',
    user_nickname: '백엔드 개발자',
    user_image: null,
    rate: 'RECOMMEND' as const,
    review: '정말 유익한 스터디였습니다. 많은 것을 배웠어요!',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
];

// 현재 로그인된 사용자 (목업)
export const mockCurrentUser = mockUsers[0];