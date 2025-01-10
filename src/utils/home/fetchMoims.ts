
// CODE-PENDING || API 연결시 코드 type 분류 
export interface IMoim {
  id: number;
  category: string; 
  title: string;
  content: string;
  start_date: string;
  end_date: string;
  max_participants: number;
  status: string; 
  region: string; 
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
  region,
  status,
}: {
  page?: number;
  category?: string;
  region?: string; 
  status?: string; 
}): Promise<{ data: IMoim[]; pagination: { current_page: number; total_pages: number } }> => {
  console.log('Fetching Mock Data with params:', { page, category, region, status });

  const totalPages = 4;

  if (page > totalPages) {
    return { data: [], pagination: { current_page: page, total_pages: totalPages } };
  }

  const data = Array.from({ length: 10 }, (_, index) => ({
    id: (page - 1) * 10 + index + 1,
    category: index % 3 === 0 ? "project" : index % 3 === 1 ? "study" : "interview", 
    title: `모임 제목 ${index + 1}`,
    content: '위치가 들어갑니다',
    start_date: '2025-02-26',
    end_date: '2025-03-31',
    max_participants: 20 + index,
    status: index % 2 === 0 ? "recruiting" : "finished", 
    region: "seoul", 
  }));

  return {
    data: data.filter((item) => {
      const categoryMatch = category === "all" || item.category === category;
      const regionMatch = region === "all" || item.region === region;
      const statusMatch = status === "all" || item.status === status;
      return categoryMatch && regionMatch && statusMatch;
    }),
    pagination: {
      current_page: page,
      total_pages: totalPages,
    },
  };
};
