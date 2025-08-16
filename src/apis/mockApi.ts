import { mockMoims, mockParticipatedMoims, mockLikedMoims, mockReviews, mockCurrentUser, mockUsers } from '@/data/mockData';

export const mockApi = {
  // 모임 관련 API
  getMoims: (params?: any) => {
    return Promise.resolve({
      data: mockMoims,
      totalCount: mockMoims.length
    });
  },
  
  getMoimById: (id: string) => {
    const moim = mockMoims.find(m => m.id === id);
    return Promise.resolve(moim || null);
  },
  
  createMoim: (moimData: any) => {
    const newMoim = {
      ...moimData,
      id: String(mockMoims.length + 1),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      participants_counts: 1,
      liked_counts: 0,
      reviews_counts: 0,
      master_email: mockCurrentUser.email
    };
    return Promise.resolve(newMoim);
  },
  
  // 참가자 관련 API
  getParticipatedMoims: () => {
    return Promise.resolve(mockParticipatedMoims);
  },
  
  joinMoim: (moimId: string) => {
    return Promise.resolve({ success: true });
  },
  
  leaveMoim: (moimId: string) => {
    return Promise.resolve({ success: true });
  },
  
  // 좋아요 관련 API
  getLikedMoims: () => {
    // 좋아요한 모임 ID 기반으로 실제 모임 데이터 반환
    const likedMoimIds = mockLikedMoims.map(liked => liked.moim_uuid);
    const likedMoims = mockMoims.filter(moim => likedMoimIds.includes(moim.id));
    
    return Promise.resolve({
      data: likedMoims.map(moim => ({
        ...moim,
        moimId: moim.id,
        moimType: moim.category,
        likes: moim.liked_counts,
        participants: moim.participants_counts,
        reviewsCount: moim.reviews_counts,
        createdAt: moim.created_at,
        isConfirmed: moim.is_confirmed,
        recruitmentDeadline: moim.recruitment_deadline,
        startDate: moim.start_date,
        endDate: moim.end_date,
        minParticipants: moim.min_participants,
        maxParticipants: moim.max_participants,
        participantsCount: moim.participants_counts,
        likedCount: moim.liked_counts
      })),
      totalCount: likedMoims.length
    });
  },
  
  likeMoim: (moimId: string) => {
    return Promise.resolve({ success: true });
  },
  
  unlikeMoim: (moimId: string) => {
    return Promise.resolve({ success: true });
  },
  
  // 리뷰 관련 API
  getReviews: (moimId?: string) => {
    const reviews = moimId 
      ? mockReviews.filter(r => r.moim_uuid === moimId)
      : mockReviews;
    return Promise.resolve(reviews);
  },
  
  createReview: (reviewData: any) => {
    const newReview = {
      ...reviewData,
      id: String(mockReviews.length + 1),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_uuid: mockCurrentUser.id,
      user_email: mockCurrentUser.email,
      user_nickname: mockCurrentUser.nickname,
      user_image: mockCurrentUser.image
    };
    return Promise.resolve(newReview);
  },
  
  // 사용자 관련 API
  getUser: () => {
    return Promise.resolve(mockCurrentUser);
  },
  
  updateUser: (userData: any) => {
    return Promise.resolve({ ...mockCurrentUser, ...userData });
  },

  // 모임 상세 조회 API
  getMoimDetail: (moimId: string) => {
    const moim = mockMoims.find(m => m.id === moimId);
    if (!moim) {
      return Promise.reject(new Error('존재하지 않는 모임입니다'));
    }
    
    const masterUser = mockUsers.find(u => u.email === moim.master_email);
    
    // 해당 모임의 참가자 목록 찾기
    const participantsList = mockParticipatedMoims
      .filter(p => p.moim_uuid === moimId)
      .map(p => ({
        userUuid: p.user_uuid,
        userEmail: p.user_email,
        userNickname: p.user_nickname,
        userImage: p.user_image
      }));
    
    // 해당 모임의 리뷰 목록 찾기
    const reviewsList = mockReviews
      .filter(r => r.moim_uuid === moimId)
      .map(r => ({
        id: r.id,
        review: r.review,
        rate: r.rate,
        userUuid: r.user_uuid,
        userEmail: r.user_email,
        userNickname: r.user_nickname,
        userImage: r.user_image,
        createdAt: r.created_at
      }));
    
    return Promise.resolve({
      moim: {
        ...moim,
        moimId: moim.id,
        moimType: moim.category,
        likes: moim.liked_counts,
        participants: moim.participants_counts,
        reviewsCount: moim.reviews_counts,
        createdAt: moim.created_at,
        isConfirmed: moim.is_confirmed,
        recruitmentDeadline: moim.recruitment_deadline,
        startDate: moim.start_date,
        endDate: moim.end_date,
        minParticipants: moim.min_participants,
        maxParticipants: moim.max_participants,
        participantsCount: moim.participants_counts,
        likedCount: moim.liked_counts,
        participantsList: participantsList,
        reviewsList: reviewsList
      },
      masterUser: masterUser || mockUsers[0]
    });
  }
};