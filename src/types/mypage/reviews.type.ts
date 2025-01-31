export interface IReview {
  isSuccess: boolean;
  message: string;
  status: number;
  data: [
    {
      moimTitle: string;
      moimStartDate: string;
      moimEndDate: string;
      nickname: string;
      contents: string;
      emotion: string;
      createdAt: string;
    },
  ];
}
export interface IReviewPost {
  moimId: number;
  emotion: string;
  content: string;
}
