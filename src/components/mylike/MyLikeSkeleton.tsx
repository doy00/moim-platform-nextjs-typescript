import { GatheringSkeleton } from "../mypage/gatheringCard/GatheringCard";
import Header from "../mypage/header/Header";

export const MyLikeSkeleton = () => {
  const visibleSkeletons = 2;
  return (
    <div className="w-full min-h-screen mx-auto px-4 bg-background200 xs:max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
      <Header />
      <div className="flex flex-col gap-4 md:gap-6 lg:grid lg:grid-cols-2">
        {/* {[...new Array(visibleSkeletons)].map((_, index) => ( */}
        <GatheringSkeleton />
        <GatheringSkeleton />
        {/* ))} */}
      </div>
    </div>
  );
}