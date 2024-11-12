import axios from 'axios';
import BASE_URL from '../config';

interface HobbyResponse {
  result?: { hobby: string };
  code?: string;
}

// 내 취미 조회
export const getMyHobby = async (token: string): Promise<HobbyResponse> => {
  try {
    const response = await axios.get<HobbyResponse>(`${BASE_URL}/user/my-hobby`, {
      headers: { token },
    });
    return response.data;
  } catch (error) {
    console.error("나의 취미 조회 실패:", error);
    throw error;
  }
};

// 다른 사람 취미 조회
export const getOtherUserHobby = async (userNumber: string, token: string): Promise<HobbyResponse> => {
  try {
    const response = await axios.get<HobbyResponse>(`${BASE_URL}/user/${userNumber}/hobby`, {
      headers: { token },
    });
    return response.data;
  } catch (error) {
    console.error("다른 사용자 취미 조회 실패:", error);
    throw error;
  }
};
