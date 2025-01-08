import React from 'react'
import HomeCard from './HomeCard'



// DUMMYDATA 
const dummyData = [
  {
    id: 1,
    category: 0,
    title: '모임 제목 1',
    content: '위치가 들어갑니다',
    recruitment_deadline: '2025-02-20',
    start_date: '2025-02-26',
    end_date: '2025-03-31',
    min_participants: 5,
    max_participants: 20,
    status: 0,
  },
  {
    id: 2,
    category: 1,
    title: '모임 제목 2',
    content: '위치가 들어갑니다',
    recruitment_deadline: '2025-02-15',
    start_date: '2025-02-26',
    end_date: '2025-03-31',
    min_participants: 10,
    max_participants: 12,
    status: 1,
  },
  {
    id: 3,
    category: 2,
    title: '모임 제목 3',
    content: '위치가 들어갑니다',
    recruitment_deadline: '2025-02-10',
    start_date: '2025-02-26',
    end_date: '2025-03-31',
    min_participants: 2,
    max_participants: 8,
    status: 2,
  },
  {
    id: 4,
    category: 2,
    title: '모임 제목 3',
    content: '위치가 들어갑니다',
    recruitment_deadline: '2025-02-10',
    start_date: '2025-02-26',
    end_date: '2025-03-31',
    min_participants: 2,
    max_participants: 8,
    status: 2,
  },
];




export default function HomeCards() {
  const renderedCard = (
    <div className='px-4 pt-[14px] space-y-4'>
      {dummyData.map((item) => (
        <HomeCard key={item.id} data={item}/>
      ))}
    </div>
  )


  return (
    <>
      {renderedCard}
    </>
  )
}
