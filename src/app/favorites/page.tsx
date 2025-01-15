'use client';

import React, { useEffect } from 'react';
import { useFavoriteStore } from '@/stores/home/favoriteStore';
import HomeCard from '@/components/home/HomeCard';
import { useMoimStore } from '@/stores/favorites/moimStore'; // 모임 데이터 상태 가져오기

export default function FavoritesPage() {
  const { favorites, fetchFavorites } = useFavoriteStore();
  const { moims } = useMoimStore(); // 모든 모임 데이터 가져오기

  useEffect(() => {
    fetchFavorites(); // 새로고침 시 찜 데이터 로드
  }, [fetchFavorites]);

  // 찜한 모임 필터링
  const favoriteMoims = moims.filter((moim) => favorites.has(moim.id));

  return (
    <section className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">찜한 모임</h1>
      {favoriteMoims.length > 0 ? (
        <div className="space-y-4">
          {favoriteMoims.map((moim) => (
            <HomeCard key={moim.id} data={moim} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">찜한 모임이 없습니다.</p>
      )}
    </section>
  );
}
