import React from 'react';

//Container
import HomeContainer from '@/containers/home/HomeContainer';
// import TemporaryLogin from '@/containers/mypage/TemporaryLogin';

export default function Home() {
  return (
    <div className="px-2 py-3 mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg h-auto bg-white">
      <HomeContainer />
      {/* <TemporaryLogin /> */}
    </div>
  );
}
