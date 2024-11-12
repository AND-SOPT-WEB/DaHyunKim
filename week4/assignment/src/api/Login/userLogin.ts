import axios, { AxiosError } from 'axios';
import BASE_URL from '../config';

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
    const response = await axios.post<LoginResponse>(`${BASE_URL}/login`, data);
    return response.data;
  } catch (error) {
    console.error("로그인 요청 실패:", error);

    if (error instanceof AxiosError && error.response && error.response.data) {
      return error.response.data;
    }
    
    throw new Error("에러 발생");
  }
};
