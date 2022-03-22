import React from 'react';
import PropTypes from 'prop-types';

function Input({ dataTest, value, id,
  placeholder, type, handleChange, text, name, size }) {
  return (
    <label htmlFor={ id }>
      { text }
      <input
        data-testid={ dataTest }
        type={ type }
        placeholder={ placeholder }
        value={ value }
        id={ id }
        name={ name }
        onChange={ handleChange }
        autoComplete="off"
        size={ size }
      />
    </label>

  );
}

Input.propTypes = {
  dataTest: PropTypes.string,
  value: PropTypes.string || PropTypes.number,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  text: PropTypes.string,
  handleChange: PropTypes.func,
}.isRequired;

Input.defaultProps = {
  size: '20',
  type: 'text',
};

export default Input;
