import { useState } from 'react';
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
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const NameInput = ({ onNext, setUsername }: NameInputProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // 입력 변경 시 이름 업데이트 및 유효성 검사
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setUsername(value); // 상위 컴포넌트의 상태 업데이트
    setError(value.length > 8 ? '이름은 8자 이하로 입력해 주세요' : '');
  };

  // "다음" 버튼 클릭 시 유효성 검사 후 onNext 호출
  const handleNext = () => {
    if (!error && name) {
      onNext();
    }
  };

  return (
    <FormContainer>
      <SubTitle>이름</SubTitle>
      <Input
        type="text"
        placeholder="사용자 이름을 입력해 주세요"
        value={name}
        onChange={handleChange}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <NextButton onClick={handleNext} disabled={!name || !!error}>
        다음
      </NextButton>
    </FormContainer>
  );
};

export default NameInput;
