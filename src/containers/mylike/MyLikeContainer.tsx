'use client';
import React from 'react';
import { useRouter } from "next/navigation";
import MyLikePresenter from "@/components/mylike/MyLikePresenter";
import { ILikeMoim, MoimResponse } from '@/types/detail/i-moim';

const mockMoimResponse: MoimResponse = {
  data: [
    {
      moimId: 1,
      moimType: "프로젝트",
      title: "프론트엔드 프로젝트 팀원 모집",
      si: "서울시",
      district: "강남구",
      roadAddress: "테헤란로 123",
      startDate: "2025-02-26",
      endDate: "2025-03-31",
      participants: 3,
      minParticipants: 5,
      maxParticipants: 10,
      moimStatus: "모집중",
      likes: 5
    },
    {
      moimId: 2,
      moimType: "스터디",
      title: "알고리즘 스터디원 모집",
      si: "서울시",
      district: "서초구",
      roadAddress: "서초대로 456",
      startDate: "2025-02-26",
      endDate: "2025-03-31",
      participants: 6,
      minParticipants: 5,
      maxParticipants: 8,
      moimStatus: "모집중",
      likes: 8
    },
    {
      moimId: 3,
      moimType: "면접",
      title: "기술면접 스터디",
      si: "서울시",
      district: "송파구",
      roadAddress: "올림픽로 300",
      startDate: "2025-03-01",
      endDate: "2025-03-31",
      participants: 4,
      minParticipants: 4,
      maxParticipants: 6,
      moimStatus: "모집중",
      likes: 3
    }
  ],
  pagination: {
    current_page: 1,
    total_pages: 1
  }
};


export default function MyLikeContainer () {
  const router = useRouter();
  const [likedMoims, setLikedMoims] = React.useState<ILikeMoim[]>(mockMoimResponse.data);

  const handleClickCard = (moimId: number) => {
    router.push(`/detail/${moimId}`);
  };
  
  const handleRemoveLike = (e: React.MouseEvent, moimId: number) => {
    e.stopPropagation();
    setLikedMoims(prev => prev.filter(moim => moim.moimId !== moimId));
  };

  return (
    <MyLikePresenter
      moims={likedMoims}
      onRemoveLike={handleRemoveLike}
      onClickCard={handleClickCard}
    />
  )
};