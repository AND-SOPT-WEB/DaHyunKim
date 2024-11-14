import { AxiosError } from 'axios';
import api from '../config';

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
    const response = await api.put<UpdateInfoResponse>('/user', data, {
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("정보 수정 요청 실패:", error.response?.data);
    }
    throw error; 
  }
};