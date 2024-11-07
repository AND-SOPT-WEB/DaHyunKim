import styled from 'styled-components';
import useRankings from '../hooks/useRankings';
import RankingTable from '../components/rank/RankingTable';

const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 37.5rem;
  align-items: center;
`;

const ResetButton = styled.button`
  background-color: ${(props) => props.theme.colors.darkGray};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.gray};
  }
`;

const RankingPage = () => {
  const { rankings, clearRankings } = useRankings(); 

  return (
    <RankingContainer>
      <Header>
        <h2>랭킹</h2>
        <ResetButton onClick={clearRankings}>초기화</ResetButton>
      </Header>
      <RankingTable rankings={rankings} />
    </RankingContainer>
  );
};

export default RankingPage;
