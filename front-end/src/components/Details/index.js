import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Button from '../Button';
import Input from '../Input/index';
import MyContext from '../../context/Context';
import { postOrderProducts } from '../../utils/axios';
import { sellers, five } from '../../constants/sellers';
import { getLocalStorage } from '../../utils/localStorage';

const Details = ({ seller, address, handleChange, setSeller }) => {
  const history = useHistory();
  const { user, cartItems, totalPrice } = useContext(MyContext);

  const createOrderObject = () => ({
    user_id: user.id,
    seller_id: seller,
    total_price: Number(totalPrice.toFixed(2)),
    delivery_address: address.address,
    delivery_number: address.number,
    products: cartItems
      .filter((prod) => prod.quantity !== 0)
      .map((prod) => ({ product_id: prod.id, quantity: prod.quantity })),
  });

  const handleSeller = ({ target: { value } }) => {
    setSeller(Number(value));
  };

  const handleClick = async () => {
    const response = await postOrderProducts(
      createOrderObject(), getLocalStorage('user').token,
    );
    const { data: { id } } = response;
    console.log(response);
    history.push(`/customer/orders/${id}`);
  };

  return (
    <>
      <label htmlFor="seller-select">
        Vendedor:
        <select
          id="seller-select"
          value={ seller }
          onChange={ handleSeller }
          data-testid="customer_checkout__select-seller"
        >
          { sellers.map((sell) => (
            <option
              key={ sell.id }
              value={ sell.id }
            >
              { sell.name }

            </option>
          ))}
        </select>
      </label>
      <Input
        text="Endereço "
        placeholder="Rua Tão Longe, Cidade Far Away"
        dataTest="customer_checkout__input-address"
        size="50"
        name="address"
        value={ address.address }
        id="address-input"
        handleChange={ handleChange }
      />
      <Input
        text="Número "
        placeholder="123"
        dataTest="customer_checkout__input-addressNumber"
        name="number"
        id="number-input"
        handleChange={ handleChange }
        value={ address.number }
      />
      <Button
        text="Finalizar pedido"
        handleClick={ handleClick }
        dataTest="customer_checkout__button-submit-order"
        disabled={ !(address.address.length > five && address.number.length > 0) }
      />
    </>
  );
};

Details.propTypes = {
  address: PropTypes.shape({
    address: PropTypes.string,
    number: PropTypes.number,
  }),
  handleChange: PropTypes.func,
}.isRequired;

export default Details;
