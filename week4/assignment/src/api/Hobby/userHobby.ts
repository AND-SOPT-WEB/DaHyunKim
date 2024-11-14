import api from '../config';

interface HobbyResponse {
  result?: { hobby: string };
  code?: string;
}

// 내 취미 조회
export const getMyHobby = async (): Promise<HobbyResponse> => {
  try {
    const response = await api.get<HobbyResponse>('/user/my-hobby');
    return response.data;
  } catch (error) {
    console.error("나의 취미 조회 실패:", error);
    throw error;
  }
};

// 다른 사람 취미 조회
export const getOtherUserHobby = async (userNumber: string): Promise<HobbyResponse> => {
  try {
    const response = await api.get<HobbyResponse>(`/user/${userNumber}/hobby`);
    return response.data;
  } catch (error) {
    console.error("다른 사용자 취미 조회 실패:", error);
    throw error;
  }
};
