import Link from 'next/link';
import AuthButton from './AuthButton';
import DudemeetLogo from './DudemeetLogo';
import Kakao from './Kakao';

interface SelectAuthProps {
  children: React.ReactNode;
}

export default function SelectAuth({ children }: SelectAuthProps) {
  return (
    <div className="w-[327px] min-h-dvh flex flex-col items-center justify-center">
      <div className="flex-1 flex items-center justify-center">
        <DudemeetLogo />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4 pb-12">
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <Link href="/signin?type=kakao" className="w-full">
            <AuthButton>
              <Kakao className="w-5 h-5" /> 카카오로 시작하기
            </AuthButton>
          </Link>
          <Link href="/signup" className="w-full">
            <AuthButton>이메일로 시작하기</AuthButton>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
