import Image from 'next/image';

export default function DothemeetCharacter() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div className="w-[181px] h-[203px] relative">
        <Image src={'/svgs/svg_dothemeet_full.svg'} alt="dothemeet" fill priority />
      </div>
    </div>
  );
}
