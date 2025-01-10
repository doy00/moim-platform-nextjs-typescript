// import axios from "@/libs/home/home-axios";
// import { mockMoims } from "@/mocks/home/mockMoims";

export interface IMoim {
  id: number;
  category: number;
  title: string;
  content: string;
  start_date: string;
  end_date: string;
  max_participants: number;
  status: number;
}

// API 통신
// export const fetchMoims = async ({
//   page = 1,
//   category,
//   status,
// }: {
//   page?: number;
//   category?: number | null;
//   status?: nunber | null;
// }) => {
//   try {
//     const response = await axios.get('/moims', {
//       params: { page, limit: 10, category, status }
//     });
//     return response.data;
//   } catch(error) {
//     console.log('API 통신 실패', error)
//   }
// };


// Mockdata통신
export const fetchMockMoims = async ({
  page = 1,
  category,
  status,
}: {
  page?: number | undefined;
  category?: number | null;
  status?: number | null;
}): Promise<{ data: IMoim[]; pagination: { current_page: number; total_pages: number } }> => {
  console.log('Fetching Mock Data with params:', { page, category, status });

  const totalPages = 4;

  if (page > totalPages) {
    return { data: [], pagination: { current_page: page, total_pages: totalPages } };
  }

  const data = Array.from({ length: 10 }, (_, index) => ({
    id: (page - 1) * 10 + index + 1,
    category: index % 3,
    title: `모임 제목 ${index + 1}`,
    content: '위치가 들어갑니다',
    start_date: '2025-02-26',
    end_date: '2025-03-31',
    max_participants: 20 + index,
    status: index % 2,
  }));

  return {
    data,
    pagination: {
      current_page: page,
      total_pages: totalPages,
    },
  };
};
