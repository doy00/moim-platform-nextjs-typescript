import React from 'react'

// Coponents
import FilterIcon from './icons/FilterIcon'
import SearchIcon from './icons/SearchIcon'
import PlusIcon from './icons/PlusIcon'

export default function HomeHeader() {
  return (
    <header className='px-5 py-4 h-14 flex justify-between items-center'>
      <div><FilterIcon className='fill-gray300'/></div>
      <div className='flex items-center gap-x-3'>
        <SearchIcon className='fill-gray300'/>
        <PlusIcon className='fill-orange200'/>
      </div>
    </header>
  )
}
