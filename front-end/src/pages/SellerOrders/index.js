import React, { useEffect, useState } from 'react';
import NavBar from '../../components/Cards/NavBar';
import SellerOrders from '../../components/Orders/SellerOrders';
import { fetchSellerOrders } from '../../utils/axios';

function SellerOrder() {
  const [sellerOrders, setSellerOrders] = useState([]);

  const getSellerOrders = async () => {
    const { data } = await fetchSellerOrders();
    setSellerOrders(data);
  };

  useEffect(() => {
    getSellerOrders();
  }, []);

  return (
    <>
      <NavBar />
      <div>
        { sellerOrders.map((sellerOrder) => (
          <SellerOrders
            key={ sellerOrder.id }
            sellerOrder={ sellerOrder }
          />
        )) }
      </div>
    </>
  );
}

export default SellerOrder;
