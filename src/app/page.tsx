import React from 'react';
import { fetchMoims } from '@/utils/home/fetchMoims';
import { MoimResponse } from '@/types/home/i-moim';

//Container
import HomeContainer from '@/containers/home/HomeContainer';


export default async function Home() {
  const initialData: MoimResponse = await fetchMoims({ pageParam: 1 });

  return (
    <div className="px-2 py-3 mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg h-auto bg-background300">
      <HomeContainer initialData={initialData} />
    </div>
  );
}
