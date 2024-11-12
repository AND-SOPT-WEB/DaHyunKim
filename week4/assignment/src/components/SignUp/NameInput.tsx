import React, { useState } from 'react';
import styled from 'styled-components';
import NextButton from './NextButton';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  align-self: flex-start;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
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

interface NameInputProps {
  onNext: () => void;
}

const NameInput = ({ onNext }: NameInputProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setError(value.length > 8 ? '이름은 8자 이하로 입력해 주세요' : '');
  };

  const handleNext = () => {
    if (!error && name) {
      onNext();
    }
  };

  return (
    <FormContainer>
      <Label>이름</Label>
      <Input
        type="text"
        placeholder="사용자 이름을 입력해 주세요"
        value={name}
        onChange={handleChange}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {/* name이 비어 있는 경우 true */}
      {/* error가 존재할 경우 true */}
      <NextButton onClick={handleNext} disabled={!name || !!error}>
        다음
      </NextButton>
    </FormContainer>
  );
};



export default NameInput;

