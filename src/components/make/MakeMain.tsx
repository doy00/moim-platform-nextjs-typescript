'use client';

import React, { useState, useEffect } from 'react';
import axiosHomeInstance from '@/libs/home/home-axios';
import { useRouter } from 'next/navigation';
//Store
//Components
import CategoryStep from './CategoryStep';
import DescriptionStep from './DescriptionStep';
import DateLocationStep from './DateLocationStep';
import ParticipantsStep from './ParticipantsStep';
import StepProgressbar from './StepProgressbar';
import MakeCancel from './MakeCancel';
//Icon
import ArrowLeftLine from '../home/icons/ArrowLeftLine';
import { useMakeStore } from '@/stores/make/makeStore';

export default function MakeMain() {
  // Token-Test
    useEffect(() => {
      // AccessToken 설정
      const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjUsImlhdCI6MTczNzUxOTUyNSwiZXhwIjoxNzM3NjA1OTI1fQ.IJVX44vOSYu7KtaBLlJwiwwfJGmLAtGFy9mYbYdOk4A';
      localStorage.setItem('accessToken', token);
      console.log('AccessToken이 설정되었습니다.', token);
    }, []);
  


  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;
  const router = useRouter()
  const {
    type,
    title,
    content,
    si,
    district,
    roadAddress,
    recruitmentDeadline,
    startDate,
    endDate,
    minParticipants,
    maxParticipants,
  } = useMakeStore()

  const handleNextStep = () => {
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {

    const requestData = {
      type,
      title,
      content,
      si,
      district,
      roadAddress,
      recruitmentDeadline,
      startDate,
      endDate,
      minParticipants,
      maxParticipants,
    };

    try {
      const response = await axiosHomeInstance.post('/moim/create', requestData);
      if (response.data.isSuccess) {
        alert('모임 생성에 성공했습니다!');
        router.push('/home');
      } else {
        alert('모임 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('모임 생성 실패:', error);
      alert('모임 생성 중 문제가 발생했습니다.');
    }
  };

  const handleLeave = () => {
    console.log('작성 취소 후 나가기');
  };

  
  const renderStep = () => {
    switch (step) {
      case 1:
        return <CategoryStep />;
      case 2:
        return <DescriptionStep />;
      case 3:
        return <DateLocationStep />;
      case 4:
        return <ParticipantsStep />;
      default:
        return <div className="text-red-500">Something Wrong in the process of step</div>;
    }
  };

  return (
    <main className="flex flex-col space-y-6">
      {/* 헤더 영역 */}
      <div className="flex flex-col items-start w-full h-16 space-y-4">
        <div className='px-5 w-full flex items-center justify-between'>
          <h1 className="text-lg font-bold">모임 만들기</h1>
          <MakeCancel onLeave={handleLeave} />
        </div>
        <StepProgressbar currentStep={step} totalSteps={totalSteps} />
      </div>
      {/* Step 영역 */}
      <div>{renderStep()}</div>
      {/* Button 영역 */}
      <div className="flex space-x-3 px-5 pb-[62px]">
        {step > 1 && (
          <button onClick={handlePrevStep} className="flex items-center justify-center px-6 py-4 h-[56px] bg-background400 rounded-2xl">
            <ArrowLeftLine className='fill-gray300' />
          </button>
        )}
        {step < 4 ? (
          <button onClick={handleNextStep} className="flex items-center justify-center w-full h-[56px] bg-gray950 text-white rounded-2xl mb-4">
            다음
          </button>
        ) : (
          <button onClick={handleSubmit} className="flex items-center justify-center w-full h-[56px] bg-gray950 text-white rounded-2xl">
            완료
          </button>
        )}
      </div>
    </main>
  );
}
