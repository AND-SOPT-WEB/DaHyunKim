import styled from 'styled-components';
import PropTypes from 'prop-types';

const GameBoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 19.5rem;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 6rem;
  background-color: ${(props) => props.theme.colors.lightGray};
  font-size: 1.5rem;
  font-family: ${(props) => props.theme.fonts.Aftika};
  cursor: pointer;
`;

const GameBoard = ({ numbers, onCellClick }) => {
  return (
    <GameBoardContainer>
      {numbers.map((number, index) => (
        <Cell key={index} onClick={() => onCellClick(number)}>
          {number}
        </Cell>
      ))}
    </GameBoardContainer>
  );
};

GameBoard.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  onCellClick: PropTypes.func.isRequired,
};

export default GameBoard;
