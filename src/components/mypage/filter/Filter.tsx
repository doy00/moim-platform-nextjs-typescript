import Image from 'next/image';
import filterIcon from '../../../../public/images/mypage/filter.svg';
import { Switch } from '@/components/mypage/ui/switch';
import DropDown from '@/components/mypage/dropDown/DropDown';

export default function Filter() {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-1.5">
        <div className="border border-background400 rounded-xl bg-background100 px-3.5 py-3">
          <Image src={filterIcon} alt="filter" width={24} height={24} />
        </div>
        <DropDown />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="font-medium text-body-2-reading text-gray400">개설확정</span>
        <Switch />
      </div>
    </div>
  );
}
