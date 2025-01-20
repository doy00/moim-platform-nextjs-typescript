import React from "react";
import { useMakeStore } from "@/stores/make/makeStore";
import { Input } from "@/components/ui/input";
import { StepDateRange } from "./StepDateRange";
import { StepDatePicker } from "./StepDatePicker";

export default function DateLocationStep() {
  const {
    location,
    recruitmentStart,
    registrationEnd,
    moimStart,
    moimEnd,
    setLocation,
    setRecruitmentStart,
    setRegistrationEnd,
    setMoimStart,
    setMoimEnd,
  } = useMakeStore();

  // 주소 검색 핸들러
  const handleAddressSearch = () => {
    if (typeof window !== "undefined" && window.daum) {
      new window.daum.Postcode({
        oncomplete: (data: { address: string }) => {
          if (data.address) {
            setLocation(data.address);
          } else {
            alert("유효한 주소를 선택해주세요.");
          }
        },
      }).open();
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
          value={location}
          onClick={handleAddressSearch}
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
          startDate={recruitmentStart ? new Date(recruitmentStart) : null}
          endDate={registrationEnd ? new Date(registrationEnd) : null}
          onDateChange={(dates) => {
            setRecruitmentStart(dates.start ? dates.start.toISOString() : "");
            setRegistrationEnd(dates.end ? dates.end.toISOString() : "");
          }}
        />
      </div>
      {/* 모임 날짜 선택 */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          모임 날짜 <span className="text-orange200">*</span>
        </label>
        <div className="flex items-center flex-grow space-x-2">
          {/* 시작 날짜 */}
          <StepDatePicker
            selectedDate={moimStart ? new Date(moimStart) : null}
            onDateChange={(date) => setMoimStart(date ? date.toISOString() : "")}
            placeholder="모임 시작 날짜를 선택하세요"
          />
          {/* 종료 날짜 */}
          <StepDatePicker
            selectedDate={moimEnd ? new Date(moimEnd) : null}
            onDateChange={(date) => setMoimEnd(date ? date.toISOString() : "")}
            placeholder="모임 종료 날짜를 선택하세요"
          />
        </div>
      </div>
    </div>
  );
}
