'use client'

import React,{ useEffect} from 'react'

// Components
import HomeHeader from '@/components/home/HomeHeader'
import HomeHero from '@/components/home/HomeHero'
import HomeCards from '@/components/home/HomeCards'

export default function HomeContainer() {
  useEffect(() => {
    // AccessToken 설정
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjUsImlhdCI6MTczNzUxOTUyNSwiZXhwIjoxNzM3NjA1OTI1fQ.IJVX44vOSYu7KtaBLlJwiwwfJGmLAtGFy9mYbYdOk4A';
    localStorage.setItem('accessToken', token);
    console.log('AccessToken이 설정되었습니다.', token);
  }, []);

  return (
    <div id="layout-container" tabIndex={-1}>
      <HomeHeader />
      <HomeHero />
      <HomeCards />
    </div>
  )
}
