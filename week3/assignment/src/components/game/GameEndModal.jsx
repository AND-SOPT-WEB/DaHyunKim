import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  padding: 2rem;
  border-radius: 0.75rem;
  text-align: center;
  width: 23rem;
  height: 10rem;
`;

const ModalTitle = styled.div`
  color: ${(props) => props.theme.colors.black};
  font-size: 1.25rem;
  font-weight: 600;
`;

const TimeSubtitle = styled.div`
  color: ${(props) => props.theme.colors.black};
  margin-top: 0.3rem;
`;

const ConfirmButton = styled.button`
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  width: 5rem;
  padding: 0.3rem;
  border-radius: 0.5rem;
  margin-top: 0.7rem;

  &:hover {
    cursor: pointer;
  }
`;


const GameEndModal = ({ playTime, onClose }) => {
  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>게임 끝!</ModalTitle>
        <TimeSubtitle>기록: {playTime}초</TimeSubtitle>
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </ModalContent>
    </ModalOverlay>,
     document.getElementById('modal-root') 
  );
};

export default GameEndModal;
