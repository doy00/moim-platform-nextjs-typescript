'use client';
import { Header } from "@/components/mylike/Header"
import MyLikeCards from "../mylike/MyLikeCards";
import { DuduEmpty } from "../detail/icons/DuduEmpty";
import { IMoimDetail } from "@/types/detail/t-moim";

interface IMyLikePresenter {
  moims: IMoimDetail[];
  // moims: any[];
  onRemoveLike: (e: React.MouseEvent, moimId: string) => void; 
  onClickCard: (moimId: string) => void;
}

export default function MyLikePresenter ({ moims, onRemoveLike, onClickCard }: IMyLikePresenter
  ) {
    // if (moims.length === 0) {
    //   return (
    //     <div className="w-full min-h-screen mx-auto px-4 md:px-20 bg-background200 xs:max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
    //       <Header />
    //       <div className="pt-[14px] relative flex flex-col items-center"><DuduEmpty /></div>
    //       <div className="text-center text-gray600 text-caption-normal">찜한 모임이 없습니다.</div>
    //     </div>
    //   );
    // }

  return (
    <div className="w-full min-h-screen mx-auto px-4 pb-[92px] md:px-20 bg-background200 xs:max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg"
    >
      <Header />
      <MyLikeCards moims={moims} onClickCard={onClickCard} onRemoveLike={onRemoveLike} />
    </div>
  );
}
