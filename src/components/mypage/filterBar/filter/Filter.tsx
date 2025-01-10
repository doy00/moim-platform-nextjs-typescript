import Image from 'next/image';
import filterIcon from '../../../../../public/images/mypage/filter.svg';

export default function Filter() {
  return (
    <div className="border border-background400 rounded-xl bg-background100 px-3.5 py-3">
      <Image src={filterIcon} alt="filter" width={24} height={24} />
    </div>
  );
}
