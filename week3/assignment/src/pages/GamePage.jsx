import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GameBoard from '../components/game/GameBoard';
import NextNumber from '../components/game/NextNumber';
import useShuffledNumbers from '../hooks/useShuffledNumbers';
import GameEndModal from '../components/game/GameEndModal';

const GamePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const GamePage = ({ startTimer, stopTimer, resetTimer, time }) => {
    const [isGameEnded, setIsGameEnded] = useState(false);
    const [playTime, setPlayTime] = useState(null);
    const { numbers, updateNumbers, nextNumber, resetNumbers } = useShuffledNumbers([1, 9], [10, 9]);

   // 게임 초기화 함수
   const resetGame = () => {
    resetTimer(); // 타이머 초기화
    setIsGameEnded(false); // 게임 종료 상태 초기화
    setPlayTime(null); // 걸린 시간 초기화
    resetNumbers(); // 숫자 배열 초기화
  };

  const handleCellClick = (number) => {
    if (number === 1) {
      startTimer();
    }

  if (number === 18) { // 마지막 숫자(18)일 때 게임 종료
    stopTimer();
    setPlayTime(time.toFixed(2)); // 게임 종료할 때 시간을 playTime에 저장
    setIsGameEnded(true);
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
