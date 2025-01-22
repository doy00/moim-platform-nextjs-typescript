import { IMoim } from "@/types/home/i-moim";
import axiosHomeInstance from "@/libs/home/home-axios";

// 모든 모임 데이터를 가져오는 함수
export const fetchAllMoims = async (): Promise<IMoim[]> => {
  try {
    const response = await axiosHomeInstance.get<{ data: IMoim[] }>('/moim/all');
    return response.data.data; // 백엔드에서 받은 데이터 반환
  } catch (error) {
    console.error("Failed to fetch all moims:", error);
    return []; // 에러 시 빈 배열 반환
  }
};

// 클라이언트에서 데이터를 필터링하는 함수
export const filterMoims = ({
  moims,
  moimType,
  region,
  moimStatus,
  sortOrder,
}: {
  moims: IMoim[];
  moimType?: string;
  region?: string;
  moimStatus?: string;
  sortOrder?: "latest" | "likes" | "deadline";
}): IMoim[] => {
  let filteredMoims = moims;

  // 필터 조건 적용
  if (moimType && moimType !== "all") {
    filteredMoims = filteredMoims.filter((moim) => moim.moimType === moimType);
  }

  if (region && region !== "all") {
    filteredMoims = filteredMoims.filter((moim) => moim.region === region);
  }

  if (moimStatus && moimStatus !== "all") {
    filteredMoims = filteredMoims.filter((moim) => moim.moimStatus === moimStatus);
  }

  // 정렬 조건 적용
  if (sortOrder) {
    if (sortOrder === "latest") {
      filteredMoims.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    } else if (sortOrder === "likes") {
      filteredMoims.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else if (sortOrder === "deadline") {
      filteredMoims.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
    }
  }

  return filteredMoims; // 필터링된 데이터 반환
};
