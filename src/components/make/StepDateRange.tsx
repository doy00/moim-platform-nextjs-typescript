"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface StepDateRangeProps {
  startDate?: Date | null;
  endDate?: Date | null;
  onDateChange: (dates: { start: Date | null; end: Date | null }) => void;
}

export function StepDateRange({ startDate, endDate, onDateChange }: StepDateRangeProps) {
  return (
    <div className="space-y-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`text-body-2-normal w-full justify-start h-[54px] bg-background400 rounded-md 
              ${!(startDate && endDate) ? "text-gray300" : "text-gray-700"}`}
          >
            {startDate && endDate
              ? `${format(startDate, "yyyy년 MM월 dd일")} ~ ${format(endDate, "yyyy년 MM월 dd일")}`
              : "모임 기간을 설정해주세요"}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-4"
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
            }
          }}
        >
          <Calendar
            mode="range"
            selected={{ from: startDate || undefined, to: endDate || undefined }}
            onSelect={(range) => {
              onDateChange({ start: range?.from || null, end: range?.to || null });
            }}
            classNames={{
              day: "h-8 w-8 p-1",
              day_today: "bg-transparent", // 포커스 상태 스타일 제거
              day_selected: "", // 선택된 날짜
            }}
            modifiersClassNames={{
            range_start: "bg-white border border-[#ED9141] rounded-md text-[#ED9141]",
              range_end: "bg-white border border-[#ED9141] rounded-md text-[#ED9141]",
              range_middle: "bg-white text-[#ED9141]",
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
