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
  const { numbers, updateNumbers, nextNumber, resetNumbers, isNew } = useShuffledNumbers([1, 9], [10, 9]); // isNew 추가
  const { isGameEnded, playTime, endGame, resetGame } = useGameStatus(resetTimer, resetNumbers, level);

  const handleCellClick = (number) => {
    if (number === nextNumber) { 
      if (number === 1) {
        startTimer();
      }
  
      if (number === 18) { // 모든 숫자를 다 누르고나서 마지막 숫자인 18일 때 게임 종료
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
      <GameBoard numbers={numbers} onCellClick={handleCellClick} isNew={isNew} /> {/* isNew 전달 */}
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
