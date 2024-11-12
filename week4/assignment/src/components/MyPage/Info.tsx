import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { updateUserInfo } from '../../api/Info/userInfoUpdate';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const InfoContent = styled.div`
  width: 30rem;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const InputTitle = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;

const UpdateButton = styled.button`
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

const Info = () => {
  const [newPassword, setNewPassword] = useState('');
  const [newHobby, setNewHobby] = useState('');
  const token = localStorage.getItem('token') || '';
  const navigate = useNavigate();

  const handleUpdate = async () => {
    if (!newPassword && !newHobby) {
      alert('정보를 입력하세요');
      return;
    }

    const data: { password?: string; hobby?: string } = {};
    if (newPassword) data.password = newPassword;
    if (newHobby) data.hobby = newHobby;

    try {
      const response = await updateUserInfo(token, data);
      if (response.code === '00') {
        alert('수정 실패');
      } else {
        alert('정보 수정에 성공했습니다.');
        navigate('/'); 
      }
    } catch {
      alert('수정 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <PageContainer>
      <InfoContent>
        <Title>내 정보 수정하기</Title>
        <InputTitle>새 비밀번호</InputTitle>
        <Input
          type="password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <InputTitle>새 취미</InputTitle>
        <Input
          type="text"
          placeholder="새 취미"
          value={newHobby}
          onChange={(e) => setNewHobby(e.target.value)}
        />
        <UpdateButton onClick={handleUpdate}>수정하기</UpdateButton>
      </InfoContent>
    </PageContainer>
  );
};

export default Info;
