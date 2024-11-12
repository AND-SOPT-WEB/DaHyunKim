import axios from 'axios';
import BASE_URL from '../config';

interface UpdateInfoRequest {
  password?: string;
  hobby?: string;
}

interface UpdateInfoResponse {
  code?: string;
}

export const updateUserInfo = async (
  token: string,
  data: UpdateInfoRequest
): Promise<UpdateInfoResponse> => {
  try {
    const response = await axios.put<UpdateInfoResponse>(`${BASE_URL}/user`, data, {
      headers: { token },
    });
    return response.data;
  } catch (error) {
    console.error("정보 수정 요청 실패:", error);
    throw error;
  }
};
