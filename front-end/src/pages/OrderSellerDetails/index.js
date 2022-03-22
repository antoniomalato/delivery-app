import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSellerOrdersById, updateSaleStatus } from '../../utils/axios';
import TableData from '../../components/TableData';
import NavBar from '../../components/Cards/NavBar';

const OrderSellerDetails = ({ match }) => {
  const sellerOrder = 'seller_order_details__';
  const [orders, setOrders] = useState([]);

  const getOrders = useCallback(
    async () => {
      const { params: { id } } = match;
      const response = await getSellerOrdersById(id);
      const filteredResponse = response.data
        .filter((sell) => sell.id === Number(id));
      setOrders(filteredResponse);
    }, [match],
  );

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const sendStatus = async (stat) => {
    const { params: { id } } = match;
    const response = await updateSaleStatus(id, stat);
    setOrders((prevState) => prevState.map((state) => (
      { ...response.data, products: state.products })));
  };

  return (
    <>
      <NavBar />
      { orders.map((order) => (
        <div key={ order.id }>
          <h3>
            Pedido:
            { ' ' }
            <span
              data-testid={ `${sellerOrder}element-order-details-label-order-id` }
            >
              { order.id }
            </span>
          </h3>
          <h3
            data-testid={ `${sellerOrder}element-order-details-label-order-date` }
          >
            { new Date(order.sale_date).toLocaleDateString('pt-br') }
          </h3>
          <h3
            data-testid={ `${sellerOrder}element-order-details-label-delivery-status` }
          >
            { order.status }
          </h3>
          <button
            type="button"
            data-testid={ `${sellerOrder}button-preparing-check` }
            onClick={ () => sendStatus('Preparando') }
            disabled={ order.status !== 'Pendente' }
          >
            Preparar pedido
          </button>
          <button
            type="button"
            data-testid={ `${sellerOrder}button-dispatch-check` }
            onClick={ () => sendStatus('Em Trânsito') }
            disabled={ order.status !== 'Preparando' }
          >
            Saiu para entrega
          </button>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Sub-total</th>
              </tr>
            </thead>
            { order.products.map((product, index) => (
              <tbody key={ product.products.id }>
                <tr>
                  <TableData
                    dataTest={ `${sellerOrder}element-order-table-item-number-${index}` }
                    content={ index + 1 }
                  />
                  <TableData
                    dataTest={ `${sellerOrder}element-order-table-name-${index}` }
                    content={ product.products.name }
                  />
                  <TableData
                    dataTest={ `${sellerOrder}element-order-table-quantity-${index}` }
                    content={ product.products.quantity }
                  />
                  <TableData
                    dataTest={ `${sellerOrder}element-order-table-unit-price-${index}` }
                    content={ Number(product.products.price)
                      .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
                  />
                  <TableData
                    dataTest={ `${sellerOrder}element-order-table-sub-total-${index}` }
                    content={ (product.products.price * product.quantity)
                      .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
                  />
                </tr>
              </tbody>
            ))}
          </table>
          <h3
            data-testid={ `${sellerOrder}element-order-total-price` }
          >
            { Number(order.total_price)
              .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
          </h3>
        </div>
      ))}
    </>
  );
};

OrderSellerDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default OrderSellerDetails;
