export type LikeState = {
  likes: Set<number>; // 찜한 모임 ID를 저장
  toggleLike: (moimId: number) => Promise<void>; // 찜/찜 해제
  fetchLikes: () => Promise<void>; // 찜한 모임 가져오기
};