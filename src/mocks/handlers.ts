import { rest } from 'msw';

// 더미 데이터 생성
const mockMoimData = Array.from({ length: 50 }, (_, index) => ({
  moimId: index + 1,
  title: `모임 ${index + 1}`,
  roadAddress: `서울특별시 강남구 테헤란로 ${index + 1}`,
  startDate: `2025-01-${(index % 30) + 1}`,
  endDate: `2025-02-${(index % 30) + 1}`,
  participants: Math.floor(Math.random() * 100),
  likes: Math.floor(Math.random() * 50),
}));

// 핸들러 정의
export const handlers = [
  // Mock /moim/all endpoint
  rest.get('/moim/all', (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page')) || 1;
    const limit = Number(req.url.searchParams.get('limit')) || 10;

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedData = mockMoimData.slice(start, end);

    return res(
      ctx.status(200),
      ctx.json({
        data: paginatedData,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(mockMoimData.length / limit),
          totalCount: mockMoimData.length,
        },
      })
    );
  }),
];

