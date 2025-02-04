// src/components/make/MakeMain.tsx
'use client';

import React, { useState } from 'react';
import { useCreateMoim } from '@/hooks/home/useCreateMoim';
// Components
import CategoryStep from './CategoryStep';
import DescriptionStep from './DescriptionStep';
import DateLocationStep from './DateLocationStep';
import ParticipantsStep from './ParticipantsStep';
import StepProgressbar from './StepProgressbar';
import MakeCancel from './MakeCancel';
import ArrowLeftLine from '../home/icons/ArrowLeftLine';

export default function MakeMain() {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;

  // 커스텀 훅에서 createMoim 함수 호출
  const { createMoim } = useCreateMoim();

  const handleNextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const handlePrevStep = () => setStep((prev) => Math.max(prev - 1, 1));
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
        <div className="px-5 w-full flex items-center justify-between">
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
            <ArrowLeftLine className="fill-gray300" />
          </button>
        )}
        {step < 4 ? (
          <button onClick={handleNextStep} className="flex items-center justify-center w-full h-[56px] bg-gray950 text-white rounded-2xl mb-4">
            다음
          </button>
        ) : (
          <button onClick={createMoim} className="flex items-center justify-center w-full h-[56px] bg-gray950 text-white rounded-2xl">
            완료
          </button>
        )}
      </div>
    </main>
  );
}
