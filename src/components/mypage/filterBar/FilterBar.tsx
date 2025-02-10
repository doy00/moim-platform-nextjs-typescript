import SwitchFilter from '@/components/mypage/filterBar/SwitchFilter';
import DropDown from '@/components/mypage/filterBar/DropDown';
import Filter from '@/components/filter/Filter';

interface FilterBarProps {
  onStatusSelect: (status: string | null) => void;
  selectedStatus: string | null;
  onConfirmedFilter: (isConfirmed: boolean) => void;
  isConfirmed: boolean;
}

export default function FilterBar({
  onStatusSelect,
  selectedStatus,
  onConfirmedFilter,
  isConfirmed,
}: FilterBarProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-1.5">
        <DropDown
          onFilterChange={(value) => onStatusSelect(value)}
          value={selectedStatus || '전체'}
        />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="font-medium text-body-2-reading text-gray400">개설확정</span>
        <SwitchFilter onFilterChange={onConfirmedFilter} isOn={isConfirmed} />
      </div>
    </div>
  );
}
