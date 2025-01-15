import Link from 'next/link';

interface AuthQuestionsProps {
  type: 'signin' | 'signup';
}

export default function AuthQuestions({ type }: AuthQuestionsProps) {
  return (
    <p className="text-sm text-gray500">
      {type === 'signup' ? '아직 계정이 없으신가요? ' : '이미 계정이 있으신가요? '}
      <Link
        href={type === 'signup' ? '/auth/signup' : '/auth/signin?type=email'}
        className="underline font-bold text-gray900"
      >
        {type === 'signup' ? '회원가입하기' : '로그인하기'}
      </Link>
    </p>
  );
}
