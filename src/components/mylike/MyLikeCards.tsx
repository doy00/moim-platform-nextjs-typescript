// HomeCards 사용
'use client';

import { useFilterStore } from '@/stores/home/filterStore';
import MyLikeCard from './MyLikeCard';

interface IMyLikeCards {
  moims: any[]; // 빌드 에러로 임시로 any 처리했습니다.
  onRemoveLike: (e: React.MouseEvent, moimId: number) => void;
  onClickCard: (moimId: number) => void;
}
export default function MyLikeCards({ moims, onRemoveLike, onClickCard }: IMyLikeCards) {
  const { moimType, region, moimStatus, sortOrder } = useFilterStore();
  console.log('Before filtering:', moims);

  // const { fetchLikes } = useLikeStore()

  // useEffect(() => {
  //   fetchLikes();
  // }, [fetchLikes]);

  // React Query로 데이터 가져오기
  // const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  //   queryKey: ['moims'],
  //   queryFn: ({ pageParam = 1 }) => fetchMoims({ pageParam }),
  //   getNextPageParam: (lastPage) =>
  //     lastPage.pagination.current_page < lastPage.pagination.total_pages
  //       ? lastPage.pagination.current_page + 1
  //       : undefined,
  //   initialPageParam: 1,
  // });

  // 클라이언트 필터링
  // const filteredMoims = moims?.pages.flatMap((page) =>
  //   page.data.filter((moim: ILikeMoim) => {
  //     // 필터 조건 적용
  //     return (
  //       (!moimType || moim.moimType === moimType) &&
  //       (!region || region.includes(moim.roadAddress)) &&
  //       (!moimStatus || moim.moimStatus === moimStatus)
  //     );
  //   })
  // );
  // 필터링 로직 적용
  // const filteredMoims = moims.filter((moim) => {
  //   return (
  //     (!moimType || moim.moimType === moimType) &&
  //     (!region || region.includes(moim.roadAddress)) &&
  //     (!moimStatus || moim.moimStatus === moimStatus)
  //   );
  // });
  const filteredMoims = moims.filter((moim) => {
    const typeMatch = !moimType || moim.moimType === moimType;
    const regionMatch = !region || region.includes(moim.roadAddress);
    const statusMatch = !moimStatus || moim.moimStatus === moimStatus;

    return typeMatch && regionMatch && statusMatch;
  });
  console.log('After filtering:', filteredMoims);
  console.log('Current filters:', { moimType, region, moimStatus });

  // const handleIntersect = () => {
  //   if (hasNextPage) fetchNextPage();
  // };

  // 필터링 결과가 없을 때 메시지 표시
  // if (filteredMoims.length === 0) {
  //   return (
  //     <div className="pt-[14px] text-center text-gray-500">
  //       표시할 모임이 없습니다.
  //     </div>
  //   );
  // }

  return (
    <div className="pt-[14px] space-y-4">
      {moims.map((item) => (
        <MyLikeCard
          key={item.moimId}
          moim={item}
          onClick={() => onClickCard(item.moimId)}
          onRemoveLike={(e) => onRemoveLike(e, item.moimId)}
        />
      ))}
    </div>
  );
}
