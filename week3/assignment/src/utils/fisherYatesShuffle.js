// 피셔-예이츠 알고리즘을 이용해 배열을 무작위로 섞음
const fisherYatesShuffle = (array) => {
    // i는 현재 요소의 위치, 배열의 마지막 요소부터 시작해 앞으로 이동
    // array.length - 1은 배열의 마지막 인덱스를 뜻함
    // i-- 로 1씩 감소시킴, 이러면 앞쪽으로 한 칸씩 이동하게 됨
    for (let i = array.length - 1; i > 0; i--) {
      // 현재 위치 i와 그 앞의 인덱스들 중 하나를 무작위로 선택해서 j에 저장하는 것
      // i + 1을 곱하는 이유는 i까지의 인덱스 중 하나를 선택하기 위해서
      // Math.floor()는 소수점을 버리고 아래쪽으로 가장 가까운 정수로 만듦
      const j = Math.floor(Math.random() * (i + 1));
      // array[i]와 array[j]를 교환
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  export default fisherYatesShuffle;