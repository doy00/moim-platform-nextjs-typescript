import { cn } from "@/lib/utils";
import { ILikeMoim } from "@/types/detail/i-moim"
import { PuzzleIcon } from "./icons/PuzzleIcon";
import { OpenBookIcon } from "./icons/OpenBookIcon";
import { ChipSmallSquircle } from "../detail/ChipSmallSquircle";
import { HeartIcon } from "../detail/icons/HeartIcon";

interface IMoimCard {
  moim: ILikeMoim;
  onRemoveLike: (e: React.MouseEvent, moimId: number) => void;
  onClickCard: (moimId: number) => void;
}

export const MoimCard: React.FC<IMoimCard> = ({ moim, onRemoveLike, onClickCard }) => {
  const isConfirmed = moim.participants >= moim.minParticipants;
  const isProject = moim.moimType === "프로젝트";

  return (
    <div
      // onClick={() => onClickCard(moim.moimId)}  
      className="relative flex flex-col w-full items-center bg-white rounded-2xl shadow-sm cursor-pointer transition-all hover:shadow-md"
    >
      <div className="flex items-center p-4">
        <div className="flex gap-5 items-start">
          <div className={cn(
            "flex w-9 h-9 justify-center items-center rounded-full",
            isProject ? "bg-orange200" : "bg-blue200"
          )}>
            {isProject ? <PuzzleIcon /> : <OpenBookIcon />}
          </div>

          <div className="flex flex-col gap-3">
            {/* Tags and Like Button */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div className="flex gap-1">
                  <ChipSmallSquircle 
                    text={moim.moimType}
                    variant="light"
                  />
                  <ChipSmallSquircle
                    text={`마감 D-10`}
                    variant="light"
                  />

                  {isConfirmed && (
                    <ChipSmallSquircle
                      text="개설확정"
                      variant="dark"
                    />
                  )}
                  </div>

                  {/* 찜버튼 */}
                  <button
                    onClick={(e) => onRemoveLike(e, moim.moimId)}
                    className="p-1 hover:bg-gray50 rounded-full transition-colors"
                  >
                    <HeartIcon />
                  </button>
                </div>

                  {/* 모임 타이틀, 장소 */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-body-1-normal font-medium text-textNormal truncate">
                      {moim.title}
                    </h3>
                    <p className="text-label-normal text-gray500">
                      {`${moim.si} ${moim.district}`}
                      <span className="mx-2 text-gray300">|</span>
                      {`${moim.participants}명 참여`}
                    </p>
                  </div>

                </div>

                {/* 날짜 */}
                <div className="text-caption-normal text-gray500">
                  {`${moim.startDate} - ${moim.endDate}`}
                </div>

              </div>
            </div>
          </div>

        </div>

      
    
  )
}