import React from 'react'

// Components
import HomeHeader from '@/components/home/HomeHeader'
import HomeHero from '@/components/home/HomeHero'
import HomeCards from '@/components/home/HomeCards'


export default function HomeContainer() {
  return (
    <div id="layout-container" tabIndex={-1}>
      <HomeHeader />
      <HomeHero />
      <HomeCards />
    </div>
  )
}
