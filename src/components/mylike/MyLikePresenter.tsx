'use client';
import { ILikeMoim } from "@/types/detail/i-moim";
import { Header } from "@/components/mylike/Header"
import HomeHero from "../home/HomeHero";
import MyLikeCards from "../mylike/MyLikeCards";

interface IMyLikePresenter {
  moims: ILikeMoim[];
  onRemoveLike: (e: React.MouseEvent, moimId: number) => void; 
  onClickCard: (moimId: number) => void;
}

export default function MyLikePresenter ({ moims, onRemoveLike, onClickCard }: IMyLikePresenter) {
  
  return (
    <div className="
    w-full min-h-screen mx-auto px-4 bg-background200
    xs:max-w-screen-xs
    sm:max-w-screen-sm
    md:max-w-screen-md
    lg:max-w-screen-lg
    "
    >
      <Header />
      <HomeHero />
      <MyLikeCards 
        moims={moims}
        onClickCard={onClickCard}
        onRemoveLike={onRemoveLike}
      />
      
    </div>
  )
}