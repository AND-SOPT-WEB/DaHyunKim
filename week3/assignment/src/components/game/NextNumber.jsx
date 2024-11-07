import PropTypes from 'prop-types';

const NextNumber = ({ nextNumber }) => (
  <h2>다음 숫자: {nextNumber}</h2>
);

NextNumber.propTypes = {
  nextNumber: PropTypes.number.isRequired,
};

export default NextNumber;
