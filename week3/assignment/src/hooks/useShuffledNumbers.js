import { useState } from 'react';
import fisherYatesShuffle from '../utils/fisherYatesShuffle';

const useShuffledNumbers = (initialNumbersRange, remainingNumbersRange) => {
  // 특정 범위의 숫자를 무작위로 섞어 배열로 반환
  // start는 생성할 숫자 범위의 시작값
  // count는 배열의 몇 개의 숫자가 필요한지를 정해줌
  const generateShuffledNumbers = (start, count) => {
    // 특정 숫자 범위를 가진 배열을 만드는 역할
    // Array.from은 새로운 배열을 생성해주는 메소드
    // 배열의 길이를 count로 지정
    const numbers = Array.from({ length: count }, (_, i) => i + start);
    return fisherYatesShuffle(numbers);
  };

  // 초기 숫자 배열 설정
  const [numbers, setNumbers] = useState(() => generateShuffledNumbers(initialNumbersRange[0], initialNumbersRange[1]));
  const [remainingNumbers, setRemainingNumbers] = useState(() => generateShuffledNumbers(remainingNumbersRange[0], remainingNumbersRange[1]));

  const updateNumbers = (number) => {
    const currentMin = Math.min(...numbers);
    if (number === currentMin) {
      const [nextNumber, ...rest] = remainingNumbers;
      setNumbers((prev) =>
        fisherYatesShuffle(
          prev.filter((num) => num !== number).concat(nextNumber || [])
        )
      );
      setRemainingNumbers(rest);
    }
  };

  // 숫자 배열을 초기 상태로 되돌리는 함수
  // initialNumbersRange와 remainingNumbersRange를 사용해 초기 상태로 다시 섞음
  const resetNumbers = () => {
    setNumbers(generateShuffledNumbers(initialNumbersRange[0], initialNumbersRange[1]));
    setRemainingNumbers(generateShuffledNumbers(remainingNumbersRange[0], remainingNumbersRange[1]));
  };

  return { numbers, updateNumbers, nextNumber: Math.min(...numbers), resetNumbers };
};

export default useShuffledNumbers;

