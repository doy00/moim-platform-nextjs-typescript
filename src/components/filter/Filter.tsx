import Image from 'next/image';
import filterIcon from '@images/mypage/filter.svg';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
  DrawerTitle,
} from '@/components/filter/ui/drawer';
import closeIcon from '@images/mypage/close.svg';
import FilterTabs from './filterTabs/FilterTabs';
import resetIcon from '@images/mypage/reset.svg';

export default function Filter() {
  return (
    <Drawer shouldScaleBackground={false} modal={false} dismissible={true} noBodyStyles={true}>
      <DrawerTrigger>
        <div className="border border-background400 rounded-xl bg-background100 px-3.5 py-3">
          <Image src={filterIcon} alt="filter" width={24} height={24} />
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh] max-w-[960px] rounded-3xl mx-auto bg-background300 ">
        <DrawerHeader>
          <DrawerTitle className="sr-only">필터 옵션</DrawerTitle>
          {/* <div className="border border-background400 rounded-xl bg-background100 px-3.5 py-3">
            <Image src={filterIcon} alt="filter" width={24} height={24} />
          </div> */}
          <DrawerClose className="flex justify-end">
            <Image src={closeIcon} alt="close" width={24} height={24} />
          </DrawerClose>
          <FilterTabs />
        </DrawerHeader>

        <DrawerFooter className="flex flex-row gap-[11px] items-center justify-center">
          <div className="flex items-center py-4 px-6 bg-gray100 rounded-2xl">
            <Image src={resetIcon} alt="reset" width={24} height={24} />
          </div>
          <button className="flex bg-gray950 rounded-2xl py-4 px-12 font-semibold text-body-1-normal text-gray200">
            개의 모임 보기
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
