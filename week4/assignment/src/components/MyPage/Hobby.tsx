import { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const HobbyContent = styled.div`
  width: 30rem;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Subtitle = styled.h3`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.black};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;

const MyHobbyText = styled.div`
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors.black};
`;

const SearchButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  cursor: pointer;
`;

const Hobby = () => {
  const [userNumber, setUserNumber] = useState('');
  const [hobby, setHobby] = useState('독서'); 

  const handleSearch = () => {
    if (!userNumber) {
      alert('사용자 번호를 입력해주세요');
      return;
    }
    alert(`사용자 ${userNumber}의 취미를 검색합니다.`);
  };

  return (
    <PageContainer>
      <HobbyContent>
        <Title>취미</Title>
        <Subtitle>나의 취미</Subtitle>
        <MyHobbyText>{hobby}</MyHobbyText>
        <Subtitle>다른 사람들의 취미</Subtitle>
        <Input
          type="text"
          placeholder="사용자 번호"
          value={userNumber}
          onChange={(e) => setUserNumber(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </HobbyContent>
    </PageContainer>
  );
};

export default Hobby;
