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
import { DetailReview } from '../../components/detail/DetailReview';
import { FloatingBar } from '@/components/detail/FloatingBar';
import { DothemeetLogo } from '@/components/detail/icons/Dothemeet';
// types
import { DetailPresenterProps } from '@/types/detail/i-presenter';
import { IMoimDetail, ReviewEmotion, IMoimReview } from '@/types/detail/i-moim';
// constants
import { DEFAULT_IMAGE } from '@/constants/detail/images';
// uitls
import { formatDate, formatDateRange } from '@/utils/detail/date';


export default function DetailPresenter({
  data,
  participants,
  reviews,
  isJoining,
  isLiked,
  onJoin,
  onLikeToggle,
  className,
}: DetailPresenterProps) {


  // 데이터 처리 함수
  const processDetailData = (data: IMoimDetail | undefined): IMoimDetail => {
  // 데이터가 없을때 기본값
  if (!data) {
    return {
      moimId: 0,
      title: '모임 타이틀이 들어갑니다.',
      content: '모임 내용이 들어갑니다.',
      moimType: '프로젝트',
      moimStatus: '',
      si: '',
      district: '',
      roadAddress: '주소를 불러오는 중입니다.',
      startDate: '',
      endDate: '',
      // participants: [],
      participants: 0,
      minParticipants: 0,
      maxParticipants: 12,
      reviews: [],
      
      // [ ] 이미지?
      image: DEFAULT_IMAGE.MOIM,
    };
  }

  return {
    ...data,
    // API에서 전체 URL을 제공하는 경우
    image: data.image?.startsWith('http') 
      ? data.image 
      : data.image 
      ? `${process.env.NEXT_PUBLIC_API_URL}/${data.image}`
      : DEFAULT_IMAGE.MOIM
  };
};

const processedData = processDetailData(data);

// 주소 조합
const fullAddress = processedData ? 
`${processedData.si} ${processedData.district} ${processedData.roadAddress}`.trim() : 
"주소를 불러오는 중입니다.";

// 평점: emotion 문자열을 ReviewEmotion 타입으로 안전하게 변환하는 함수
// [ ] 리팩토링
const convertToReviewEmotion = (emotion: string): ReviewEmotion => {
  switch (emotion) {
    case '그냥그래요':
      return '그냥그래요';
    case '추천해요':
      return '추천해요';
    default:
      return '괜찮아요'; // 기본값
  }
};

  return (
    <div className="w-full min-h-screen px-4 pb-[93px] bg-background200">
        <Link href="/" className="w-full h-14 py-[10px] flex items-center">
          <DothemeetLogo />
        </Link>
        <DetailShare />
        <ImageBox image={DEFAULT_IMAGE.MOIM} />
        <DetailInfo 
          title={processedData?.title }
          location={fullAddress}
          recruitmentPeriod={
            processedData?.startDate && processedData?.endDate
            ? formatDateRange(processedData.startDate, processedData.endDate)
            : "모집 일정이 들어갑니다." }
          meetingDate={
            processedData?.endDate
            ? formatDate(processedData.endDate)
            : "모임 날짜가 들어갑니다." }
          participants={processedData?.participants || 0}
          minParticipants={processedData?.minParticipants || 3 }
        />
        <DetailParticipants 
          participants={participants || []}
          maxParticipants={processedData?.maxParticipants}
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
        {/* {processedData?.reviews && processedData.reviews.length > 0 ? ( */}
          {/* processedData.reviews.map((review, index) => ( */}
          <DetailReview 
            // key={index}
            // reviewCount={processedData.reviews.length}
            // emotion={convertToReviewEmotion(processedData.reviews.emotion)}
            // comment={review.contents || "리뷰 내용이 들어갑니다."}
            // author={review.nickname || "작성자"}
            // date={formatDate(review.createdAt) || "25. 02. 01"}
            // authorImage={DEFAULT_IMAGE.PROFILE}
            reviews={processedData?.reviews || []}
          />
          {/* )) */}
        {/* ) : ( */}
          {/* // 리뷰가 없을 때 */}
          {/* <DetailReview reviewCount={0} /> */}
        {/* )} */}
        

        <FloatingBar
          onHeartClick={onLikeToggle}
          onJoinClick={() => onJoin}
          isLiked={isLiked}
          isJoining={isJoining}
        />
    </div>
  );
}