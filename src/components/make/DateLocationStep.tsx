'use client';

import React from "react";
import { useMakeStore } from "@/stores/make/makeStore";
import { Input } from "@/components/ui/input";
import { StepDateRange } from "./StepDateRange";
import { StepDatePicker } from "./StepDatePicker";


export default function DateLocationStep() {
  const {
    roadAddress, // 스토어 필드 `roadAddress` 사용
    recruitmentDeadline, // 모집 종료 날짜 필드
    startDate,
    endDate,
    setRoadAddress,
    setRecruitmentDeadline,
    setStartDate,
    setEndDate,
  } = useMakeStore();

  // 주소 검색 핸들러
  const handleAddressSearch = () => {
    if (typeof window !== "undefined" && window.daum) {
      new window.daum.Postcode({
        oncomplete: (data: any) => {
          console.log('Daum Postcode API 데이터:', data);
          const newAddress = data.roadAddress || data.jibunAddress || data.address;
          if (newAddress && newAddress !== "") {
            setRoadAddress(newAddress);
            console.log('업데이트된 주소:', newAddress);
          } else {
            alert("유효한 주소를 선택해주세요.");
          }
        }
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
          value={roadAddress} // 상태 값 적용
          onClick={handleAddressSearch} // 주소 검색 핸들러 연결
          readOnly
          className="text-body-2-normal cursor-pointer min-w-[343px] h-[54px] p-4 bg-background400 focus:ring-orange200 focus:outline-orange200"
        />
      </div>

      {/* 모집 기간 선택 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          모집 기간 <span className="text-orange200">*</span>
        </label>
        <StepDateRange
          startDate={recruitmentDeadline ? new Date(recruitmentDeadline) : null} // 모집 시작 날짜
          endDate={endDate ? new Date(endDate) : null} // 모집 종료 날짜
          onDateChange={(dates) => {
            setRecruitmentDeadline(dates.start ? dates.start.toISOString() : ""); // 모집 시작 상태 업데이트
            setEndDate(dates.end ? dates.end.toISOString() : ""); // 모집 종료 상태 업데이트
          }}
        />
        <p className="text-label-normal text-gray300 ml-2 mt-[5px]">모임을 만들면 바로 모집이 시작돼요</p>
      </div>

      {/* 모임 날짜 선택 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          모임 날짜 <span className="text-orange200">*</span>
        </label>
        <div className="flex items-center flex-grow space-x-2">
          {/* 시작 날짜 */}
          <StepDatePicker
            selectedDate={startDate ? new Date(startDate) : null} // 상태 값 적용
            onDateChange={(date) => setStartDate(date ? date.toISOString() : "")} // 상태 업데이트
            placeholder="모임 시작 날짜를 선택하세요"
          />
          {/* 종료 날짜 */}
          <StepDatePicker
            selectedDate={endDate ? new Date(endDate) : null} // 상태 값 적용
            onDateChange={(date) => setEndDate(date ? date.toISOString() : "")} // 상태 업데이트
            placeholder="모임 종료 날짜를 선택하세요"
          />
        </div>
      </div>
    </div>
  );
}
