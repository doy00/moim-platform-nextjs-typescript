import React from 'react';
import Script from 'next/script';
import MakeMain from '@/components/make/MakeMain';

export default function MakeContainer() {
  return (
    <>
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />
      <div>
        <MakeMain />
      </div>
    </>
  );
}
