import React from 'react';
import PropTypes from 'prop-types';
import TableData from '../TableData';
import Button from '../Button/index';

const TableBody = ({ cartItem, index, handleClick }) => (
  <tbody>
    <tr>
      <TableData
        dataTest={
          `customer_checkout__element-order-table-item-number-${index}`
        }
        content={ index + 1 }
      />
      <TableData
        dataTest={
          `customer_checkout__element-order-table-name-${index}`
        }
        content={ cartItem.name }
      />
      <TableData
        dataTest={
          `customer_checkout__element-order-table-quantity-${index}`
        }
        content={ cartItem.quantity }
      />
      <TableData
        dataTest={
          `customer_checkout__element-order-table-unit-price-${index}`
        }
        content={ cartItem.price.replace('.', ',') }
      />
      <TableData
        dataTest={
          `customer_checkout__element-order-table-sub-total-${index}`
        }
        content={ (cartItem.price * cartItem.quantity)
          .toFixed(2).toString().replace('.', ',') }
      />
      <td>
        <Button
          dataTest={
            `customer_checkout__element-order-table-remove-${index}`
          }
          handleClick={ () => handleClick(cartItem.id) }
          text="Remover"
        />
      </td>
    </tr>

  </tbody>

);

TableBody.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number,
  handleClick: PropTypes.func,
}.isRequired;

export default TableBody;
