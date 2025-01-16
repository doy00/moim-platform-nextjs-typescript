// app/detail/[id]/page.tsx
import * as React from 'react';
import DetailContainer from "@/containers/detail/DetailContainer";
import { getDetailInfo, getParticipants, getDetailReviews } from "@/apis/detail/detail.api";
import { Suspense } from "react";

interface DetailPageProps {
  params: {
    id: string;
  };
}

export default async function DetailPage({
  params,
} : DetailPageProps) {

  // Dynamic route parameters 사용을 위해 비동기 처리
  const { id } = await Promise.resolve(params);  
  const moimId = parseInt(id) 

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
          <DetailContainer 
          id={moimId}
          />
      </Suspense>
    </div>
  );
}; 