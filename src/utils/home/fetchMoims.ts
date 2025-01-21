
import { IMoim } from "@/types/home/i-moim";
import axiosHomeInstance from '@/libs/home/home-axios';

// API 통신
export const fetchMoims = async ({
  page = 1,
  moimType,
  region,
  moimStatus,
  sortOrder,
  confirmed,
}: {
  page?: number;
  moimType?: string;
  region?: string;
  moimStatus?: string;
  sortOrder?: 'latest' | 'likes' | 'deadline';
  confirmed?: boolean;
}): Promise<{ data: IMoim[]; pagination: { current_page: number; total_pages: number } }> => {
  try {
    const response = await axiosHomeInstance.get<{ data: IMoim[] }>('/moim/all', {
      params: {
        page,
        moimType,
        region,
        moimStatus,
        sortOrder,
        confirmed,
      },
    });

    return {
      data: response.data.data,
      pagination: {
        current_page: page,
        total_pages: Math.ceil(response.data.data.length / 10), // 총 페이지 수 계산
      },
    };
  } catch (error) {
    console.error('Failed to fetch moims:', error);
    return { data: [], pagination: { current_page: 1, total_pages: 1 } };
  }
};



// Mockdata통신
// export const fetchMockMoims = async ({
//   page = 1,
//   type,
//   region,
//   status,
//   confirmed,
//   sortOrder,
// }: {
//   page?: number;
//   type?: string;
//   region?: string;
//   status?: string;
//   confirmed?: boolean;
//   sortOrder?: 'latest' | 'likes' | 'deadline';
// }): Promise<{ data: IMoim[]; pagination: { current_page: number; total_pages: number } }> => {
//   console.log('Fetching Mock Data with params:', { page, type, region, status, confirmed, sortOrder });

//   const totalPages = 4;

//   if (page > totalPages) {
//     return { data: [], pagination: { current_page: page, total_pages: totalPages } };
//   }

//   const data = Array.from({ length: 10 }, (_, index) => ({
//     id: (page - 1) * 10 + index + 1,
//     type: index % 3 === 0 ? 'project' : index % 3 === 1 ? 'study' : 'interview',
//     name: `모임 제목 ${index + 1}`,
//     dateTime: new Date(`2025-02-${10 + index}`).toISOString(),
//     registrationEnd: new Date(`2025-02-${20 + index}`).toISOString(),
//     location: '위치가 들어갑니다',
//     participantCount: 20 + index,
//     capacity: 50,
//     status: index % 2 === 0 ? 'recruiting' : 'finished',
//     region: 'seoul',
//     image: '/images/sample-image.jpg',
//     confirmed: index % 2 === 0,
//     likes: Math.floor(Math.random() * 100),
//   }));

//   const filteredData = data.filter((item) => {
//     const typeMatch = type === 'all' || item.type === type;
//     const regionMatch = region === 'all' || item.region === region;
//     const statusMatch = status === 'all' || item.status === status;
//     const confirmedMatch = confirmed === undefined || item.confirmed === confirmed;
//     return typeMatch && regionMatch && statusMatch && confirmedMatch;
//   });

//   const sortedData = [...filteredData].sort((a, b) => {
//     if (sortOrder === 'latest') {
//       return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
//     }
//     if (sortOrder === 'likes') {
//       return (b.likes || 0) - (a.likes || 0);
//     }
//     if (sortOrder === 'deadline') {
//       return new Date(a.registrationEnd).getTime() - new Date(b.registrationEnd).getTime();
//     }
//     return 0;
//   });

//   return {
//     data: sortedData,
//     pagination: {
//       current_page: page,
//       total_pages: totalPages,
//     },
//   };
// };
