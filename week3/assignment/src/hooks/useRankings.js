import { useState } from 'react';

const useRankings = () => {
  const [rankings, setRankings] = useState(loadRankings());

  // 로컬 스토리지에서 데이터 불러오기
  function loadRankings() {
    const savedRankings = JSON.parse(localStorage.getItem('gameRankings')) || [];
    return savedRankings.sort((a, b) => {
      // 레벨 기준 내림차순 정렬
      if (b.level !== a.level) {
        return b.level - a.level;
      }
      // 레벨이 같으면 playTime 기준 오름차순 정렬
      return parseFloat(a.playTime) - parseFloat(b.playTime);
    });
  }

  // 랭킹 초기화 함수
  const clearRankings = () => {
    localStorage.removeItem('gameRankings');
    setRankings([]);
  };

  return { rankings, clearRankings };
};

export default useRankings;
