import { IMoim } from '@/types/mypage/moim.type';
import Image from 'next/image';
import Link from 'next/link';
import { moimTypeTag, moimTypeIcon, statusTag } from '@/utils/mypage/statusTags';
import { useUserQuery } from '@/hooks/mypage/queries/useUserQuery';
import { useMoimLikeQuery } from '@/hooks/mypage/queries/useLikeyQuery';
import { useMemo } from 'react';

interface Props {
  moim: IMoim;
  hideStatus?: boolean;
  hideReviewButton?: boolean;
  disableLink?: boolean;
  showInReviewTab?: boolean;
  refetch?: () => void;
}
const CardContent = ({
  moim,
  hideStatus,
  handleLikeClick,
  isLiked,
}: {
  moim: IMoim;
  hideStatus: boolean;
  handleLikeClick: () => void;
  isLiked: boolean;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-5 p-4 justify-between">
        <div className="flex gap-5 items-start">
          <Image src={moimTypeIcon(moim)} alt="puzzle" width={36} height={36} />
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <span className="h-[24px] bg-background400 py-[3px] px-1.5 rounded-[6px] font-medium text-caption-normal text-gray800">
                {moimTypeTag(moim)}
              </span>
              {!hideStatus && (
                <span className="h-[24px] bg-gray800 py-[3px] px-1.5 rounded-[6px] font-medium text-caption-normal text-gray50">
                  {statusTag(moim)}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-body-1-normal color-[#2B2926]">{moim?.title}</p>
              <div className="flex gap-2 items-center">
                <span className="font-medium text-label-reading text-[#9E9892]">
                  {moim?.address}
                </span>
                <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
                <span className="font-medium text-label-reading text-[#9E9892]">
                  {moim?.participants}명 참여
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-caption-normal text-[#837C74]">
                {new Date(moim?.startDate).toLocaleDateString()}
                {''} - {''}
                {new Date(moim?.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div
            onClick={(e) => {
              e.preventDefault();
              handleLikeClick();
            }}
            className="top-4 right-4 z-10"
          >
            <Image
              src={isLiked ? '/images/mypage/heart.svg' : '/images/mypage/empty-heart.svg'}
              alt="heart"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const GatheringWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background100 rounded-[14px] shadow-sm">{children}</div>
);

export function GatheringCard({
  moim,
  hideStatus = false,
  hideReviewButton = false,
  disableLink = false,
  showInReviewTab = false,
  refetch,
}: Props) {
  const { data } = useUserQuery();
  const isLiked = useMemo(() => {
    if (moim.likedUsers.find((userId) => userId === data?.id)) {
      return true;
    }
    return false;
  }, [moim, data]);

  const { mutate: likeMoim } = useMoimLikeQuery({
    moimId: moim.moimId,
    isLiked,
    refetch: refetch ?? (() => {}),
  });

  const isMoimEnded = moim?.status === 'END';
  const myUuid = useMemo(() => data?.id, [data]);
  const isParticipatedUser = moim?.participatedUsers.some(
    (participatedUser) => participatedUser.userUuid === myUuid,
  );
  const hasWrittenReview = moim?.reviews.some((review) => review.userUuid === myUuid);
  const participatedUserUuid = moim?.participatedUsers.some((user) => user.userUuid);

  const showReviewButton =
    isMoimEnded && isParticipatedUser && participatedUserUuid && showInReviewTab;

  // ================================================================

  // const findReviewer = moim?.reviews.some((review) => review.userUuid);
  // console.log('participatedUserUuid : ', participatedUserUuid);
  // console.log('findReviewer : ', findReviewer);
  // console.log('isMoimEnded : ', isMoimEnded);
  // console.log('isParticipatedUser : ', isParticipatedUser);
  // console.log('isReviewer : ', isReviewer);
  // console.log('myUuid : ', myUuid);

  // ================================================================

  const handleLikeClick = () => {
    likeMoim();
  };

  return (
    <GatheringWrapper>
      {disableLink ? (
        <CardContent
          moim={moim}
          hideStatus={hideStatus}
          handleLikeClick={handleLikeClick}
          isLiked={isLiked}
        />
      ) : (
        <Link href={`/detail/${moim?.moimId}`}>
          <CardContent
            moim={moim}
            hideStatus={hideStatus}
            handleLikeClick={handleLikeClick}
            isLiked={isLiked}
          />
        </Link>
      )}
      {!hideReviewButton && showReviewButton && (
        <div className="p-4 pt-0">
          <Link
            href={`/mypage/review/${moim.moimId}`}
            className={`w-full py-4 px-4 rounded-[14px] text-body-2-normal font-semibold block text-center bg-gray100 
              ${
                !hasWrittenReview ? 'text-gray800 hover:bg-gray200' : 'text-gray300 cursor-default'
              }`}
          >
            {hasWrittenReview ? '리뷰작성 완료' : '리뷰작성'}
          </Link>
        </div>
      )}
    </GatheringWrapper>
  );
}

export function GatheringSkeleton() {
  return (
    <GatheringWrapper>
      <div className="flex flex-col">
        <div className="flex items-center gap-5 p-4 justify-between">
          <div className="flex gap-5">
            <div className="w-[36px] h-[36px] bg-gray-200 rounded-full" />
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="h-6 w-[200px] bg-gray-200 rounded" />
                <div className="flex gap-2 items-center">
                  <div className="h-4 w-[100px] bg-gray-200 rounded" />
                  <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
                  <div className="h-4 w-[80px] bg-gray-200 rounded" />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="h-4 w-[100px] bg-gray-200 rounded" />
              </div>
            </div>
          </div>
          <div className="w-[24px] h-[24px] bg-gray-200 rounded-full" />
        </div>
        <div className="p-4 pt-0">
          <div className="w-full h-[36px] bg-gray-200 rounded-lg" />
        </div>
      </div>
    </GatheringWrapper>
  );
}
