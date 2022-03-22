import React, { useEffect, useState } from 'react';
import NavBar from '../../components/Cards/NavBar';
import CardOrder from '../../components/Orders/index';
import { fetchOrders } from '../../utils/axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    const { data } = await fetchOrders();
    setOrders(data);
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <NavBar />
      <div className="orders-cards">
        { orders.map((order) => (
          <CardOrder
            key={ order.id }
            order={ order }
          />
        )) }
      </div>
    </>
  );
}

export default Orders;
