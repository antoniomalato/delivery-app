import React from 'react';
import PropTypes from 'prop-types';

const TableData = ({ dataTest, content }) => (
  <td
    data-testid={ dataTest }
  >
    { content }
  </td>
);

TableData.propTypes = {
  dataTest: PropTypes.string,
  content: PropTypes.string,
}.isRequired;

TableData.defaultProps = {
  dataTest: '',
};

export default TableData;
