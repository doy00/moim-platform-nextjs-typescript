import { mockMoims, mockParticipatedMoims, mockLikedMoims, mockReviews, mockCurrentUser } from '@/data/mockData';

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
    return Promise.resolve(mockLikedMoims);
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
  }
};