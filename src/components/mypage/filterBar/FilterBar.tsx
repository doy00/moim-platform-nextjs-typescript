import SwitchFilter from '@/components/mypage/filterBar/SwitchFilter';
import DropDown from '@/components/mypage/filterBar/DropDown';
import Filter from '@/components/filter/Filter';

interface FilterBarProps {
  // onCategorySelect: (category: string | null) => void;
  onStatusSelect: (status: string | null) => void;
  selectedStatus: string | null;
}

export default function FilterBar({ onStatusSelect, selectedStatus }: FilterBarProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-1.5">
        {/* <Filter onCategorySelect={onCategorySelect} onStatusSelect={onStatusSelect} /> */}
        <DropDown
          onFilterChange={(value) => onStatusSelect(value)}
          value={selectedStatus || '전체'}
        />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="font-medium text-body-2-reading text-gray400">개설확정</span>
        <SwitchFilter />
      </div>
    </div>
  );
}
