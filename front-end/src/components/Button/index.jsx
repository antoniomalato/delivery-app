import React from 'react';
import PropTypes from 'prop-types';

function Button({ dataTest, text, handleClick, disabled }) {
  return (
    <button
      onClick={ handleClick }
      type="button"
      data-testid={ dataTest }
      disabled={ disabled }
    >
      { text }
    </button>
  );
}

Button.propTypes = {
  dataTest: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  handleClick: () => {},
};

export default Button;
