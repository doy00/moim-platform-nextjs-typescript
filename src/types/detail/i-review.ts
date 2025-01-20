export type ReviewEmotion = '그냥그래요' | '괜찮아요' | '추천해요';

export interface IDetailReview {
  className?: string;
  emotion?: ReviewEmotion;
  comment?: string;
  author?: string;
  date?: string;     // from createdAt
  authorImage?: string; 
  reviewCount?: number;
}

export interface IDetailReviewResponse {
  data: IDetailReview[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
}