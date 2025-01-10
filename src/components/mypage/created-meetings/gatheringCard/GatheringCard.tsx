'use client';

import { IGathering, IJoind } from '@/types/gathering.type';
import Image from 'next/image';
// import defaultProfile from '../../../../../public/images/dude.png';
import puzzle from '../../../../../public/images/mypage/puzzle.svg';
import emptyHeart from '../../../../../public/images/mypage/empty-heart.svg';
interface Props {
  gathering: IGathering | IJoind;
  // gathering: IJoind;
}

export default function GatheringCard({ gathering }: Props) {
  return (
    <div
      className="flex items-center gap-5 p-4 justify-between bg-background100 rounded-[14px] shadow-md
"
    >
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
    </div>
  );
}
