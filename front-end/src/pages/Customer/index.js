import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CardsProducts from '../../components/Cards/CardsProducts';
import NavBar from '../../components/Cards/NavBar';
import MyContext from '../../context/Context';

function Products() {
  const { products, totalPrice, getTotalPrice } = useContext(MyContext);
  const history = useHistory();
  useEffect(() => {
    getTotalPrice();
  }, [getTotalPrice]);
  return (
    <>
      <NavBar />
      <div className="products-cards">
        { products.map((product) => (
          <CardsProducts
            key={ product.id }
            product={ product }
          />
        )) }
        <button
          type="button"
          data-testid="customer_products__button-cart"
          onClick={ () => history.push('/customer/checkout') }
          disabled={ totalPrice <= 0 }
        >
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            { totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
          </span>
        </button>
      </div>

    </>
  );
}

export default Products;
