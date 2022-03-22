import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function CardOrder({ order }) {
  const { id, sale_date: date, status, total_price: totalPrice } = order;
  const history = useHistory();
  return (
    <button
      onClick={ () => history.push(`/customer/orders/${id}`) }
      type="button"
    >
      <span
        data-testid={ `customer_orders__element-order-id-${id}` }
      >
        { id }
      </span>
      <span
        data-testid={ `customer_orders__element-delivery-status-${id}` }
      >
        { status }
      </span>
      <span
        data-testid={ `customer_orders__element-order-date-${id}` }
      >
        { new Date(date).toLocaleDateString('pt-br') }
      </span>
      <span
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        { totalPrice.replace('.', ',') }
      </span>
    </button>

  );
}

CardOrder.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sale_date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    total_price: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardOrder;
