// 상세페이지 하단 찜하기, 신청하기 버튼이 있는 플로팅 바 컴포넌트입니다.
// import { LikeButton } from "./LikeButton";
// import { JoinButton } from "./join/JoinButton";
import { Suspense, lazy } from "react";

// lazy loading
const LikeButton = lazy(() => import('./LikeButton'));
const JoinButton = lazy (() => import('./join/JoinButton'));


interface IFloatingBar {
  onHeartClick: () => void;
  onJoinClick: () => void;  
  isJoining?: boolean;
  isLiked?: boolean;
  actionLabel?: string;
  disabled?: boolean;
}

export const FloatingBar = ({
  onHeartClick,
  onJoinClick,
  isJoining = false,
  isLiked = false,
  actionLabel = '신청하기',
  disabled = false
}: IFloatingBar) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full mx-auto h-19 p-4 bg-background200 shadow-2xl rounded-2xl xs:max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
      <div className="flex items-center gap-3">
        {/* 찜하기 버튼 */}
        <Suspense fallback={<div className="w-[72px] h-14 bg-gray100 rounded-2xl animate-pulse" />}>
          <LikeButton 
            onHeartClick={onHeartClick}
            isLiked={isLiked}
          />
        </Suspense>

        {/* 신청하기 버튼 */}
        <Suspense fallback={<div className="flex-1 h-14 bg-gray400 rounded-2xl animate-pulse" />}>
          <JoinButton 
            onJoinClick={onJoinClick}
            isJoining={isJoining}
            actionLabel={actionLabel}
            disabled={disabled}
          />
        </Suspense>
      </div>
    </div>
  );
};