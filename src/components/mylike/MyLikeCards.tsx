'use client';
// import IntersectionObserver from '@/libs/home/intersectionObserver';
// import { useFilterStore } from '@/stores/home/filterStore';
import MyLikeCard from './MyLikeCard';
import { IMoimDetail } from '@/types/detail/t-moim';

interface IMyLikeCards {
  moims: IMoimDetail[];
  onRemoveLike: (e: React.MouseEvent, moimId: string) => void;
  onClickCard: (moimId: string) => void;
}
export default function MyLikeCards (
  {
    moims,
    onRemoveLike,
    onClickCard,
  }: IMyLikeCards) {

  return (
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 pt-[14px]">
        {moims.map((moim) => (
          <MyLikeCard 
            key={moim.moimId} 
            moim={moim} 
            onClick={() => onClickCard(moim.moimId)}
            onRemoveLike={(e) => onRemoveLike(e, moim.moimId)}
          />
        ))}
      </div>
  );
}
