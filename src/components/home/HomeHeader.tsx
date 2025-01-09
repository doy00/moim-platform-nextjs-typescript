import React from 'react'
import Image from 'next/image'

// Coponents
import SearchIcon from './icons/SearchIcon'
import PlusIcon from './icons/PlusIcon'

export default function HomeHeader() {
  return (
    <header className='px-5 py-4 h-14 flex justify-between items-center'>
      <div>
        <Image 
          src='svgs/img_logo-text.svg'
          alt="img-logo-text"
          width={120} height={16}
          priority
        />
      </div>
      <div className='flex items-center gap-x-3'>
        <SearchIcon className='fill-gray300'/>
        <PlusIcon className='fill-orange200'/>
      </div>
    </header>
  )
}
