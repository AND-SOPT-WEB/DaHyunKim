import React, { useState } from 'react';
import styled from 'styled-components';
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  align-self: flex-start;
`;

interface HobbyInputProps {
  hobby: string;
  setHobby: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void; 
}

const HobbyInput = ({ hobby, setHobby, onNext }: HobbyInputProps) => {
  const [error, setError] = useState('');

  // 취미 유효성 검사
  const handleHobbyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHobby(value);
    if (value.length > 8) {
      setError('취미는 8자 이하로 입력해주세요');
    } else {
      setError('');
    }
  };

  return (
    <FormContainer>
      <SubTitle>취미</SubTitle>
      <Input
        type="text"
        placeholder="취미를 입력해 주세요"
        value={hobby}
        onChange={handleHobbyChange}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <NextButton
        onClick={onNext} 
        disabled={!hobby || !!error}
      >
        회원가입
      </NextButton>
    </FormContainer>
  );
};

export default HobbyInput;
