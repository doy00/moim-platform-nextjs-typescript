// components/detail/DetailPresenter.tsx 
// 상세페이지 전체 UI 렌더링을 담당하는 컴포넌트
import Link from 'next/link';
// components 
import { DetailShare } from '@/components/detail/DetailShare';
import { ImageBox } from '@/components/detail/ImageBox';
import { DetailInfo } from '../../components/detail/DetailInfo';
import { DetailParticipants } from '../../components/detail/DetailParticipants';
import { DetailContent } from '../../components/detail/DetailContent';
import { DetailHost } from '@/components/detail/DetailHost';
import { DetailReview, MOCK_REVIEWS } from '../../components/detail/DetailReview';
import { FloatingBar } from '@/components/detail/FloatingBar';
import { DothemeetLogo } from '@/components/detail/icons/Dothemeet';
// types
import { IDetailPresenterProps } from '@/types/detail/i-presenter';
import { IMoimDetail } from '@/types/detail/t-moim';
// constants
import { DEFAULT_IMAGE } from '@/constants/detail/detail.const';

export default function DetailPresenter({
  data,
  participants,
  reviews,
  isJoining,
  isLiked,
  onJoin,
  onLikeToggle,
  className,
}: IDetailPresenterProps) {
  // 데이터 처리 함수
  const processDetailData = (data: IMoimDetail | null): IMoimDetail => {
    // 데이터가 없을때 기본값
    if (!data) {
      return {
        moimId: '',
        title: '모임 타이틀이 들어갑니다.',
        content: '모임 내용이 들어갑니다.',
        address: '주소를 불러오는 중입니다.',
        recruitmentDeadline: new Date().toISOString(),
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        minParticipants: 0,
        maxParticipants: 12,
        moimType: 'PROJECT',
        status: 'RECRUIT',
        likes: 0,
        participants: 0,
        reviewsCount: 0,
        participantsMoims: [],
        reviews: []
      };
    }
    return data
  };

const processedData = processDetailData(data);

  return (
    <div className="
      w-full min-h-screen mx-auto px-4 pb-[92px] bg-background200
      xs:max-w-screen-xs
      sm:max-w-screen-sm
      md:max-w-screen-md
      lg:max-w-screen-lg
      "
    >
        <Link href="/" className="w-full h-14 py-[10px] flex items-center">
          <DothemeetLogo />
        </Link>
        <DetailShare />
        <ImageBox image={DEFAULT_IMAGE.MOIM} />
        <DetailInfo 
          title={processedData?.title}
          address={processedData?.address}
          startDate={processedData?.startDate}
          recruitmentDeadline={processedData?.recruitmentDeadline}
          endDate={processedData?.endDate}        
          participants={processedData?.participants || 0}
          minParticipants={processedData?.minParticipants || 3 }
          moimType={processedData?.moimType}
          status={processedData?.status}
        />
        <DetailParticipants 
          data={processedData}
        />
        <DetailContent 
          content={processedData?.content}
        />
        <DetailHost 
          name="두두씨"
          introduction="안녕하세요! 기획하는 두두입니다."
          hostTag={['기획', '마케팅', '자기계발']}
          profileImage={
            // data?.image || 
            DEFAULT_IMAGE.PROFILE}
        />
        {/* 리뷰 목록 */}
        <DetailReview 
          reviews={processedData?.reviews}
          // reviews={MOCK_REVIEWS}
        />
        <FloatingBar
          onHeartClick={onLikeToggle}
          onJoinClick={() => onJoin}
          isLiked={isLiked}
          isJoining={isJoining}
        />
    </div>
  );
}