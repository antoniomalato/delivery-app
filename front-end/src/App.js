import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Products from './pages/Customer';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';
import Orders from './pages/CustomerOrders';
import OrderSellerDetails from './pages/OrderSellerDetails';
import SellerOrder from './pages/SellerOrders';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders" component={ Orders } />
      <Route exact path="/customer/orders/:id" component={ OrderDetails } />
      <Route exact path="/seller/orders/:id" component={ OrderSellerDetails } />
      <Route exact path="/seller/orders" component={ SellerOrder } />
    </Switch>
  );
}

export default App;
