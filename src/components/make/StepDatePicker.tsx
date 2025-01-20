'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

interface StepDatePickerProps {
  selectedDate?: Date | null;
  onDateChange: (date: Date | null) => void;
  placeholder: string;
}

export function StepDatePicker({ selectedDate, onDateChange, placeholder }: StepDatePickerProps) {
  return (
    <div className="w-full flex space-y-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`text-body-2-normal min-w-[166px] max-w-[286.5px]/ w-full h-[54px] bg-background400 rounded-md 
        ${!selectedDate ? 'text-gray300' : 'text-gray-700'}`}
          >
            {selectedDate ? format(selectedDate, 'yyyy년 MM월 dd일') : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4">
          <Calendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={(date) => onDateChange(date || null)}
            classNames={{
              day: 'h-8 w-8 p-1 rounded-md',
              day_today: '',
              day_selected: 'bg-white border text-[#ED9141] border-[#ED9141] rounded-md',
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
