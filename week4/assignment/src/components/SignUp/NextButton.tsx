import styled from 'styled-components';

interface NextButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

const StyledNextButton = styled.button<{ disabled: boolean }>`
  padding: 0.75rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray : theme.colors.primary};
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  margin-top: 1rem;
  width: 100%;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.colors.gray : theme.colors.primaryHover};
  }
`;

const NextButton = ({ onClick, disabled, children }: NextButtonProps) => (
  <StyledNextButton onClick={onClick} disabled={disabled}>
    {children}
  </StyledNextButton>
);

export default NextButton;
