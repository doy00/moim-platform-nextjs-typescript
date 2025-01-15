'use client';

import React, { useState } from 'react';
//Store
//Components
import { Progress } from '../ui/progress';
import CategoryStep from './CategoryStep';
import DescriptionStep from './DescriptionStep';
import DateLocationStep from './DateLocationStep';
import ParticipantsStep from './ParticipantsStep';
import DeleteIcon from '../home/icons/DeleteIcon';

export default function MakeMain() {
  const [step, setStep] = useState<number>(1);
  const progressValue = step * 25;


  const handleNextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4)); 
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      //
    } catch (error) {
      console.error('error 발생', error);
    }
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
          <DeleteIcon />
        </div>
        <Progress value={progressValue} />
      </div>
      {/* Step 영역 */}
      <div>{renderStep()}</div>
      {/* Button 영역 */}
      <div className="flex space-x-4 px-5">
        {step > 1 && (
          <button onClick={handlePrevStep} className="px-4 py-2 bg-gray-300 rounded-md">
            이전
          </button>
        )}
        {step < 4 ? (
          <button onClick={handleNextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md">
            다음
          </button>
        ) : (
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded-md">
            완료
          </button>
        )}
      </div>
    </main>
  );
}
