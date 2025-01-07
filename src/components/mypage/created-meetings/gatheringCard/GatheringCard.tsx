'use client';

import { IGathering } from '@/types/gathering.type';
import Image from 'next/image';
import defaultProfile from '../../../../../public/images/dude.png';

interface Props {
  gathering: IGathering;
}

export default function GatheringCard({ gathering }: Props) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={gathering?.image ?? defaultProfile}
        alt="gathering"
        width={280}
        height={156}
        className="rounded-3xl border bg-gray-100"
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span>{gathering?.name}</span>
          <span>⎮</span>
          <span>{gathering?.location}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span>{new Date(gathering?.dateTime).toLocaleDateString()}</span>
          <span>{gathering?.participantCount}</span>
        </div>
      </div>
    </div>
  );
}
