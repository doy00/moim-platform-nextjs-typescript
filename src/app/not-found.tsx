import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">찾을 수 없는 페이지입니다.</h2>
      <Image src="/svgs/svg_dudu_empty.svg" alt="error" width={180} height={180} />
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-gray950 text-white rounded-md text-body-1-normal font-semibold"
      >
        홈으로 돌아가기
      </Link>
    </section>
  );
}
