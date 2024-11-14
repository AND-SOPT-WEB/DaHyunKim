import React, { useState } from 'react';
import styled from 'styled-components';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import NextButton from './NextButton';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
`;

const SubTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  align-self: flex-start;
  margin-bottom: 0.5rem;
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  margin-bottom: 0.1rem;
  outline: none;
  width: 100%;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ToggleVisibilityButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0.6rem;
  transform: translateY(-40%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.gray2};
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  align-self: flex-start;
`;

interface PasswordInputProps {
  onNext: () => void;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordInput = ({ onNext, password, setPassword }: PasswordInputProps) => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // 비밀번호 입력할 때 호출되는 함수
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value); 
    validatePassword(value, confirmPassword);
  };

  // 비밀번호 확인 입력할 때 호출되는 함수
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validatePassword(password, value);
  };

  // 비밀번호/비밀번호 확인 유효성 검사
  const validatePassword = (pw: string, confirmPw: string) => {
    if (pw.length > 8) {
      setError('비밀번호를 8자 이하로 입력해주세요');
    } else if (pw && confirmPw && pw !== confirmPw) {
      setError('비밀번호가 일치하지 않습니다');
    } else {
      setError('');
    }
  };

  // 비밀번호 유효하면 다음 단계
  const handleNext = () => {
    if (!error && confirmPassword && password === confirmPassword) {
      onNext();
    }
  };

  // 비밀번호 보이기/숨기기
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormContainer>
      <SubTitle>비밀번호</SubTitle>
      <PasswordWrapper>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호를 입력해 주세요"
          value={password} 
          onChange={handlePasswordChange} 
        />
        <ToggleVisibilityButton onClick={toggleShowPassword}>
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </ToggleVisibilityButton>
      </PasswordWrapper>

      <PasswordWrapper>
        <Input
          type="password"
          placeholder="비밀번호를 다시 입력해 주세요"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </PasswordWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <NextButton
        onClick={handleNext}
        disabled={!password || !confirmPassword || !!error || password.length > 8}
      >
        다음
      </NextButton>
    </FormContainer>
  );
};

export default PasswordInput;
