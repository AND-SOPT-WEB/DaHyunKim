import { AxiosError } from 'axios';
import api from '../config';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  result?: { token: string };
  code?: string;
}

export const userLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/login', data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("로그인 요청 실패:", error.response?.data);
      return error.response?.data || {};
    }
    throw new Error("에러 발생");
  }
};
