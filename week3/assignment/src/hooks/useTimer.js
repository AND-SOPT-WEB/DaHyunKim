import { useState, useRef } from 'react';

const useTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  // useRef를 사용해 타이머 ID를 저장, 이러면 setInterval로 반복되는 타이머를 나중에 멈추가나 초기화 할 수 있음
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) { // 타이머가 멈춰 있을 때만 실행되게
      setIsRunning(true); // 실행 상태로 변경
      // timerRef.current를 통해 setInterval이 반환하는 ID 값을 timerRef에 저장
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 0.01); // 이전 값에 0.01을 더해 업데이트
      }, 10); // 10ms마다 한 번 실행
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current); // 타이머 멈추기
      timerRef.current = null; //타이머 ID 초기화시킴
      setIsRunning(false); // 실행 상태를 멈춤으로 변경
    }
  };

  // 타이머 초기화 함수
  const resetTimer = () => {
    clearInterval(timerRef.current); // 타이머 멈추가
    setTime(0); // 시간 0으로 초기화시킴
    setIsRunning(false); // 실행 상태를 멈춤으로 변경
  };

  return { time, startTimer, stopTimer, resetTimer, isRunning }; 
};

export default useTimer;
