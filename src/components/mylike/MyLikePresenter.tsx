'use client';
import { Header } from '../detail/Header';
import MyLikeCards from '../mylike/MyLikeCards';
import { IMoimDetail } from '@/types/detail/t-moim';

interface IMyLikePresenter {
  moims: IMoimDetail[];
  onRemoveLike: (e: React.MouseEvent, moimId: string) => void;
  onClickCard: (moimId: string) => void;
}

export default function MyLikePresenter({ moims, onRemoveLike, onClickCard }: IMyLikePresenter) {
  return (
    <main className="w-full min-h-screen mx-auto px-4 pb-[92px] md:px-20 bg-background200 xs:max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg" aria-labelledby="mylike-title">
      <Header />
      <h1 id="mylike-title" className="sr-only">찜한 모임 목록</h1>
      <section>
        <MyLikeCards moims={moims} onClickCard={onClickCard} onRemoveLike={onRemoveLike} />
      </section>
    </main>
  );
}
