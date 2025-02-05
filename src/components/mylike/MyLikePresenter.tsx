'use client';
import { Header } from '@/components/mylike/Header';
import HomeHero from '../home/HomeHero';
import MyLikeCards from '../mylike/MyLikeCards';

interface IMyLikePresenter {
  moims: any[]; // 빌드 에러로 임시로 any 처리했습니다.
  onRemoveLike: (e: React.MouseEvent, moimId: number) => void;
  onClickCard: (moimId: number) => void;
}

export default function MyLikePresenter({ moims, onRemoveLike, onClickCard }: IMyLikePresenter) {
  return (
    <div
      className="
    w-full min-h-screen mx-auto px-4 bg-background200
    xs:max-w-screen-xs
    sm:max-w-screen-sm
    md:max-w-screen-md
    lg:max-w-screen-lg
    "
    >
      <Header />
      {/* 잘 모르겠어서 우선 data props 빈배열로 처리했습니다. */}
      <HomeHero data={[]} />
      <MyLikeCards moims={moims} onClickCard={onClickCard} onRemoveLike={onRemoveLike} />
    </div>
  );
}
