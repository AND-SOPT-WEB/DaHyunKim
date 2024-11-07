import { useState } from 'react';
import fisherYatesShuffle from '../utils/fisherYatesShuffle';

const useShuffledNumbers = (initialNumbersRange, remainingNumbersRange) => {
  // 특정 범위의 숫자를 랜덤으로 섞어 배열로 반환
  // start가 시작 숫자, count가 생성할 숫자 개수
  // numbers는 섞인 숫자 배열
  const generateShuffledNumbers = (start, count) => {
    const numbers = Array.from({ length: count }, (_, i) => i + start);
    return fisherYatesShuffle(numbers);
  };

  // 게임 보드에 표시할 초기 숫자 배열 생성 
  const [numbers, setNumbers] = useState(() => generateShuffledNumbers(initialNumbersRange[0], initialNumbersRange[1]));

  // 이후 표시할 나머지 숫자 배열 생성 그리고 오름차순으로 정렬함
  const [remainingNumbers, setRemainingNumbers] = useState(() =>
    generateShuffledNumbers(remainingNumbersRange[0], remainingNumbersRange[1]).sort((a, b) => a - b)
  );

  // 새로 추가된 숫자의 상태를 관리하는 배열, 셀 배경 색 다르게 하고 사라지면 opacity 투명으로 주기 위한 상태
  const [isNew, setIsNew] = useState(Array(numbers.length).fill(false));

  const updateNumbers = (number) => {
    // 현재 numbers 배열에서 가장 작은 숫자(=> 현재 클릭해야 할 올바른 숫자)
    const currentMin = Math.min(...numbers.filter((num) => num !== null));

    // 클릭한 숫자가 currentMin(정답 숫자)인 경우에만 진행
    if (number === currentMin) {
      const [nextNumber, ...rest] = remainingNumbers;

      // numbers 배열에서 클릭된 숫자 자리만 다음 숫자로 대체
      setNumbers((prev) =>
        prev.map((num, idx) => {
          if (num === number) {
            // 새로 추가된 숫자 위치 표시
            setIsNew((prevIsNew) => {
              const newIsNew = [...prevIsNew]; // 현재 isNew 배열을 새로운 배열로 복사
              newIsNew[idx] = true; // 클릭한 셀의 인덱스에 해당하는 위치를 true로 설정
              return newIsNew; // 업데이트된 배열을 반환하여 isNew 상태를 갱신
            });
            return nextNumber || null; // 다음 숫자가 없으면 null로 대체
          }
          return num;
        })
      );

      // remainingNumbers에서 숫자를 하나 제거하고 업데이트
      setRemainingNumbers(rest);
    }
  };

  // 게임을 초기 상태로 되돌리는 함수
  const resetNumbers = () => {
    const initial = generateShuffledNumbers(initialNumbersRange[0], initialNumbersRange[1]);
    const remaining = generateShuffledNumbers(remainingNumbersRange[0], remainingNumbersRange[1]).sort((a, b) => a - b);
    setNumbers(initial);
    setRemainingNumbers(remaining);
    setIsNew(Array(initial.length).fill(false)); // 초기화 시 isNew 배열도 초기화
  };

  // 다음에 클릭해야 할 숫자 계산 (numbers에서 null이 아닌 가장 작은 값)
  const nextNumber = numbers.length > 0 ? Math.min(...numbers.filter((num) => num !== null)) : null;

  return { numbers, updateNumbers, nextNumber, resetNumbers, isNew };
};

export default useShuffledNumbers;
