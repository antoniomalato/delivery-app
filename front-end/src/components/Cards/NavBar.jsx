import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { clearLocalStorage, getLocalStorage } from '../../utils/localStorage';

function NavBar() {
  // const [logout, setLogout] = useState(false);
  const [newUser, setNewUser] = useState({});
  const history = useHistory();

  const getUser = () => {
    const savedUser = getLocalStorage('user');
    setNewUser(savedUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () => {
    clearLocalStorage();
    history.push('/');
  };

  return (
    <nav className="nav-bar">
      { newUser.role === 'customer' && (
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ () => history.push('/customer/products') }
        >
          Produtos
        </button>
      )}
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-orders"
        onClick={ () => history.push(`/${newUser.role}/orders`) }
      >
        Pedidos
      </button>
      <h3 data-testid="customer_products__element-navbar-user-full-name">
        { newUser.name }
      </h3>
      <button
        type="button"
        onClick={ handleLogout }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </nav>
  );
}

export default NavBar;
