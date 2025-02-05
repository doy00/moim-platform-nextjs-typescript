import Image from 'next/image';
import cone from '@images/mypage/cone.svg';
import puzzle from '@images/mypage/puzzle-off.svg';
import conversation from '@images/mypage/conversation.svg';
import announcementIcon from '@images/mypage/announcement.svg';
import fireIcon from '@images/mypage/fire.svg';
import wavingHand from '@images/mypage/waving-hand.svg';

const TabWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-start gap-2.5 bg-background300 border border-gray100 rounded-2xl px-6 py-4 hover:bg-background400 hover:border-gray200 cursor-pointer">
      {children}
    </div>
  );
};

interface CategoryStatusTabProps {
  onCategorySelect: (category: string | null) => void;
  onStatusSelect: (status: string | null) => void;
}

export function CategoryTab({ onCategorySelect }: CategoryStatusTabProps) {
  return (
    <div className="flex flex-col gap-[11px]">
      <TabWrapper>
        <Image src={cone} alt="cone" width={24} height={24} />
        <span className="font-semibold text-body-2-normal text-gray400">모든 모임 보기</span>
      </TabWrapper>
      <TabWrapper>
        <Image src={puzzle} alt="puzzle" width={24} height={24} />
        <span className="font-semibold text-body-2-normal text-gray400">프로젝트</span>
      </TabWrapper>
      <TabWrapper>
        <Image src={puzzle} alt="puzzle" width={24} height={24} />
        <span className="font-semibold text-body-2-normal text-gray400">스터디</span>
      </TabWrapper>
      <TabWrapper>
        <Image src={conversation} alt="conversation" width={24} height={24} />
        <span className="font-semibold text-body-2-normal text-gray400">면접</span>
      </TabWrapper>
    </div>
  );
}

export function LocationTab() {
  return (
    <div className="grid grid-cols-2 gap-[11px]">
      <TabWrapper>
        <span className="mx-auto font-semibold text-body-2-normal text-gray400">전체</span>
      </TabWrapper>
      <TabWrapper>
        <span className="mx-auto font-semibold text-body-2-normal text-gray400">서울</span>
      </TabWrapper>
      <TabWrapper>
        <span className="mx-auto font-semibold text-body-2-normal text-gray400">경기</span>
      </TabWrapper>
      <TabWrapper>
        <span className="mx-auto font-semibold text-body-2-normal text-gray400">인천</span>
      </TabWrapper>
      <TabWrapper>
        <span className="mx-auto font-semibold text-body-2-normal text-gray400">강원</span>
      </TabWrapper>
      <TabWrapper>
        <span className="mx-auto font-semibold text-body-2-normal text-gray400">대전</span>
      </TabWrapper>
      <TabWrapper>
        <span className="mx-auto font-semibold text-body-2-normal text-gray400">세종</span>
      </TabWrapper>
      <TabWrapper>
        <span className="mx-auto font-semibold text-body-2-normal text-gray400">충청</span>
      </TabWrapper>
    </div>
  );
}

export function StatusTab({ onStatusSelect }: CategoryStatusTabProps) {
  return (
    <div className="flex flex-col gap-[11px]">
      <TabWrapper>
        <Image src={cone} alt="cone" width={24} height={24} />

        <span className="font-semibold text-body-2-normal text-gray400">모든 모임 보기</span>
      </TabWrapper>
      <TabWrapper>
        <Image src={announcementIcon} alt="puzzle" width={24} height={24} />
        <span className="font-semibold text-body-2-normal text-gray400">모집 중이에요</span>
      </TabWrapper>
      <TabWrapper>
        <Image src={fireIcon} alt="puzzle" width={24} height={24} />
        <span className="font-semibold text-body-2-normal text-gray400">진행 중이에요</span>
      </TabWrapper>
      <TabWrapper>
        <Image src={wavingHand} alt="puzzle" width={24} height={24} />
        <span className="font-semibold text-body-2-normal text-gray400">종료된 모임이에요</span>
      </TabWrapper>
    </div>
  );
}
