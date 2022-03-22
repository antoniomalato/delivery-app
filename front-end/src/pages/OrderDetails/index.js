import React, { useCallback, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import Button from '../../components/Button/index';
import { getOrdersById, updateCustomerSaleStatus } from '../../utils/axios';
import { sellers } from '../../constants/sellers';
import TableData from '../../components/TableData';
import NavBar from '../../components/Cards/NavBar';

const OrderDetails = ({ match }) => {
  const customerOrder = 'customer_order_details__';
  const sellerName = 'element-order-details-label-seller-name';
  const deliveryStatus = 'element-order-details-label-delivery-status';
  const [orderDetails, setOrderDetails] = useState([]);
  const getOrders = useCallback(
    async () => {
      const { params: { id } } = match;
      const response = await getOrdersById(id);
      setOrderDetails(response.data.filter((order) => order.id === Number(id)));
    }, [match],
  );

  const sendStatus = async (stat) => {
    const { params: { id } } = match;
    const response = await updateCustomerSaleStatus(id, stat);
    setOrderDetails((prevState) => prevState.map((state) => (
      { ...response.data, products: state.products })));
  };

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div>
      <NavBar />
      { orderDetails.map((orderDetail) => (
        <>
          <div>
            <h3>
              Pedido:
              { ' ' }
              <span
                data-testid={ `${customerOrder}element-order-details-label-order-id` }
              >
                { orderDetail.id }
              </span>
            </h3>
            { sellers
              .filter((sell) => sell.id === orderDetail.seller_id)
              .map((seller) => (
                <h3
                  key={ seller.id }
                >
                  Vendedor:
                  { ' ' }
                  <span
                    data-testid={ `${customerOrder}${sellerName}` }
                  >
                    { seller.name }
                  </span>
                </h3>
              ))}
            <h3
              data-testid={ `${customerOrder}element-order-details-label-order-date` }
            >
              { new Date(orderDetail.createdAt).toLocaleDateString('pt-br') }
            </h3>
            <h3
              data-testid={ `${customerOrder}${deliveryStatus}` }
            >
              { orderDetail.status }
            </h3>
            <Button
              dataTest={ `${customerOrder}button-delivery-check` }
              text="Marcar com entregue"
              disabled={ orderDetail.status !== 'Em Trânsito' }
              handleClick={ () => sendStatus('Entregue') }
            />
          </div>
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
            <tbody>
              { orderDetail.products.map((product, index) => (
                <tr key={ product.id }>
                  <TableData
                    content={ index + 1 }
                    dataTest={
                      `${customerOrder}element-order-table-item-number-${index}`
                    }
                  />
                  <TableData
                    dataTest={ `${customerOrder}element-order-table-name-${index}` }
                    content={ product.products.name }
                  />
                  <TableData
                    dataTest={ `${customerOrder}element-order-table-quantity-${index}` }
                    content={ product.quantity }
                  />
                  <TableData
                    dataTest={ `${customerOrder}element-order-total-price-${index}` }
                    content={ product.products.price
                      .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
                  />
                  <TableData
                    dataTest={ `${customerOrder}element-order-table-sub-total-${index}` }
                    content={ (product.quantity * product.products.price)
                      .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
                  />
                </tr>
              ))}
            </tbody>
          </table>
          <h3
            data-testid={ `${customerOrder}element-order-total-price` }
          >
            { Number(orderDetail.total_price)
              .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </h3>
        </>
      ))}
    </div>
  );
};

OrderDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default OrderDetails;
