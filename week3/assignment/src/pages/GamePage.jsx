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

const GamePage = ({ startTimer, stopTimer, time }) => {
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [playTime, setPlayTime] = useState(null); 
  const { numbers, updateNumbers, nextNumber } = useShuffledNumbers([1, 9], [10, 9]); 

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
      {isGameEnded && <GameEndModal playTime={playTime} onClose={() => setIsGameEnded(false)} />}
    </GamePageContainer>
  );
};

GamePage.propTypes = {
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};

export default GamePage;
