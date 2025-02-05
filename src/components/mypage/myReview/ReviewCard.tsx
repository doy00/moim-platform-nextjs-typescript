interface Props {
  // review: IReview['data'][0];
  review: any; // 빌드 에러로 임시로 any 처리했습니다.
}

const ReviewWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col bg-background100 rounded-xl px-4 py-[18px] gap-3">{children}</div>
);

export function ReviewCard({ review }: Props) {
  return (
    <ReviewWrapper>
      <div className="flex flex-col gap-1">
        <span>{review?.emotion}</span>
        <div className="flex items-center justify-start gap-2">
          <span className="font-normal text-caption-normal text-gray300 ">{review?.moimTitle}</span>
          <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
          <span className="font-normal text-caption-normal text-gray300 ">
            {new Date(review?.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <span className="font-normal text-label-reading text-gray400">{review?.contents}</span>

      {/* api 미완성으로 인해 주석처리 */}
      {/* <div className="flex items-center justify-end gap-2">
        <Image src={review?.User?.image ?? profileDefault} alt="profile" width={24} height={24} />
        <div className="flex justify-between items-center gap-2">
          <span className="font-normal text-caption-normal text-gray300">{review?.User?.name}</span>
          <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
          <span className="font-normal text-caption-normal text-gray300">
            {new Date(review?.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div> */}
    </ReviewWrapper>
  );
}

export function ReviewSkeleton() {
  return (
    <ReviewWrapper>
      <div className="animate-pulse flex flex-col gap-1">
        <div className="h-6 w-16 bg-gray-200 rounded" />
        <div className="flex items-center justify-start gap-2">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="flex items-center justify-end gap-2">
        <div className="w-6 h-6 bg-gray-200 rounded-full" />
        <div className="flex justify-between items-center gap-2">
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
      </div>
    </ReviewWrapper>
  );
}
