'use client';

import api from '@/apis/auth/axios.api';

function page() {
  const handleClick = async () => {
    const response = await api.put(
      '/api/moims/afc6d714-7b35-48ca-91b4-e5085cc171c4/review/63f50ca4-14cb-4a58-b8d4-cbb9bdc1bb8f',
      {
        review: '테스트리뷰2',
        rate: 'GOOD',
      },
    );
    console.log(response);
  };

  return (
    <div>
      <button onClick={handleClick}>테스트</button>
    </div>
  );
}

export default page;

// export const postMoims = (data: any) => {
//   const url = '/api/moims';
//   return api.post<any, any>(url, data, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };

// function page() {
//   const [file, setFile] = useState<File | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFile(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!file) return;
//     const formData = new FormData();

//     const moimData = {
//       title: '다시테스트',
//       content: '다시테스트내용',
//       roadAddress: '다시테스트주소',
//       recruitmentDeadline: new Date('2025-02-15').toISOString(),
//       startDate: new Date('2025-02-15').toISOString(),
//       endDate: new Date('2025-03-15').toISOString(),
//       minParticipants: 6,
//       maxParticipants: 16,
//       moimType: 'PROJECT',
//       status: 'RECRUIT',
//     };

//     formData.append('moim_image', file);
//     formData.append('moim_json', JSON.stringify(moimData));
//     const response = await postMoims(formData);
//     console.log(response);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" onChange={handleFileChange} />
//       <button type="submit">제출</button>
//     </form>
//   );
// }

// export default page;

// export const postMoims = (data: any) => {
//   const url = '/api/auth/me';
//   return api.put<any, any>(url, data, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };

// function page() {
//   const [file, setFile] = useState<File | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFile(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!file) return;
//     const formData = new FormData();

//     const meData = {
//       nickname: 'testUser123',
//       position: 'BACKEND',
//       introduction: '다시테스트소개소개',
//       tags: ['다시', '테스트'],
//     };

//     formData.append('me_image', file);
//     formData.append('me_json', JSON.stringify(meData));
//     const response = await postMoims(formData);
//     console.log(response);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" onChange={handleFileChange} />
//       <button type="submit">제출</button>
//     </form>
//   );
// }

// export default page;
