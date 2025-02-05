// components/detail/DetailPresenter.tsx
// 상세페이지 전체 UI 렌더링을 담당하는 컴포넌트
'use client';
import Link from 'next/link';
// components
import { DetailHost } from '@/components/detail/DetailHost';
import { DetailShare } from '@/components/detail/DetailShare';
import { FloatingBar } from '@/components/detail/FloatingBar';
import { DothemeetLogo } from '@/components/detail/icons/Dothemeet';
import { ImageBox } from '@/components/detail/ImageBox';
import { DetailContent } from '../../components/detail/DetailContent';
import { DetailInfo } from '../../components/detail/DetailInfo';
import { DetailParticipants } from '../../components/detail/DetailParticipants';
import { DetailReview } from '../../components/detail/DetailReview';
// types
import { IDetailPresenterProps } from '@/types/detail/i-presenter';
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
  if (!data) {
    return null; // 또는 loading/error UI
    // 데이터가 없을때 기본값
    // return {
    //   moimId: '',
    //   title: '모임 타이틀이 들어갑니다.',
    //   content: '모임 내용이 들어갑니다.',
    //   address: '주소를 불러오는 중입니다.',
    //   recruitmentDeadline: new Date().toISOString(),
    //   startDate: new Date().toISOString(),
    //   endDate: new Date().toISOString(),
    //   minParticipants: 3,
    //   maxParticipants: 12,
    //   moimType: 'PROJECT',
    //   status: 'RECRUIT',
    //   likes: 0,
    //   participants: 0,
    //   reviewsCount: 0,
    //   participatedUsers: [],
    //   reviews: [],
    //   isConfirmed: false,
    //   online: false,
    //   likedUsers: [],
    // };
  }

  return (
    <div
      className="
      w-full min-h-screen mx-auto px-4 pb-[92px] bg-background200
      xs:max-w-screen-xs
      sm:max-w-screen-sm
      md:max-w-screen-md
      lg:max-w-screen-lg
      "
    >
      {/* <SignOutButton /> */}
      <Link href="/" className="w-full h-14 py-[10px] flex items-center">
        <DothemeetLogo />
      </Link>
      <DetailShare />
      <ImageBox image={DEFAULT_IMAGE.MOIM} />
      <DetailInfo
        title={data.title}
        address={data.address}
        startDate={data.startDate}
        recruitmentDeadline={data.recruitmentDeadline}
        endDate={data.endDate}
        participants={data.participants}
        minParticipants={data.minParticipants}
        moimType={data.moimType}
        isConfirmed={data.isConfirmed}
        status={data.status}
        online={data.online}
      />
      <DetailParticipants
        participants={data.participatedUsers}
        maxParticipants={data.maxParticipants}
        minParticipants={data.minParticipants}
        currentParticipants={data.participants}
      />
      <DetailContent content={data.content} />
      <DetailHost
        nickname="두두씨"
        // name={data.participatedUsers[0]?.userNickname }
        introduction="안녕하세요! 기획하는 두두입니다."
        tags={['기획', '마케팅', '자기계발']}
        image={
          // data?.image ||
          DEFAULT_IMAGE.PROFILE
        }
      />
      {/* 리뷰 목록 */}
      <DetailReview
        reviews={data.reviews}
        totalReviews={data.reviewsCount}
        // reviews={MOCK_REVIEWS}
      />
      <FloatingBar
        onHeartClick={onLikeToggle}
        onJoinClick={() => onJoin}
        isLiked={isLiked}
        isJoining={isJoining}
        // stauts={data.status}
      />
    </div>
  );
}
