import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NameInput from '../../components/Signup/NameInput';
import PasswordInput from '../../components/Signup/PasswordInput';
import HobbyInput from '../../components/Signup/HobbyInput';
import { registerUser } from '../../api/Signup/userRegister'; 

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

const UnderlineLoginLink = styled.a`
  color: ${({ theme }) => theme.colors.black};
  text-decoration: underline;
  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hobby, setHobby] = useState('');
  const navigate = useNavigate();

  // 다음 단계로 진행
  const nextStep = () => setStep(step + 1);

  // 회원가입 api 호출
  const handleSignUp = async () => {
    try {
      const response = await registerUser({ username, password, hobby });
      if (response.result) {
        alert(`회원가입 성공! 회원번호: ${response.result.no}`);
        navigate('/'); 
      } else if (response.code) {
        alert('회원가입에 실패했습니다.');
      }
    } catch (error) {
      alert('회원가입 요청 중 오류가 발생했습니다.');
    }
  };

  // 단계별 컴포넌트 렌더링
  const renderStep = () => {
    if (step === 1) return <NameInput onNext={nextStep} setUsername={setUsername} />;
    if (step === 2) return <PasswordInput onNext={nextStep} setPassword={setPassword} password={password} />;
    if (step === 3) return <HobbyInput onNext={handleSignUp} hobby={hobby} setHobby={setHobby} />;
  };

  return (
    <Container>
      <SignupTitle>회원가입</SignupTitle>
      {renderStep()}
      <LoginLink>
        이미 회원이신가요? <UnderlineLoginLink href="/">로그인</UnderlineLoginLink>
      </LoginLink>
    </Container>
  );
};

export default SignUpPage;
