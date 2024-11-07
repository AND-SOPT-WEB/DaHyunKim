import { useState } from 'react';

const useGameStatus = (resetTimer, resetNumbers, level) => {
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [playTime, setPlayTime] = useState(null);

  // 게임 종료 함수
  const endGame = (time) => {
    const formattedTime = time.toFixed(2);
    setPlayTime(formattedTime); 
    setIsGameEnded(true); 

    // 현재 시각, 레벨, 플레이 시간 정보 저장겡
    const gameData = {
      timestamp: new Date().toISOString(), // 현재 시각
      level: level, // 현재 레벨
      playTime: formattedTime // 플레이 시간
    };

    // 기존 데이터에 추가하여 저장
    const existingData = JSON.parse(localStorage.getItem('gameRankings')) || [];
    existingData.push(gameData);
    localStorage.setItem('gameRankings', JSON.stringify(existingData));
  };

  // 게임 초기화 함수
  const resetGame = () => {
    resetTimer(); 
    setIsGameEnded(false); 
    setPlayTime(null); 
    resetNumbers(); 
  };

  return { isGameEnded, playTime, endGame, resetGame };
};

export default useGameStatus;
