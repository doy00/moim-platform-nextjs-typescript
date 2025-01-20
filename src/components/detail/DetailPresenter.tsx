// components/detail/DetailPresenter.tsx 
// 상세페이지 전체 UI 렌더링을 담당하는 컴포넌트
// hooks
import { useJoinMoim } from '@/hooks/detail/useJoinMoim';
import { useLikeMoim } from '@/hooks/detail/useLikeMoim';
import { useMoimDetail } from '@/hooks/detail/useMoimDetail';
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
import { IDetailReview, IDetailReviewResponse, ReviewEmotion } from '@/types/detail/i-review';
import { IMoimDetail } from '@/types/detail/i-moim'
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
  if (!data) {
    return {
      moimId: 0,
      title: '',
      content: '',
      moimType: '',
      moimStatus: '',
      si: '',
      district: '',
      roadAddress: '',
      startDate: '',
      endDate: '',
      // participants: [],
      participants: 0,
      minParticipants: 0,
      maxParticipants: 0,
      reviews: [],
      
      // [ ] 이미지?
      image: DEFAULT_IMAGE.MOIM,
    };
  }

  return {
    ...data,
    image: 
      // data.image
      // ? `${process.env.NEXT_PUBLIC_API_URL}/${data.image}`
      // : 
      DEFAULT_IMAGE.MOIM
  };
};

const processedData = processDetailData(data);

// 주소 조합
const fullAddress = processedData ? 
`${processedData.si} ${processedData.district} ${processedData.roadAddress}`.trim() : 
"위치가 들어갑니다.";

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
        <DetailShare />
        <ImageBox image={DEFAULT_IMAGE.MOIM} />
        {/* <ImageBox 
          image={processedData?.image 
            ? (processedData.image.startsWith('http')
              ? processedData.image
              : DEFAULT_IMAGE.MOIM)    
            : DEFAULT_IMAGE.MOIM}
        /> */}
        <DetailInfo 
          title={processedData?.title || "모임 타이틀이 들어갑니다." }
          location={fullAddress || "위치가 들어갑니다."}
          recruitmentPeriod={
            processedData?.startDate && processedData?.endDate
            ? formatDateRange(processedData.startDate, processedData.endDate)
            : "모집 일정이 들어갑니다." }
          meetingDate={
            processedData?.endDate
            ? formatDate(processedData.endDate)
            : "모임 날짜가 들어갑니다." }
        />
        <DetailParticipants 
          participants={participants || []}
          
        />
        <DetailContent 
          content={ processedData?.content || "모임 내용이 들어갑니다."}
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
        {processedData?.reviews && processedData.reviews.length > 0 ? (
          processedData.reviews.map((review, index) => (
          <DetailReview 
            key={index}
            emotion={convertToReviewEmotion(review.emotion)}
            comment={review.contents || "리뷰 내용이 들어갑니다."}
            author={review.nickname || "작성자"}
            date={formatDate(review.createdAt) || "25. 02. 01"}
            authorImage={DEFAULT_IMAGE.PROFILE}
            reviewCount={processedData.reviews.length}
          />
          ))
        ) : (
          // 리뷰가 없을 때
          <DetailReview reviewCount={0} />
        )}
        

        <FloatingBar
          onHeartClick={onLikeToggle}
          onJoinClick={() => onJoin}
          isLiked={isLiked}
          isJoining={isJoining}
        />
      {/* <FloatingBar
        onHeartClick={onLikeToggle}
        onJoinClick={onJoin}
        isLiked={isLiked}
        isJoining={isJoining}
      /> */}
    </div>
  );
}