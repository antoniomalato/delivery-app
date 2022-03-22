import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import * as validate from '../../utils/validate';
import { postRegisterData } from '../../utils/axios';
import {
  saveLocalStorage,
  clearLocalStorage,
} from '../../utils/localStorage';
import MyContext from '../../context/Context';

const Register = () => {
  const history = useHistory();
  const { setUser } = useContext(MyContext);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const postAxios = async () => {
    const response = await postRegisterData(registerData);
    if (response.status === Number('201')) {
      clearLocalStorage();
      saveLocalStorage('user', response.data);
      history.push('/customer/products');
      setUser(response.data);
    } else {
      setIsErrorVisible(true);
    }
  };

  const handleClick = () => {
    postAxios();
  };

  return (
    <form>
      <Input
        dataTest="common_register__input-name"
        name="name"
        value={ registerData.name }
        id="register-name-input"
        text="Name:"
        type="text"
        handleChange={ handleChange }
      />
      <Input
        dataTest="common_register__input-email"
        name="email"
        type="text"
        value={ registerData.email }
        id="register-email-input"
        text="Email:"
        handleChange={ handleChange }
      />
      <Input
        dataTest="common_register__input-password"
        type="password"
        name="password"
        value={ registerData.password }
        id="register-password-input"
        text="Password:"
        handleChange={ handleChange }
      />
      { isErrorVisible && (
        <p
          data-testid="common_register__element-invalid_register"
        >
          Email ou senha inválido
        </p>)}
      <Button
        handleClick={ handleClick }
        text="Register"
        dataTest="common_register__button-register"
        disabled={
          !(
            validate.validateName(registerData.name)
            && validate.validateEmail(registerData.email)
            && validate.validatePassword(registerData.password))
        }
      />
    </form>
  );
};

export default Register;
