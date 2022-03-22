const redirect = (role) => {
  if (role === 'customer') return '/customer/products';
  if (role === 'seller') return '/seller/orders';
};

export default redirect;
