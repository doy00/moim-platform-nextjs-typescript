'use client';

import { ImageBox } from '@/components/detail/ImageBox';
import { DetailInfo } from '../../components/detail/DetailInfo';
import { DetailParticipants } from '../../components/detail/DetailParticipants';
import { DetailContent } from '../../components/detail/DetailContent';
import { DetailReview } from '../../components/detail/DetailReview';

const participants = [
  { userId: 1, image: "/svgs/profile.svg", name: "User 1" },
  { userId: 2, image: "/svgs/profile.svg", name: "User 2" },
  { userId: 3, image: "/svgs/profile.svg", name: "User 3" },
  { userId: 4, image: "/svgs/profile.svg", name: "User 4" },
  { userId: 5, image: "/svgs/profile.svg", name: "User 5" },
  { userId: 6, image: "/svgs/profile.svg", name: "User 6" },
];

export default function DetailContainer(
  // { id }: IGatheringsDetail
  ) {
  // const [gathering, setGathering] = useState<IGatherings | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // const teamId = 'dudemeet';

  // useEffect(() => {
  //   const fetchGatheringDetail = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch(`https://fe-adv-project-together-dallaem.vercel.app/api/${teamId}/gatherings/${id}`);
        
  //       if (!response.ok) {
  //         throw new Error('모임을 불러오는데 실패했습니다.');
  //       }
        
  //       const data = await response.json();
  //       setGathering(data);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : '에러가 발생했습니다.');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchGatheringDetail();
  // }, [id]);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;
  // if (!gathering) return <div>모임을 찾을 수 없습니다.</div>;

  return (
    <div className="detail-container">
      <div className="layout">
        <ImageBox 
          image="/images/image.png"
        />
        <DetailInfo 
          title="모임 타이틀이 들어갑니다." 
          location="위치가 들어갑니다." 
          recruitmentPeriod="모집 일정이 들어갑니다." 
          meetingDate="모임 날짜가 들어갑니다." 
        />
        <DetailParticipants 
          participants={participants}
          
        />
        <DetailContent 
          content="모임 내용이 들어갑니다."
        />
        <DetailReview 
          rating={4}
          content="리뷰 내용이 들어갑니다.리뷰 내용이 들어갑니다.리뷰 내용이 들어갑니다.리뷰 내용이 들어갑니다.리뷰 내용이 들어갑니다."
          author={"작성자"}
          date="25. 02. 01"
          authorImage="/svgs/profile.svg" 
        />
      </div>
    </div>
  );
}