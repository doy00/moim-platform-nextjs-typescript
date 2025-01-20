import Image from 'next/image';
import cone from '../../../../../../public/images/mypage/cone.svg';
import puzzle from '../../../../../../public/images/mypage/puzzle-off.svg';
import conversation from '../../../../../../public/images/mypage/conversation.svg';

const TabWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-start gap-2.5 bg-background300 border border-gray100 rounded-2xl px-6 py-4 hover:bg-background400 hover:border-gray200 ">
      {children}
    </div>
  );
};

export function CategoryTab() {
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
  return <div>전체</div>;
}

export function StatusTab() {
  return (
    <div>
      <TabWrapper>모든 모임 보기</TabWrapper>
      <TabWrapper>모집 중이에요</TabWrapper>
      <TabWrapper>진행 중이에요</TabWrapper>
      <TabWrapper>종료된 모임이에요</TabWrapper>
    </div>
  );
}
