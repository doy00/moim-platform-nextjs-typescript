'use client';

import { useMoimDetail } from '@/hooks/detail/useMoimDetail';
import { useJoinMoim } from '@/hooks/detail/useJoinMoim';
import { useLikeMoim } from '@/hooks/detail/useLikeMoim';
import DetailPresenter from '@/components/detail/DetailPresenter';
import { IParticipant } from '@/types/detail/i-participant';

interface IDetailContainer {
  id: number;
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
  const { detail: detailData, isLoading, error } = useMoimDetail(id);

  // 모임 신청하기, 찜하기 커스텀 훅 사용
  const { joinMoim, isJoining, error: joinError } = useJoinMoim({
    // onSuccess: () => {
    //   // 토스트 메시지
    //   toast.success('모임 신청이 완료되었습니다.');
    });
  if (joinError) return <div>{joinError.message}</div>;

  const { isLiked, isProcessing, toggleLike } = useLikeMoim(id);
  
  // 로딩 상태 처리
  if (isLoading) return <div>Loading...</div>;
  // 에러 상태 처리
  if (error) return <div>Error: {error.message}</div>;

  // 데이터 처리 로직
  const processedData = detailData ? {
    ...detailData,
    location: `${detailData.si} ${detailData.district} ${detailData.roadAddress}`,  // 지역 데이터
    dateTime:detailData.startDate,    // 모집 시작 날짜
    registratonEnd: detailData.endDate,  // 모집 마감 날짜
    participantCount: detailData.participants,  // 참여 인원 수
    capacity: detailData.maxParticipants,       // 정원
    // [ ] 이미지 관련 추가
    // image: detailData.image
    //   ? `${process.env.NEXT_PUBLIC_API_URL}/${detailData.image}`
    //   : DEFAULT_IMAGE.MOIM
  } : undefined;

  return (
    <div className="w-full min-h-screen px-4 pb-[93px] bg-background200">
      <DetailPresenter 
        data={processedData}
        participants={participants} // 임시로 빈 배열
        reviews={undefined} // 임시로 undefined
        isJoining={false} // 임시로 false
        isLiked={false} // 임시로 false
        onJoin={() => joinMoim(id)} // 임시로 빈 함수
        onLikeToggle={() => {}} // 임시로 빈 함수
      />
    </div>
  );
}





/*


'use client';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useMoimDetail } from '@/hooks/detail/useMoimDetail';
import { getDetailInfo, getParticipants, getDetailReviews } from '@/apis/detail/detail.api';
import { useJoinMoim } from '@/hooks/detail/useJoinMoim';
import { useLikeMoim } from '@/hooks/detail/useLikeMoim';
// types
import { IDetailReviewProps, IDetailReviewResponse, IParticipant } from '@/types/detail';
import { IMoimDetail } from '@/types/detail/i-moim'
import { IDetailReview } from '@/types/detail';
// constants
import { DEFAULT_IMAGE } from '@/constants/detail/images';
// uitls
import { formatDate, formatDateRange } from '@/utils/detail/date';
import { DothemeetLogo } from '@/components/detail/icons/Dothemeet';
import DetailPresenter from '@/components/detail/DetailPresenter';

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
  // 모임 데이터 페칭 커스텀 훅 사용
  const {
    info: detailData,
    participants,
    reviews,
    isLoading,
    error
  } = useMoimDetail(id);
  
  // 에러 발생 시 처리
  if (error) return <div>{error.message}</div>;

  // 모임 신청하기, 찜하기 커스텀 훅 사용
  const { joinMoim, isJoining, error: joinError } = useJoinMoim({
    // onSuccess: () => {
    //   // 토스트 메시지
    //   toast.success('모임 신청이 완료되었습니다.');
    });
  if (joinError) return <div>{joinError.message}</div>;

  const { isLiked, isProcessing, toggleLike } = useLikeMoim(id);

  // 데이터 처리 및 변환 로직
  // const processedData: IMoimDetail = detailData ? {
  //   ...detailData,
  //   id: detailData?.id ?? 0,
  //   image: detailData?.image
  //     ? `${process.env.NEXT_PUBLIC_API_URL}/${detailData.image}`
  //     : DEFAULT_IMAGE.MOIM
  // } : {   // [ ] 정리 필요: 데이터가 없을때 기본값
  //   id: 0,
  //   image: DEFAULT_IMAGE.MOIM,
  //   teamId: undefined,
  //   type: '',
  //   name: '',
  //   dateTime: '',
  //   registrationEnd: '',
  //   location: '',
  //   participantCount: 0,
  //   capacity: 0,
  //   createdBy: 0,
  //   createdAt: '',
  //   content: ''
  // };

// 데이터 처리 로직을 분리된 함수로 관리
const processDetailData = (data: IMoimDetail | undefined): IMoimDetail => {
  if (!data) {
    return {
      id: 0,
      type: '',
      name: '',
      dateTime: '',
      registrationEnd: '',
      location: '',
      participantCount: 0,
      capacity: 0,
      createdBy: 0,
      createdAt: '',
      content: '',
      image: DEFAULT_IMAGE.MOIM,
    };
  }

  return {
    ...data,
    image: data.image
      ? `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')}/${data.image}`  // [ ] 400 에러 발생. 주소틀린듯
      : DEFAULT_IMAGE.MOIM
  };
};

const processedData = processDetailData(detailData);




          // 모임 리뷰 조회
          // const reviewData = await getDetailReviews(id);

                    // 먼저 IDetailReview[] 형식으로 변환
                    // const processedReviewData: IDetailReview[] = reviewData.data.map(review => ({
                    //   id: review.id,
                    //   userId: review.userId,
                    //   gatheringId: review.gatheringId,
                    //   rate: review.rate,
                    //   comment: review.comment,
                    //   created_at: review.created_at,
                    //   User: review.User,
                    //   Gathering: review.Gathering,
                    // }));

                    // 그 다음 전체 응답 객체 구성
                    // const processedReviews: IDetailReviewResponse = {
                    //   data: processedReviewData,
                    //   totalItemCount: reviewData.totalItemCount,
                    //   currentPage: reviewData.currentPage,
                    //   totalPages: reviewData.totalPages
                    // };


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
          // setReviews(processedReviews);


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

  //       } catch (err) {
  //         setError('정보를 불러오는데 실패했습니다.');
  //         console.error('Failed to fetch moim detail:', err);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //   if (id) {
  //     fetchData();
  //   }
  // }, [id]);
  

  return (
      <div className="w-full min-h-screen px-4 pb-[93px] bg-background200">
        <Link href="/" className="w-full h-14 py-[10px] flex items-center">
          <DothemeetLogo />
        </Link>

        <DetailPresenter 
          data={processedData}
          participants={participants}
          reviews={reviews}
          isJoining={isJoining}
          isLiked={isLiked}
          // isProcessing={isProcessing}
          onJoin={() => joinMoim(id)}
          onLikeToggle={toggleLike}
        />

        
        {reviews && reviews.data && reviews.data.length > 0 ? (
          reviews.data.map((review, index) => (
          <DetailReview 
            key={index}
            rate={review.rate}
            comment={review.comment || "리뷰 내용이 들어갑니다.리뷰 내용이 들어갑니다.리뷰 내용이 들어갑니다.리뷰 내용이 들어갑니다.리뷰 내용이 들어갑니다."}
          }
            author={processedData.User?.name || "작성자"}
            date={reviews.Gathering?.dateTime || "25. 02. 01"}
            authorImage={reviews.User?.image || DEFAULT_IMAGE.PROFILE}
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
          isJoining={isJoining}
        /> 
        
      </div>
  );
};

*/