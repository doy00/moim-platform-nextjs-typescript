'use client';

import React, { useState } from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerTitle,
} from '@/components/ui/drawer';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
// Store
import { useFilterStore } from '@/stores/home/filterStore';

// Constants
import { FILTER_TAB_MENUS } from '@/constants/home/filter-tab';
import { IFilterTabMenu } from '@/types/home/i-filtertab';
import { CATEGORY_ITEMS } from '@/constants/home/filter-category';
import { REGION_ITEMS } from '@/constants/home/filter-region';
import { STATUS_ITEMS } from '@/constants/home/filter-status';
// Components - Icons
import FilterActivateIcon from './icons/FilterActivateIcon';
import DeleteIcon from './icons/DeleteIcon';
import ResetIcon from './icons/ResetIcon';

const FilterDrawer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(FILTER_TAB_MENUS[0].id);
  const {
    moimType,
    region,
    status, // ✅ 기존 moimStatus -> status 로 변경
    setMoimType,
    setStatus, // ✅ 기존 setMoimStatus -> setStatus 로 변경
    toggleRegion,
    resetFilters,
  } = useFilterStore();
  
  // 필터 적용
  const handleApplyFilters = () => {
    console.log('🛠 [Applied Filters]:', { moimType, region, status });
  };

  const isRegionSelected = (id: string) => region.includes(id);

  const handleRegionToggle = (regionId: string) => {
    toggleRegion(regionId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'category':
        return (
          <div className="flex flex-col space-y-[11px] items-center justify-between px-3">
            {CATEGORY_ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = moimType === item.id;

              return (
                <div
                  key={item.id}
                  className={`flex items-center space-x-2.5 w-full h-16 px-6 py-5 cursor-pointer rounded-md ${
                    isSelected
                      ? 'border border-orange200 text-orange200'
                      : 'border border-[#DEDBD9] text-[#9e9892]'
                  }`}
                  onClick={() => setMoimType(item.id)}
                >
                  <Icon className={`w-6 h-6 ${isSelected ? 'fill-orange200' : 'fill-[#9e9892]'}`} />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        );

      case 'region':
        return (
          <div>
            {/* Region Grid */}
            <div className="px-3 grid grid-cols-2 gap-x-[7px] gap-y-[11px] text-body-2-normal mb-[18px]">
              {REGION_ITEMS.map((item) => (
                <button
                  key={item.id}
                  className={`w-[172px] h-16 border rounded-md cursor-pointer ${
                    isRegionSelected(item.id)
                      ? 'bg-background400 text-black'
                      : 'bg-transparent text-[#9e9892]'
                  }`}
                  onClick={() => handleRegionToggle(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Selected Regions */}
            <p className='ml-3 px-3 pt-3 text-caption-normal text-gray300'>
              <strong className='text-gray800'>{region.length}</strong>/{REGION_ITEMS.length}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 px-3 text-caption-reading">
              {region.length > 0 ? (
                region.map((regionId) => (
                  <div
                    key={regionId}
                    className="flex items-center justify-center bg-background400 text-gray-700 px-3 py-1 rounded-full space-x-2 w-[69px] h-[34px]"
                  >
                    <span>{REGION_ITEMS.find((item) => item.id === regionId)?.label}</span>
                    <button onClick={() => toggleRegion(regionId)}>X</button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">선택된 지역이 없습니다.</p>
              )}
            </div>
          </div>
        );

      case 'status':
        return (
          <div className="flex flex-col space-y-[11px] items-center justify-between px-3">
            {STATUS_ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = status === item.id;

              return (
                <div
                  key={item.id}
                  className={`flex items-center space-x-2.5 w-full h-16 px-6 py-5 cursor-pointer rounded-md ${
                    isSelected ? 'bg-background400 text-black' : 'bg-transparent text-[#9e9892]'
                  }`}
                  onClick={() => setStatus(item.id)}
                >
                  <Icon className={`w-6 h-6 ${isSelected ? 'fill-black' : 'fill-[#9e9892]'}`} />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Drawer>
      {/* 필터 아이콘 버튼 */}
      <DrawerTrigger>
        <FilterActivateIcon className="fill-gray200" />
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        {/* Visually Hidden Title */}
        <VisuallyHidden>
          <DrawerTitle>필터 드로어</DrawerTitle>
        </VisuallyHidden>

        <div className="">
          {/* 닫기 버튼 */}
          <DrawerClose asChild>
            <div className="w-full h-8 px-5 flex items-center justify-end">
              <DeleteIcon className="fill-gray200 w-6 h-6" />
            </div>
          </DrawerClose>

          {/* 탭 메뉴 */}
          <div className="min-w-[375px] h-12 space-x-4 flex items-center border-b pl-5">
            {FILTER_TAB_MENUS.map((menu: IFilterTabMenu) => (
              <button
                key={menu.id}
                className={`relatvie h-12 py-2 text-body-2-normal ${
                  activeTab === menu.id ? 'text-black border-b-2 border-black' : 'text-[#c1bdb8]'
                } ${menu.label === '카테고리' ? 'w-[81px]' : 'w-[57px]'}`}
                onClick={() => setActiveTab(menu.id)}
              >
                {menu.label}
              </button>
            ))}
          </div>

          {/* 탭 콘텐츠 */}
          <div className="mt-4">{renderContent()}</div>

          {/* Footer */}
          <div className="absolute bottom-0 w-full flex justify-center items-center space-x-[11px] px-5 py-4">
            <button
              className="flex items-center justify-center w-[72px] h-16 bg-[#f0efee] rounded-xl"
              onClick={resetFilters}
            >
              <ResetIcon className="fill-gray400" />
            </button>
            <DrawerTrigger asChild>
              <button
                className="w-[252px] h-16 text-white bg-black rounded-xl"
                onClick={handleApplyFilters}
              >
                {region.length}/{REGION_ITEMS.length}개의 모임 보기
              </button>
            </DrawerTrigger>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
