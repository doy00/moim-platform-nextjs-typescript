export type LikeState = {
  likes: Set<number>; 
  toggleLike: (moimId: number) => Promise<void>; 
  fetchLikes: () => Promise<void>; 
};