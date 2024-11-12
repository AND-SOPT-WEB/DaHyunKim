import axios from 'axios';
import BASE_URL from '../config';

interface RegisterResponse {
  result?: {
    no: number;
  };
  code?: string;
}

interface RegisterData {
  username: string;
  password: string;
  hobby: string;
}

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(`${BASE_URL}/user`, data);
    return response.data;
  } catch (error) {
    console.error("회원가입 요청 실패:", error);
    throw error;
  }
};
