import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../../context/Context';
import {
  decreaseQuantityInCart,
  increaseQuantityInCart,
} from '../../helpers/functions';

function CardsProducts({ product }) {
  const { name, id, url_image: urlImage, price } = product;
  const [newQuantity, setQuantity] = useState(0);
  const { setCartItems } = useContext(MyContext);

  const handleClick = ({ target: { value } }) => {
    if (value >= 0) {
      setQuantity(Number(value));
      setCartItems((prevState) => increaseQuantityInCart(
        prevState, id, Number(value),
      ));
    }
  };

  return (
    <div className="product-card">
      <h1
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }

      </h1>
      <h2
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { price.replace('.', ',') }

      </h2>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
        width="100px"
      />
      <div className="product-quantity">
        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          onClick={ () => {
            if (newQuantity > 0) {
              setQuantity((prevState) => prevState - 1);
              setCartItems((prevState) => decreaseQuantityInCart(prevState, id));
            }
          } }
        >
          -
        </button>
        <input
          name="manual"
          type="text"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ newQuantity }
          onChange={ handleClick }
        />
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ () => {
            setQuantity((prevState) => prevState + 1);
            setCartItems((prevState) => increaseQuantityInCart(prevState, id));
          } }
        >
          +
        </button>
      </div>
    </div>
  );
}

CardsProducts.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
    id: PropTypes.number,
  }),
}.isRequired;

export default CardsProducts;
