import CreateReview from '@/components/mypage/myReview/CreateReview';
import { IMoim } from '@/types/mypage/moim.type';
import { IUser } from '@/types/mypage/user';

interface Props {
  moim: IMoim;
  user: IUser;
}

export default function Review({ moim, user }: Props) {
  return (
    <div>
      <CreateReview moim={moim} user={user} />
    </div>
  );
}
