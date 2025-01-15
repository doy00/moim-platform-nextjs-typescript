'use client';

import React from 'react';
import { useMakeStore } from '@/stores/make/makeStore';

//Constants
import { CATEGORY_ITMES_TWO } from '@/constants/home/filter-category';

export default function CategoryStep() {
  const { type, setType } = useMakeStore();

  return (
    <section className="flex flex-col px-4 h-[557px]">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-[52px]">
        <h1 className="text-title-2 font-semibold">어떤 모임을 만들까요?</h1>
        <p className="text-body-2-normal text-gray400">모임을 만들면 두두가 발굴할 수 있어요</p>
      </div>
      {/* Section Main */}
      <div>
        {CATEGORY_ITMES_TWO.map((item) => {
          const Icon = item.icon;
          const isSelected = type === item.id;

          return (
            <div
              key={item.id}
              className={`flex items-center space-x-2.5 w-[343px] mb-[11px] h-16 px-6 py-5 cursor-pointer rounded-md ${
                isSelected
                  ? 'border border-orange200 text-orange200'
                  : 'border border-[#DEDBD9] text-[#9e9892]'
              }`}
              onClick={() => setType(item.id)}
            >
              <Icon className={`w-6 h-6 ${isSelected ? 'fill-orange200' : 'fill-[#9e9892]'}`} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
