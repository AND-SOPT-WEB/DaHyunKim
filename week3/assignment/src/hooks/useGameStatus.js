import { useState } from 'react';

const useGameStatus = (resetTimer, resetNumbers) => {
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [playTime, setPlayTime] = useState(null);

  // 게임 종료 함수
  const endGame = (time) => {
    setPlayTime(time.toFixed(2));
    setIsGameEnded(true); 
  };

  // 게임 초기화 함수
  const resetGame = () => {
    resetTimer(); // 타이머 초기화
    setIsGameEnded(false); // 게임 종료 상태 초기화
    setPlayTime(null); // 걸린 시간 초기화
    resetNumbers(); // 숫자 배열 초기화
  };

  return { isGameEnded, playTime, endGame, resetGame };
};

export default useGameStatus;
