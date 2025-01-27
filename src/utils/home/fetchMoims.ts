import axiosHomeInstance from "@/libs/home/home-axios";

export const fetchMoims = async ({ pageParam = 1 }: { pageParam: number }) => {
  try {
    const response = await axiosHomeInstance.get('/moim/all', {
      params: { page: pageParam },
    });
    console.log("fetchMoims Response:", response.data);
    return response.data;
  } catch (error) {
    // console.error("fetchMoims Error:", error.response || error);
    throw error; // 에러를 다시 던져서 처리
  }
};
