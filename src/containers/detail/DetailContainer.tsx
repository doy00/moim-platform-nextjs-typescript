'use client';
import { getDetailInfo, getParticipants, getDetailReviews } from '@/apis/detail/detail.api';
import { useJoinMoim } from '@/hooks/detail/useJoinMoim';
import { useLikeMoim } from '@/hooks/detail/useLikeMoim';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { useMoimDetail } from '@/hooks/detail/useMoimDetail';
// components 
import { DetailShare } from '@/components/detail/DetailShare';
import { ImageBox } from '@/components/detail/ImageBox';
import { DetailInfo } from '../../components/detail/DetailInfo';
import { DetailParticipants } from '../../components/detail/DetailParticipants';
import { DetailContent } from '../../components/detail/DetailContent';
import { DetailHost } from '@/components/detail/DetailHost';
import { DetailReview } from '../../components/detail/DetailReview';
import { IDetailReviewProps, IDetailReviewResponse, IParticipant } from '@/types/detail';
import { IMoimDetail } from '@/types/detail/i-moim'
import { IDetailReview } from '@/types/detail';
import { FloatingBar } from '@/components/detail/FloatingBar';
import { DothemeetLogo } from '@/components/detail/icons/Dothemeet';
// constants
import { DEFAULT_IMAGE } from '@/constants/detail/images';
// uitls
import { formatDate, formatDateRange } from '@/utils/detail/date';

interface IDetailContainer {
  id: number;
  // initialData?: {
  //   detailInfo: IMoimDetail;
  //   participants: IParticipant[];
  //   reviews: IDetailReviewProps[];
  // }
}

// mock participants
const participants: IParticipant[] = [
  {
    teamId: 1,
    userId: 1,
    gatheringId: 1,
    joinedAt: new Date().toISOString(),
    User: {
      id: 1,
      email: "user1@example.com",
      name: "User 1",
      companyName: "Company A",
      image: "/svgs/profile.svg"
    }
  },
  {
    teamId: 1,
    userId: 2,
    gatheringId: 1,
    joinedAt: new Date().toISOString(),
    User: {
      id: 2,
      email: "user2@example.com",
      name: "User 2",
      companyName: "Company B",
      image: "/svgs/profile.svg"
    }
  },
  {
    teamId: 1,
    userId: 3,
    gatheringId: 1,
    joinedAt: new Date().toISOString(),
    User: {
      id: 3,
      email: "user3@example.com",
      name: "User 3",
      companyName: "Company C",
      image: "/svgs/profile.svg"
    }
  },
  {
    teamId: 1,
    userId: 4,
    gatheringId: 1,
    joinedAt: new Date().toISOString(),
    User: {
      id: 4,
      email: "user4@example.com",
      name: "User 4",
      companyName: "Company D",
      image: "/svgs/profile.svg"
    }
  },
  {
    teamId: 1,
    userId: 5,
    gatheringId: 1,
    joinedAt: new Date().toISOString(),
    User: {
      id: 5,
      email: "user5@example.com",
      name: "User 5",
      companyName: "Company E",
      image: "/svgs/profile.svg"
    }
  },
  {
    teamId: 1,
    userId: 6,
    gatheringId: 1,
    joinedAt: new Date().toISOString(),
    User: {
      id: 6,
      email: "user6@example.com",
      name: "User 6",
      companyName: "Company F",
      image: "/svgs/profile.svg"
    }
  },
];

export default function DetailContainer({ id }: IDetailContainer) {
  const { joinMoim, isJoined } = useJoinMoim();
  const { isLiked, isProcessing, toggleLike } = useLikeMoim(id);
  // tanstack query 사용
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['moimDetail', id],
  //   qureryFn: async () => {
      [ ]
  //   }
  // })
  // const { 
  //   info, 
  //   participants, reviews, isLoading 
  // } = useMoimDetail(id); // 커스텀훅 사용

    // 데이터 확인용 axios만 사용
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<IMoimDetail | null>(null);
    const [reviews, setReviews] = useState<IDetailReviewResponse | null >(null);
    // {
    //   data: IDetailReviewProps[];
    //   totalItemCount: number;
    //   currentPage: number;
    //   totalPages: number;
    // }
      // | null>(null);

    useEffect(() => {
      async function fetchData() {
        try {
          // 모임 정보(Detail Info) 조회
          const detailData = await getDetailInfo(id);
          console.log('API Response:', detailData);

          const processedData: IMoimDetail = {
            ...detailData,
            image: detailData.image
            ? `${process.env.NEXT_PUBLIC_API_URL}/${detailData.image}` 
            : DEFAULT_IMAGE.MOIM
          };
          setData(processedData);

          // [ ] 수정필요: Info 데이터 처리 - 이미지를 찾을 수 없을때 이미지 URL 처리
          // const processedData: IMoimDetail = {
          //   ...data,
            
          //   image: data.image 
          //     ? `${process.env.NEXT_PUBLIC_API_URL}/${data.image}` 
          //     : DEFAULT_IMAGE.MOIM
          // };
          // setData(processedData);



          // 모임 리뷰 조회
          const reviewData = await getDetailReviews(id);

// 먼저 IDetailReview[] 형식으로 변환
const processedReviewData: IDetailReview[] = reviewData.data.map(review => ({
  id: review.id,
  userId: review.userId,
  gatheringId: review.gatheringId,
  rate: review.rate,
  comment: review.comment,
  created_at: review.created_at,
  User: review.User,
  Gathering: review.Gathering,
}));

// 그 다음 전체 응답 객체 구성
const processedReviews: IDetailReviewResponse = {
  data: processedReviewData,
  totalItemCount: reviewData.totalItemCount,
  currentPage: reviewData.currentPage,
  totalPages: reviewData.totalPages
};


          // const processedReviews: IDetailReviewResponse = 
          // {
          //   data: reviewData.data.map((review) => ({
          //     rate: review.rate,
          //     comment: review.comment,
          //     author: review.User?.name || 'Unknown',
          //     date: new Date(review.created_at).toLocaleDateString('ko-KR', {
          //       year: '2-digit',
          //       month: '2-digit',
          //       day: '2-digit'
          //     }),
          //     authorImage: review.User?.image || DEFAULT_IMAGE.PROFILE,
          //   })),
          //   totalItemCount: reviewData.totalItemCount,
          //   currentPage: reviewData.currentPage,
          //   totalPages: reviewData.totalPages,
          // };
          setReviews(processedReviews);


          // if (!data) {
          //   throw new Error('데이터가 존재하지 않습니다');
          // }
          
          

          // 리뷰 데이터 처리 - IDetailReviewProps 형식으로 변환
          // const processedReviews: IDetailReviewProps[] = reviewResponse.data.map(review => ({
          //   rate: review.rate,
          //   comment: review.comment,
          //   author: review.User?.name,
          //   date: new Date(review.created_at).toLocaleDateString('ko-KR', {
          //     year: '2-digit',
          //     month: '2-digit',
          //     day: '2-digit'
          //   }),
          //   authorImage: review.User?.image || DEFAULT_IMAGE.PROFILE,
          // }));
          // setReviews(processedReviews || []);

        } catch (err) {
          setError('정보를 불러오는데 실패했습니다.');
          console.error('Failed to fetch moim detail:', err);
        } finally {
          setIsLoading(false);
        }
      }
    if (id) {
      fetchData();
    }
  }, [id]);
  


  if (isLoading) return <div></div>;

  return (
      <div className="w-full min-h-screen px-4 pb-[93px] bg-background200">
        <Link href="/" className="w-full h-14 py-[10px] flex items-center">
          <DothemeetLogo />
        </Link>

        <DetailShare />
        <ImageBox 
          image={data?.image 
            ? (data.image.startsWith('http')
              ? data.image
              : DEFAULT_IMAGE.MOIM)    
            : DEFAULT_IMAGE.MOIM}
        />
        <DetailInfo 
          title={data?.name || "모임 타이틀이 들어갑니다." }
          location={data?.location || "위치가 들어갑니다."}
          recruitmentPeriod={
            data?.createdAt && data?.registrationEnd 
            ? formatDateRange(data.createdAt, data.registrationEnd)
            : "모집 일정이 들어갑니다." }
          meetingDate={
            data?.dateTime 
            ? formatDate(data.dateTime)
            : "모임 날짜가 들어갑니다." }
        />
        <DetailParticipants 
          participants={participants || []}
          
        />
        <DetailContent 
          content={
            data?.content || 
            "모임 내용이 들어갑니다."}
        />
        <DetailHost 
          name="두두씨"
          introduction="안녕하세요! 기획하는 두두입니다."
          hostTag={['기획', '마케팅', '자기계발']}
          profileImage={
            // data?.image || 
            DEFAULT_IMAGE.PROFILE}
        />
        {reviews && reviews.data && reviews.data.length > 0 ? (
          reviews.data.map((review, index) => (
          <DetailReview 
            key={index}
            rate={review.rate}
            comment={review.comment || "리뷰 내용이 들어갑니다.리뷰 내용이 들어갑니다.리뷰 내용이 들어갑니다.리뷰 내용이 들어갑니다.리뷰 내용이 들어갑니다."}
            author={review.User?.name || "작성자"}
            date={review.Gathering?.dateTime || "25. 02. 01"}
            authorImage={review.User?.image || DEFAULT_IMAGE.PROFILE}
            reviewCount={reviews.data.length}
          />
          ))
        ) : (
          // 리뷰가 없을 때
          <DetailReview reviewCount={0} />
        )}
        
        <FloatingBar
          onHeartClick={toggleLike}
          onJoinClick={() => joinMoim(id)}
          isLiked={isLiked}
        />
      </div>
  );
}