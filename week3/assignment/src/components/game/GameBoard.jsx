import styled from 'styled-components';
import PropTypes from 'prop-types';

const GameBoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 19.5rem;
  gap: 0.5rem;
  margin-top: 1rem;
`;

// 스타일에만 사용되는 $isNew 및 $isVisible props
const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 6rem;
  color: ${({ theme, $isNew }) => ($isNew ? theme.colors.white : theme.colors.black)};
  background-color: ${({ theme, $isNew }) => ($isNew ? theme.colors.darkGray : theme.colors.lightGray)};
  font-size: 1.5rem;
  font-family: ${(props) => props.theme.fonts.Aftika};
  cursor: pointer;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)}; 
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')}; 

  &:active {
    background-color: ${(props) => props.theme.colors.gray}; 
    transform: scale(0.95); 
  }
`;

const GameBoard = ({ numbers, onCellClick, isNew }) => {
  return (
    <GameBoardContainer>
      {numbers.map((number, index) => (
        <Cell
          key={index}
          $isNew={isNew[index]} // 스타일 prop에 $ 접두사를 사용하여 스타일에만 적용
          $isVisible={number !== null} // number가 null이면 투명하게 처리
          onClick={() => number !== null && onCellClick(number)}
        >
          {number}
        </Cell>
      ))}
    </GameBoardContainer>
  );
};

GameBoard.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  onCellClick: PropTypes.func.isRequired,
  isNew: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export default GameBoard;
