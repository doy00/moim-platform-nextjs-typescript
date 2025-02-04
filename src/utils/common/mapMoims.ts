import { TMoimClient, TMoimsJoined } from '@/types/supabase/supabase-custom.type';

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
    participantsMoims: moim.participated_moims,
    reviews: moim.reviews,
    isConfirmed: moim.is_confirmed,
    online: moim.online,
  }));
}
