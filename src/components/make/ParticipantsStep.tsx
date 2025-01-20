import React, { useState } from "react";
import { useMakeStore } from "@/stores/make/makeStore";
import PlusLineIcon from "../home/icons/PlusLine";
import MinusIcon from "../home/icons/MinusIcon";


export default function ParticipantsStep() {
  const { minParticipants, maxParticipants, setMinParticipants, setMaxParticipants } = useMakeStore();
  const [currentMin, setCurrentMin] = useState(minParticipants || 3); // 최소 인원 기본값 3
  const [currentMax, setCurrentMax] = useState(maxParticipants || 8); // 최대 인원 기본값 8

  const handleDecrementMin = () => {
    if (currentMin > 3) {
      setCurrentMin((prev) => prev - 1);
      setMinParticipants(currentMin - 1);
    }
  };

  const handleIncrementMin = () => {
    if (currentMin < currentMax && currentMin < 20) {
      setCurrentMin((prev) => prev + 1);
      setMinParticipants(currentMin + 1);
    }
  };

  const handleDecrementMax = () => {
    if (currentMax > currentMin && currentMax > 3) {
      setCurrentMax((prev) => prev - 1);
      setMaxParticipants(currentMax - 1);
    }
  };

  const handleIncrementMax = () => {
    if (currentMax < 20) {
      setCurrentMax((prev) => prev + 1);
      setMaxParticipants(currentMax + 1);
    }
  };

  return (
    <div className="flex flex-col space-y-6 px-5 h-[680px]">
      {/* 소개 */}
      <div className="flex flex-col items-start mb-10">
        <h1 className="text-title-2 font-semibold">몇 명의 팀원들과 함께할까요?</h1>
        <p className="text-body-2-normal text-gray400">인원수를 여유롭게 설정하면 좋아요</p>
      </div>

      {/* 최소 참가자 수 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          최소 인원 <span className="text-orange200">*</span>
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            readOnly
            value={currentMin}
            className="flex-1 min-w-[183px] h-16 p-4 bg-background400 rounded-xl"
          />
          <button
            className="min-w-[72px] h-16 bg-background400 rounded-xl px-6 py-4"
            onClick={handleDecrementMin}
          >
            <MinusIcon className="fill-gray300"/>
          </button>
          <button
            className="min-w-[72px] h-16 bg-background400 rounded-xl px-6 py-4"
            onClick={handleIncrementMin}
          >
            <PlusLineIcon className="fill-gray300"/>
          </button>
        </div>
        <p className="text-sm text-gray400">최소 인원이 충족되면 자동으로 모임이 개설돼요</p>
      </div>

      {/* 최대 참가자 수 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          모집 인원 <span className="text-orange200">*</span>
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            readOnly
            value={currentMax}
            className="flex-1 min-w-[183px] h-16 p-4 bg-background400 rounded-xl"
          />
          <button
            className="min-w-[72px] h-16 bg-background400 rounded-xl px-6 py-4"
            onClick={handleDecrementMax}
          >
            <MinusIcon className="fill-gray300"/>
          </button>
          <button
            className="min-w-[72px] h-16 bg-background400 rounded-xl px-6 py-4"
            onClick={handleIncrementMax}
          >
            <PlusLineIcon className="fill-gray300"/>
          </button>
        </div>
        <p className="text-sm text-gray400">최대 20명까지 설정 가능합니다</p>
      </div>
    </div>
  );
}
