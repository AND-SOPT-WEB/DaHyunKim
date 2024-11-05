import styled from 'styled-components';
import PropTypes from 'prop-types'; 
import GameBoard from '../components/game/GameBoard';
import NextNumber from '../components/game/NextNumber';
import useShuffledNumbers from '../hooks/useShuffledNumbers';

const GamePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const GamePage = ({ startTimer }) => {
  const { numbers, updateNumbers, nextNumber } = useShuffledNumbers([1, 9], [10, 9]);

  const handleCellClick = (number) => {
    if (number === 1) { 
      startTimer(); // 1을 클릭하면 타이머를 시작함
    }
    updateNumbers(number); 
  };

  return (
    <GamePageContainer>
      <NextNumber nextNumber={nextNumber} />
      <GameBoard numbers={numbers} onCellClick={handleCellClick} />
    </GamePageContainer>
  );
};

GamePage.propTypes = {
  startTimer: PropTypes.func.isRequired,
};

export default GamePage;
