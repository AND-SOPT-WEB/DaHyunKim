import styled from 'styled-components';
import PropTypes from 'prop-types';

const GameBoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.gridSize}, 1fr);
  max-width: ${(props) => props.gridSize * 6.5}rem;
  gap: 0.5rem;
  margin-top: 1rem;
`;

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

const GameBoard = ({ numbers, onCellClick, isNew, gridSize }) => {
  return (
    <GameBoardContainer gridSize={gridSize}>
      {numbers.map((number, index) => (
        <Cell
          key={index}
          $isNew={isNew[index]}
          $isVisible={number !== null}
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
  gridSize: PropTypes.number.isRequired, 
};

export default GameBoard;
