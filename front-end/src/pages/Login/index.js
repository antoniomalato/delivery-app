import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import * as validate from '../../utils/validate';
import { postLoginData } from '../../utils/axios';
import Input from '../../components/Input';
import Button from '../../components/Button';
import MyContext from '../../context/Context';
import redirect from '../../utils/redirect';
import {
  saveLocalStorage,
  clearLocalStorage,
  getLocalStorage,
} from '../../utils/localStorage';

function Login() {
  const history = useHistory();
  const { setUser, role, setRole } = useContext(MyContext);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [isVisibleErrorEmail, setIsVisibleErrorEmail] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveLogin = useCallback(
    () => {
      if (getLocalStorage('user')) {
        const user = getLocalStorage('user');
        setRole(user.role);
      }
    }, [setRole],
  );

  const handleClick = async () => {
    const response = await postLoginData(loginData);
    if (response.status === Number('200')) {
      clearLocalStorage();
      saveLocalStorage('user', response.data);
      setUser(response.data);
      if (response.data.role === 'seller') {
        history.push('/seller/orders');
      }
      if (response.data.role === 'customer') {
        history.push('/customer/products');
      }
    } else {
      setIsVisibleErrorEmail(true);
    }
  };

  useEffect(() => {
    saveLogin();
  }, [saveLogin]);

  useEffect(() => () => {
    setRole('');
  }, [setRole]);

  function checkRole(userRole) {
    if (userRole === 'customer') {
      history.push('/customer/products');
    } else if (userRole === 'seller') {
      history.push('/seller/orders');
    }
  }

  useEffect(() => {
    const userLocalStorage = getLocalStorage('user');
    if (userLocalStorage) {
      checkRole(userLocalStorage.role);
    }
  });

  return (
    <form className="form-login">
      <h1>Login</h1>
      <Input
        handleChange={ handleChange }
        dataTest="common_login__input-email"
        value={ loginData.email }
        id="email-input"
        placeholder="email"
        name="email"
        type="text"
      />
      {isVisibleErrorEmail && (
        <p
          data-testid="common_login__element-invalid-email"
        >
          Erro: Email não cadastrado
        </p>
      )}
      <Input
        handleChange={ handleChange }
        dataTest="common_login__input-password"
        value={ loginData.password }
        id="password-input"
        name="password"
        placeholder="password"
        type="password"
      />

      <div>
        <Button
          handleClick={ handleClick }
          dataTest="common_login__button-login"
          text="Login"
          disabled={
            !(
              validate.validateEmail(loginData.email)
              && validate.validatePassword(loginData.password))
          }
        />
        <Button
          dataTest="common_login__button-register"
          text="Register"
          handleClick={ () => history.push('/register') }
        />
      </div>
      { role && <Redirect to={ { pathname: redirect(role) } } />}
    </form>
  );
}

export default Login;
