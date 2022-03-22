import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../../context/Context';
import NavBar from '../../components/Cards/NavBar';
import TableBody from '../../components/TableBody';
import Details from '../../components/Details';

const Checkout = () => {
  const { cartItems, totalPrice, getTotalPrice, setCartItems } = useContext(MyContext);
  const [seller, setSeller] = useState(1);
  const [address, setAddress] = useState({
    address: '',
    number: '',
  });

  useEffect(() => {
    getTotalPrice();
  }, [getTotalPrice]);

  const handleChange = ({ target: { name, value } }) => {
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = (id) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== id));
  };

  return (
    <>
      <NavBar />
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        { cartItems
          .filter((product) => product.quantity !== 0)
          .map((cartItem, index) => (
            <TableBody
              key={ cartItem.id }
              cartItem={ cartItem }
              index={ index }
              handleClick={ handleClick }
            />
          ))}
      </table>
      <div>
        Total:
        { ' ' }
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          { totalPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
        </span>
      </div>
      <div>
        <Details
          seller={ seller }
          address={ address }
          handleChange={ handleChange }
          setSeller={ setSeller }
        />
      </div>
    </>
  );
};

export default Checkout;
