import styled from 'styled-components';
import PropTypes from 'prop-types';
import GameBoard from '../components/game/GameBoard';
import NextNumber from '../components/game/NextNumber';
import GameEndModal from '../components/game/GameEndModal';
import useShuffledNumbers from '../hooks/useShuffledNumbers';
import useGameStatus from '../hooks/useGameStatus';

const GamePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const GamePage = ({ startTimer, stopTimer, resetTimer, time, level }) => {

  // levelSettings를 GamePage 컴포넌트 내부에 둘지, 분리할지 고민이에요
  const levelSettings = {
    1: { initialRange: [1, 9], remainingRange: [10, 9], gridSize: 3 }, 
    2: { initialRange: [1, 16], remainingRange: [17, 16], gridSize: 4 }, 
    3: { initialRange: [1, 25], remainingRange: [26, 25], gridSize: 5 }, 
  };

  const { initialRange, remainingRange, gridSize } = levelSettings[level];
  const { numbers, updateNumbers, nextNumber, resetNumbers, isNew } = useShuffledNumbers(initialRange, remainingRange);
  const { isGameEnded, playTime, endGame, resetGame } = useGameStatus(resetTimer, resetNumbers, level);

  const handleCellClick = (number) => {
    if (number === nextNumber) { 
      if (number === 1) {
        startTimer();
      }
      if (number === initialRange[1] + remainingRange[1]) { // 레벨별 마지막 숫자에 맞춰 종료하기
        stopTimer();
        endGame(time);
        return;
      }
      updateNumbers(number); 
    }
  };

  return (
    <GamePageContainer>
      <NextNumber nextNumber={nextNumber} />
      <GameBoard numbers={numbers} onCellClick={handleCellClick} isNew={isNew} gridSize={gridSize} />
      {isGameEnded && <GameEndModal playTime={playTime} onClose={resetGame} />}
    </GamePageContainer>
  );
};

GamePage.propTypes = {
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
};

export default GamePage;
