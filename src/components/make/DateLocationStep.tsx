'use client';

import React from 'react';
import { useMakeStore } from '@/stores/make/makeStore';
import { Input } from '@/components/ui/input';
import { StepDateRange } from './StepDateRange';
import { StepDatePicker } from './StepDatePicker';
import { Checkbox } from '@/components/ui/checkbox';

export default function DateLocationStep() {
  const {
    roadAddress,
    isOnline,
    recruitmentDeadline,
    startDate,
    endDate,
    setRoadAddress,
    toggleOnline,
    setRecruitmentDeadline,
    setStartDate,
    setEndDate,
  } = useMakeStore();

  const today = new Date(); 

  const handleAddressSearch = () => {
    if (typeof window !== "undefined" && window.daum) {
      new window.daum.Postcode({
        oncomplete: (data: any) => {
          console.log("Daum Postcode API 데이터:", data);
          const newAddress = data.roadAddress || data.jibunAddress || data.address;
          if (newAddress && newAddress !== "") {
            setRoadAddress(newAddress);
            console.log("업데이트된 주소:", newAddress);
          } else {
            alert("유효한 주소를 선택해주세요.");
          }
        },
      }).open();
    } else {
      alert("주소 검색 기능을 사용할 수 없습니다.");
    }
  };

  return (
    <div className="flex flex-col space-y-6 px-5 h-[680px]">
      {/* 소개 */}
      <div className="flex flex-col items-start mb-10">
        <h1 className="text-title-2 font-semibold">모임의 장소와 날짜를 알려주세요</h1>
        <p className="text-body-2-normal text-gray400">장소와 날짜는 정확할수록 좋아요</p>
      </div>

      {/* 모임 장소 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          모임 장소 <span className="text-orange200">*</span>
        </label>
        <Input
          placeholder="장소를 입력해주세요"
          value={roadAddress} 
          onClick={handleAddressSearch} 
          readOnly
          className="text-body-2-normal cursor-pointer min-w-[343px] h-[54px] p-4 bg-background400 focus:ring-orange200 focus:outline-orange200"
        />
        {/* 온라인 진행 체크박스 */}
        <div className="ml-2.5 mt-2 flex items-center space-x-2">
          <Checkbox id="onlineCheck" checked={isOnline} onCheckedChange={toggleOnline} />
          <label htmlFor="onlineCheck" className="text-label-normal text-gray400">
            온라인으로 진행해요
          </label>
        </div>
      </div>

      {/* 모집 기간 선택 (StepDateRange) */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          모집 기간 <span className="text-orange200">*</span>
        </label>
        <StepDateRange
          startDate={today}
          endDate={recruitmentDeadline ? new Date(recruitmentDeadline) : null} 
          onDateChange={(dates) => {
            setRecruitmentDeadline(dates.end ? dates.end.toISOString() : ''); 
          }}
        />
        <p className="text-label-normal text-gray300 ml-2 mt-[5px]">
          모임을 만들면 바로 모집이 시작돼요
        </p>
      </div>

      {/* 모임 날짜 선택 (StepDatePicker) */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          모임 날짜 <span className="text-orange200">*</span>
        </label>
        <div className="flex items-center flex-grow space-x-2">
          {/* 시작 날짜 (사용자 입력) */}
          <StepDatePicker
            selectedDate={startDate ? new Date(startDate) : null} 
            onDateChange={(date) => setStartDate(date ? date.toISOString() : '')} 
            placeholder="모임 시작 날짜를 선택하세요"
          />
          {/* 종료 날짜 (사용자 입력) */}
          <StepDatePicker
            selectedDate={endDate ? new Date(endDate) : null} 
            onDateChange={(date) => setEndDate(date ? date.toISOString() : '')} 
            placeholder="모임 종료 날짜를 선택하세요"
          />
        </div>
      </div>
    </div>
  );
}
