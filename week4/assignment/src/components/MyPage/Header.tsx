import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  width: 100%;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.3rem;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const MenuContainer = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1rem;
`;

const MenuItem = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none; 
`;

const LogoutButton = styled.button`
  background: none;
  font-size: 1rem;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <Title>마이페이지</Title>
        <MenuContainer>
          <MenuItem to="/mypage/hobby">취미</MenuItem>
          <MenuItem to="/mypage/info">내 정보</MenuItem>
        </MenuContainer>
      </LeftSection>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </HeaderContainer>
  );
};

export default Header;
