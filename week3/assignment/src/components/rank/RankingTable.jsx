import styled from 'styled-components';
import PropTypes from 'prop-types';

const Table = styled.table`
  width: 100%;
  max-width: 37.5rem;
  margin-top: 1rem;
  border-collapse: collapse;

  th, td {
    padding: 0.75rem;
    border: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: ${(props) => props.theme.colors.darkGray};
    color: ${(props) => props.theme.colors.white};
  }
`;

const RankingTable = ({ rankings }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>타임스탬프</th>
          <th>레벨</th>
          <th>플레이 시간</th>
        </tr>
      </thead>
      <tbody>
        {rankings.map((record, index) => (
          <tr key={index}>
            <td>{new Date(record.timestamp).toLocaleString()}</td>
            <td>Level {record.level}</td>
            <td>{record.playTime} 초</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

RankingTable.propTypes = {
  rankings: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
      playTime: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RankingTable;
