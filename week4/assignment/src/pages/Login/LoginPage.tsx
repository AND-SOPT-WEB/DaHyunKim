import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const LoginTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.black};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 23rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const LoginButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const SignUpLink = styled(Link)`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const LoginPage = () => {
  return (
    <Container>
      <LoginTitle>로그인</LoginTitle>
      <Form>
        <Input type="text" placeholder="아이디" />
        <Input type="password" placeholder="비밀번호" />
        <LoginButton>로그인</LoginButton>
      </Form>
      <SignUpLink to="/signup">회원가입</SignUpLink> 
    </Container>
  );
};

export default LoginPage;
