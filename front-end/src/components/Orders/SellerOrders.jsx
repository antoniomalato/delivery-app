import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function SellerOrdersCard({ sellerOrder }) {
  const { id, sale_date: date, status, total_price: totalPrice, address } = sellerOrder;
  const history = useHistory();
  return (
    <button
      onClick={ () => history.push(`/seller/orders/${id}`) }
      type="button"
    >
      <span
        data-testid={ `seller_orders__element-order-id-${id}` }
      >
        { id }
      </span>
      <span
        data-testid={ `seller_orders__element-delivery-status-${id}` }
      >
        { console.log(status) }
        { status }
      </span>
      <span
        data-testid={ `seller_orders__element-order-date-${id}` }
      >
        { new Date(date).toLocaleDateString('pt-br') }
      </span>
      <span
        data-testid={ `seller_orders__element-card-price-${id}` }
      >
        { totalPrice.replace('.', ',') }
      </span>
      <span
        data-testid={ `seller_orders__element-card-address-${id}` }
      >
        { address }
      </span>
    </button>

  );
}

SellerOrdersCard.propTypes = {
  sellerOrder: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sale_date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    total_price: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};

export default SellerOrdersCard;
