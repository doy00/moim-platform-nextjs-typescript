'use client';

import Image from 'next/image';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">문제가 발생했어요!</h2>

      <Image src="/svgs/svg_dudu_empty.svg" alt="error" width={180} height={180} />
      <button
        className="mt-4 px-4 py-2 bg-gray950 text-white rounded-md text-body-1-normal font-semibold"
        onClick={() => reset()}
      >
        다시 시도하기
      </button>
    </section>
  );
}
