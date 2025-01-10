import Image from 'next/image';
import filterIcon from '../../../../../public/images/mypage/filter.svg';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
  DrawerTitle,
} from '@/components/mypage/filterBar/filter/ui/drawer';
import closeIcon from '../../../../../public/images/mypage/close.svg';
import FilterTabs from './filterTabs/FilterTabs';

export default function Filter() {
  return (
    <Drawer shouldScaleBackground={false} modal={false} dismissible={true} noBodyStyles={true}>
      <DrawerTrigger>
        <div className="border border-background400 rounded-xl bg-background100 px-3.5 py-3">
          <Image src={filterIcon} alt="filter" width={24} height={24} />
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
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

        <DrawerFooter className="flex justify-center items-center">
          <span>Submit</span>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
