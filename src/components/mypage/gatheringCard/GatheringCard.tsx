import { IGathering, IJoind } from '@/types/gathering.type';
import Image from 'next/image';
import puzzle from '../../../../public/images/mypage/puzzle.svg';
import emptyHeart from '../../../../public/images/mypage/empty-heart.svg';

interface Props {
  gathering: IGathering | IJoind;
}

const GatheringWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    className="flex items-center gap-5 p-4 justify-between bg-background100 rounded-[14px] shadow-md
"
  >
    {children}
  </div>
);

export function GatheringCard({ gathering }: Props) {
  return (
    <GatheringWrapper>
      <div className="flex gap-5">
        {/* <Image
        src={gathering?.image ?? defaultProfile}
        alt="gathering"
        width={280}
        height={156}
        className="rounded-3xl border bg-gray-100"
      /> */}
        <Image src={puzzle} alt="puzzle" width={36} height={36} />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-body-1-normal color-[#2B2926]">{gathering?.name}</p>
            <div className="flex gap-2 items-center">
              <span className="font-medium text-label-reading text-[#9E9892]">
                {gathering?.location}
              </span>
              {/* <span className="font-medium text-label-reading text-[#9E9892]">⎮</span> */}
              <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
              <span className="font-medium text-label-reading text-[#9E9892]">
                {gathering?.participantCount}명 참여
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-caption-normal text-[#837C74]">
              {new Date(gathering?.dateTime).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div>
        <Image src={emptyHeart} alt="emptyHeart" width={24} height={24} />
      </div>
    </GatheringWrapper>
  );
}

export function GatheringSkeleton() {
  return (
    <GatheringWrapper>
      <div className="flex gap-5">
        {/* 퍼즐 이미지 스켈레톤 */}
        <div className="w-[36px] h-[36px] bg-gray-200 rounded-full" />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            {/* 모임 이름 스켈레톤 */}
            <div className="h-6 w-[200px] bg-gray-200 rounded" />
            <div className="flex gap-2 items-center">
              {/* 위치 스켈레톤 */}
              <div className="h-4 w-[100px] bg-gray-200 rounded" />
              <span className="w-[1px] h-2 border-l border-[#DEDBD9]" />
              {/* 참여자 수 스켈레톤 */}
              <div className="h-4 w-[80px] bg-gray-200 rounded" />
            </div>
          </div>
          {/* 날짜 스켈레톤 */}
          <div className="flex items-center justify-between gap-2">
            <div className="h-4 w-[100px] bg-gray-200 rounded" />
          </div>
        </div>
      </div>
      {/* 하트 아이콘 스켈레톤 */}
      <div className="w-[24px] h-[24px] bg-gray-200 rounded-full" />
    </GatheringWrapper>
  );
}
