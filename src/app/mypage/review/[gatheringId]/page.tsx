import CreateReview from '@/components/mypage/myReview/CreateReview';
import { IParticipatedMoim } from '@/types/mypage/moim.type';
import { IUser } from '@/types/mypage/user';

interface Props {
  participatedMoim: IParticipatedMoim;
}

export default function Review({ participatedMoim }: Props) {
  return (
    <div>
      <CreateReview moim={participatedMoim} />
    </div>
  );
}
