import React from 'react'

// Components
import HomeHeader from '@/components/home/HomeHeader'
import HomeHero from '@/components/home/HomeHero'


export default function HomeContainer() {
  return (
    <div id="layout-container" tabIndex={-1}>
      <HomeHeader />
      <HomeHero />
    </div>
  )
}
