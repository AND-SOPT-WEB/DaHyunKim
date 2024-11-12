import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMyHobby, getOtherUserHobby } from '../../api/Hobby/userHobby';

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

const HobbyText = styled.div`
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors.black};
`;

const SearchButton = styled.button`
  margin-top: 1rem;
  width: 100%;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Hobby = () => {
  const [userNumber, setUserNumber] = useState('');
  const [myHobby, setMyHobby] = useState('');
  const [otherUserHobby, setOtherUserHobby] = useState('');
  const [searchedUserNumber, setSearchedUserNumber] = useState('');
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    const fetchMyHobby = async () => {
      try {
        const response = await getMyHobby(token);
        if (response.result?.hobby) {
          setMyHobby(response.result.hobby);
        } else {
          setMyHobby('취미 정보가 없습니다.');
        }
      } catch {
        alert('취미 정보를 불러오지 못했습니다.');
      }
    };

    fetchMyHobby();
  }, [token]);

const handleSearch = async () => {
    setOtherUserHobby('');
  
    if (!userNumber) {
      alert('사용자 번호를 입력해주세요.');
      return;
    }
  
    try {
      const response = await getOtherUserHobby(userNumber, token);
      // hobby 데이터가 없으면 예외 발생
      if (!response.result?.hobby) throw new Error();
      
      // hobby 데이터가 있으면 상태 업데이트
      setOtherUserHobby(response.result.hobby);
      setSearchedUserNumber(userNumber);
  
    } catch (error) {
      alert('없는 데이터입니다.');
      setSearchedUserNumber(userNumber);
    }
  };

  return (
    <PageContainer>
      <HobbyContent>
        <Title>취미</Title>
        <Subtitle>나의 취미</Subtitle>
        <HobbyText>{myHobby}</HobbyText>
        <Subtitle>다른 사람들의 취미</Subtitle>
        <Input
          type="text"
          placeholder="사용자 번호"
          value={userNumber}
          onChange={(e) => setUserNumber(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
        {otherUserHobby && <HobbyText>{`${searchedUserNumber}번 사용자의 취미: ${otherUserHobby}`}</HobbyText>}
      </HobbyContent>
    </PageContainer>
  );
};

export default Hobby;
