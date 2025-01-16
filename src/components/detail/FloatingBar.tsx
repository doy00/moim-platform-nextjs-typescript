// 상세페이지 하단 찜하기, 신청하기 버튼이 있는 플로팅 바 컴포넌트입니다.
import { HeartIcon } from "./icons/HeartIcon";
import { HeartEmptyIcon } from "./icons/HeartEmptyIcon";
import { ToasterDark } from "./ToasterDark";

interface IFloatingBar {
  onHeartClick: () => void;
  onJoinClick: () => Promise<{success: boolean; message: string}>;
  isLiked?: boolean;
  actionLabel?: string;
  disabled?: boolean;
}

export const FloatingBar = ({
  onHeartClick,
  onJoinClick,
  isLiked = false,
  actionLabel = '신청하기',
  disabled = false
}: IFloatingBar) => {
  




  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full max-w-[500px] mx-auto h-19 p-4 bg-background200">
      <div className="flex items-center gap-3">
        {/* 찜하기 버튼 */}
        <button
          onClick={onHeartClick}
          className={`flex items-center justify-center w-[72px] h-14 p-4 rounded-2xl bg-gray100 transition-all duration-200 hover:bg-gray200    
          
          `} 
          aria-label="찜하기"
        >
          <div className={`relative w-5 h-5
                          ${
                            isLiked ? 'text-red200' : 'text-gray300'
                          }
            `}>
            <div
              className={`absolute transition-opacity duration-200  ${
                isLiked ? 'opacity-100 scale-110' : 'opacity-0'
              }`}
            >
              <HeartIcon />
            </div>
            <div
              className={`absolute inset-0 transition-opacity duration-200 ${
                isLiked ? 'opacity-0' : 'opacity-100 scale-110'
              }`}
            >
              <HeartEmptyIcon />
            </div>
          </div>
        </button>

        {/* 신청하기 버튼 */}
        <button 
          onClick={onJoinClick}
          disabled={disabled}
          className="flex-1 h-14 min-w-65 bg-gray950 rounded-2xl text-gray200 text-body-1-normal font-semibold  hover:bg-gray800 transition-all duration-200"
        >
          {actionLabel}
        </button>
        <ToasterDark position="bottom-center" duration={2000} />
      </div>
    </div>
  );
};