import { useState } from 'react';
import styled from 'styled-components';
import NameInput from '../../components/SignUp/NameInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SignupTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const LoginLink = styled.div`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.black};
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.black};
  text-decoration: underline;
  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;


const SignUpPage = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const renderStep = () => {
    if (step === 1) return <NameInput onNext={nextStep} />;
    // 추후 단계별 컴포넌트 추가
  };

  return (
    <Container>
      <SignupTitle>회원가입</SignupTitle>
      {renderStep()}
      <LoginLink>
        이미 회원이신가요? <StyledLink href="/">로그인</StyledLink>
      </LoginLink>
    </Container>
  );
};

export default SignUpPage;

