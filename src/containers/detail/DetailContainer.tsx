'use client';

import { ImageBox } from '@/components/detail/ImageBox';
import { DetailInfo } from '../../components/detail/DetailInfo';
import { DetailParticipants } from '../../components/detail/DetailParticipants';
import { DetailContent } from '../../components/detail/DetailContent';
import { DetailHost } from '@/components/detail/DetailHost';
import { DetailReview } from '../../components/detail/DetailReview';
import { IParticipant } from '@/types/detail';

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
        <DetailHost 
          name="두두씨"
          introduction="안녕하세요! 기획하는 두두입니다."
          hostTag={['기획', '마케팅', '자기계발']}
          profileImage='/svgs/profile.svg'
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