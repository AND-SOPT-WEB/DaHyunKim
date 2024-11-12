import styled from 'styled-components';
import Header from '../../components/MyPage/Header';
import MyPageRoutes from '../../routes/MyPageRoutes';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const MyPage = () => {
  return (
    <Container>
      <Header />
      <MyPageRoutes />
    </Container>
  );
};

export default MyPage;
