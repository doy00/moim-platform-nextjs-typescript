import {
  TMoimClient,
  TMoimsJoined,
  TParticipatedUserClient,
  TReviewClient,
} from '@/types/supabase/supabase-custom.type';

export function mapMoimsToClient(moims: TMoimsJoined[]): TMoimClient[] {
  return moims.map((moim) => ({
    moimId: moim.id,
    title: moim.title,
    content: moim.content,
    address: moim.address,
    recruitmentDeadline: moim.recruitment_deadline,
    startDate: moim.start_date,
    endDate: moim.end_date,
    minParticipants: moim.min_participants,
    maxParticipants: moim.max_participants,
    moimType: moim.category,
    status: moim.status,
    likes: moim.liked_counts,
    participants: moim.participants_counts,
    reviewsCount: moim.reviews_counts,
    participatedUsers: moim.participated_moims.map(
      (participatedUser) =>
        ({
          userUuid: participatedUser.user_uuid,
          userEmail: participatedUser.user_email,
          userImage: participatedUser.user_image,
          userNickname: participatedUser.user_nickname,
        }) as TParticipatedUserClient,
    ),
    reviews: moim.reviews.map(
      (review) =>
        ({
          userUuid: review.user_uuid,
          review: review.review,
          rate: review.rate,
          userEmail: review.user_email,
          userImage: review.user_image,
          userNickname: review.user_nickname,
        }) as TReviewClient,
    ),
    isConfirmed: moim.is_confirmed,
    online: moim.online,
    likedUsers: moim.liked_moims.map((likedMoim) => likedMoim.user_uuid as string),
    likedUsers: moim.liked_moims.map((likedMoim) => likedMoim.user_uuid as string),
  }));
}
