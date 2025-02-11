'use client';

import React, { useState } from 'react';
import { useMakeStore } from '@/stores/make/makeStore';
import CameraIcon from '../home/icons/CameraIcon';
import DeleteFillIcon from '../home/icons/DeleteFillIcon';

export default function DescriptionStep() {
  const { title, content, image, setTitle, setContent, setImage } = useMakeStore();
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value.trim().length > 0) setError(null);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (e.target.value.trim().length > 0) setError(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file); 
    }
  };

  return (
    <div className="flex flex-col space-y-4 px-5 min-h-[680px]">
      <div className="flex flex-col items-start mb-10">
        <h1 className="text-title-2 font-semibold">모임을 소개해주세요</h1>
        <p className="text-body-2-normal text-gray400">모임에서 어떤 활동을 할까요?</p>
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          제목 <span className="text-orange200">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="제목을 입력해주세요 (최대 20자)"
          maxLength={20}
          className="w-full min-h-[54px] p-4 mt-3 border bg-background400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange200"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          내용 <span className="text-orange200">*</span>
        </label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          placeholder="모임의 내용을 입력해주세요 (최대 200자)"
          maxLength={200}
          rows={4}
          className="w-full p-4 mt-3 border border-gray-300 bg-background400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">이미지</label>
        <div className="relative w-[120px] h-[120px] md:w-[240px] md:h-[240px] 2xl:w-[480px] 2xl:h-[480px] mt-2 bg-background400 rounded-md flex items-center justify-center transition-all duration-300">
          {image ? (
            <div className="relative w-full h-full group">
              <img src={URL.createObjectURL(image)} alt="uploaded" className="w-full h-full object-cover rounded-2xl" />
              <button
                onClick={() => setImage(null)} 
                className="absolute top-0 hidden group-hover:flex bg-gray900 bg-opacity-40 w-full h-full rounded-2xl text-white text-lg items-center justify-center"
              >
                <DeleteFillIcon className="fill-[#c4c4c4]" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <CameraIcon />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
