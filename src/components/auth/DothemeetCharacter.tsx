import { cn } from '@/lib/utils';
import Image from 'next/image';

interface DothemeetCharacterProps {
  isFull: boolean;
}

export default function DothemeetCharacter({ isFull }: DothemeetCharacterProps) {
  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div className="w-[181px] h-[203px] relative">
        <Image
          src={'/svgs/svg_dothemeet_full.svg'}
          alt="dothemeet"
          fill
          priority
          className={cn(isFull ? 'opacity-100' : 'opacity-0')}
        />
        <Image
          src={'/svgs/svg_dothemeet_circle.svg'}
          alt="dothemeet"
          fill
          priority
          className={cn(isFull ? 'opacity-0' : 'opacity-100')}
        />
      </div>
    </div>
  );
}
