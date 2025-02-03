import { IParticipatedMoim, IMyMoim } from '@/types/mypage/moim.type';
import Image from 'next/image';
import puzzle from '@images/mypage/puzzle-on.svg';
import emptyHeart from '@images/mypage/empty-heart.svg';
import Link from 'next/link';

interface Props {
  moim: IMyMoim | IParticipatedMoim;
  isReviewed?: boolean;
}

const GatheringWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background100 rounded-[14px] shadow-md">{children}</div>
);

export function GatheringCard({ moim, isReviewed }: Props) {
  const isGatheringEnded = new Date(moim.endDate) < new Date();
  const showReviewButton = isGatheringEnded && !isReviewed;

  return (
    <GatheringWrapper>
      <div className="flex flex-col">
        <div className="flex items-center gap-5 p-4 justify-between">
          <div className="flex gap-5">
            <Image src={puzzle} alt="puzzle" width={36} height={36} />
            <div className="flex flex-col gap-2">
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
                </span>
              </div>
            </div>
          </div>
          <div>
            <Image src={emptyHeart} alt="emptyHeart" width={24} height={24} />
          </div>
        </div>
        {showReviewButton ? (
          <div className="p-4 pt-0">
            <Link
              href={`/mypage/review/${moim.moimId}`}
              className="w-full py-4 px-4 bg-gray100 rounded-[14px] text-body-2-normal font-semibold text-gray800 hover:bg-gray200 block text-center"
            >
              리뷰작성
            </Link>
          </div>
        ) : null}
      </div>
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
