'use client';

import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});

import duduLoading from '@images/dudu_loading.json';

export default function AuthLoading() {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-background100 z-50">
        <div className="rounded-full overflow-hidden">
          <Lottie animationData={duduLoading} loop={true} style={{ width: 200, height: 200 }} />
        </div>
      </div>
    </div>
  );
}
