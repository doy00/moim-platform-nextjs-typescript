'use client';

import React, { useState } from 'react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from '@/components/ui/drawer';

// Constants
import { FILTER_TAB_MENUS } from '@/constants/home/filter-tab';
import { IFilterTabMenu } from '@/types/home/i-filtertab';
import { CATEGORY_ITEMS } from '@/constants/home/filter-category';
import { STATUS_ITEMS } from '@/constants/home/filter-status';
import { REGION_ITEMS } from '@/constants/home/filter-region';
// Compontes-icon
import FilterActivateIcon from './icons/FilterActivateIcon';
import DeleteIcon from './icons/DeleteIcon';
import ResetIcon from './icons/ResetIcon';

const FilterDrawer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(FILTER_TAB_MENUS[0].id);
  const [seletedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');



  const renderContent = () => {
    switch (activeTab) {
      case 'category':
        return (
          <div className="flex flex-col space-y-[11px] items-center justify-between px-3">
            {CATEGORY_ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = seletedCategory === item.id;

              return (
                <div
                  key={item.id}
                  className={`flex items-center space-x-2.5 w-full h-16 px-6 py-5 cursor-pointer rounded-md ${
                    isSelected
                      ? 'border border-orange200 text-orange200'
                      : 'border border-[#DEDBD9] text-[#9e9892]'
                  }`}
                  onClick={() => setSelectedCategory(item.id)} // 선택 상태 업데이트
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
          <div className="px-3 grid grid-cols-2 gap-x-[7px] gap-y-[11px] text-body-2-normal">
          {REGION_ITEMS.map((region) => {
            const isSelected = selectedRegion === region.id; // 선택 상태 확인

            return (
              <button
                key={region.id}
                className={`w-[172px] h-16 border rounded-md cursor-pointer ${
                  isSelected
                    ? 'bg-background400 text-black'
                    : 'bg-transparent text-[#9e9892]'
                }`}
                onClick={() => setSelectedRegion(region.id)} // 선택 상태 업데이트
              >
                {region.label}
              </button>
            );
          })}
        </div>
        );
      case 'status':
        return (
          <div className="flex flex-col space-y-[11px] items-center justify-between px-3">
          {STATUS_ITEMS.map((item) => {
            const Icon = item.icon; // 아이콘 컴포넌트 가져오기
            const isSelected = selectedStatus === item.id; // 선택 상태 확인

            return (
              <div
                key={item.id}
                className={`flex items-center space-x-2.5 w-full h-16 px-6 py-5 cursor-pointer rounded-md ${
                  isSelected
                    ? 'bg-background400 text-black'
                    : 'bg-transparent text-[#9e9892]'
                }`}
                onClick={() => setSelectedStatus(item.id)} // 선택 상태 업데이트
              >
                <Icon
                  className={`w-6 h-6 ${
                    isSelected ? 'fill-black' : 'fill-[#9e9892]'
                  }`}
                />
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
      {/* 필터 아이콘을 트리거로 사용 */}
      <DrawerTrigger>
        <FilterActivateIcon className="fill-gray200" />
      </DrawerTrigger>
      <DrawerContent>
        <div className="">
          {/* 닫기버튼 */}
          <DrawerClose asChild>
            <div className="w-full h-8 px-5 flex items-center justify-end">
              <DeleteIcon className="fill-gray200 w-6 h-6" />
            </div>
          </DrawerClose>

          {/* 탭 메뉴 */}
          <div className="max-w-[375px] h-12 space-x-4 flex items-center border-b pl-5">
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
            <button className="flex items-center justify-center w-[72px] h-16 bg-[#f0efee] rounded-xl">
              <ResetIcon className="fill-gray400" />
            </button>
            <button className="w-[252px] h-16 text-white bg-black rounded-xl">
              10개의 모임 보기
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
