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

const GamePage = ({ startTimer, stopTimer, resetTimer, time }) => {
  const { numbers, updateNumbers, nextNumber, resetNumbers } = useShuffledNumbers([1, 9], [10, 9]);
  const { isGameEnded, playTime, endGame, resetGame } = useGameStatus(resetTimer, resetNumbers);

  const handleCellClick = (number) => {
    if (number === 1) {
      startTimer();
    }

    if (number === 18) { // 마지막 숫자(18)일 때 게임 종료
      stopTimer();
      endGame(time); // endGame 호출하여 종료 상태 업데이트
      return; // 함수 종료
    }

    updateNumbers(number); // 마지막 숫자가 아닌 경우에만 호출
  };

  return (
    <GamePageContainer>
      <NextNumber nextNumber={nextNumber} />
      <GameBoard numbers={numbers} onCellClick={handleCellClick} />
      {isGameEnded && <GameEndModal playTime={playTime} onClose={resetGame} />} 
    </GamePageContainer>
  );
};

GamePage.propTypes = {
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};

export default GamePage;

