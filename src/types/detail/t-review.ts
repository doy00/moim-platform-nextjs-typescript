// types/detail/t-review.ts

import { TReviews, TUsers, TMoims } from "../supabase/supabase-custom.type";

export interface IReviewWithRelations extends TReviews {
  users: TUsers;
  moims: TMoims;
}

// 리뷰 목록 데이터 response
export interface IReviewListResponse {
  data: IReviewWithRelations[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}

// 리뷰 컴포넌트 props
export interface IReviewCardProps {
  review: IReviewWithRelations;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

// Review 작성 폼 Props
export interface IReviewFormProps {
  moimId: string;
  initialData?: TReviews;
  onSubmit: (data: IReviewFormData) => void;
  className?: string;
}

export interface IReviewFormData {
  review: string;
  rate: 'SOSO' | 'GOOD' | 'RECOMMEND';
}
