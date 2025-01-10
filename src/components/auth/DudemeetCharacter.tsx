import Image from 'next/image';

export default function DudemeetCharacter() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div className="absolute w-[155px] h-[155px] bg-background400 rounded-full -translate-y-7"></div>
      <div className="w-[207px] h-[207px] relative">
        <Image src={'/svgs/dudemeet.svg'} alt="dudemeet" fill />
      </div>
    </div>
  );
}
