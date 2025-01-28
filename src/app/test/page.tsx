'use client';

import api from '@/apis/auth/axios.api';
import { useState } from 'react';

export const postMoims = (data: any) => {
  const url = '/api/moims';
  return api.post<any, any>(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

function page() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();

    const moimData = {
      title: '다시테스트',
      content: '다시테스트내용',
      roadAddress: '다시테스트주소',
      recruitmentDeadline: new Date('2025-02-15').toISOString(),
      startDate: new Date('2025-02-15').toISOString(),
      endDate: new Date('2025-03-15').toISOString(),
      minParticipants: 6,
      maxParticipants: 16,
      moimType: 'PROJECT',
      status: 'RECRUIT',
    };

    formData.append('moim_image', file);
    formData.append('moim_json', JSON.stringify(moimData));
    const response = await postMoims(formData);
    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">제출</button>
    </form>
  );
}

export default page;
