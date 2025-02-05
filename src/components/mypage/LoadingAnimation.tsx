import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});

import duduLoading from '@images/dudu_loading.json';

export const LoadingAnimation = () => {
  return (
    <div className="rounded-full overflow-hidden">
      <Lottie animationData={duduLoading} loop={true} style={{ width: 200, height: 200 }} />
    </div>
  );
};

export const HeaderAnimation = () => {
  return (
    <div className="rounded-3xl overflow-hidden">
      <Lottie animationData={duduLoading} loop={true} style={{ width: 50, height: 50 }} />
    </div>
  );
};

export default { LoadingAnimation, HeaderAnimation } as const;
