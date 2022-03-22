// export const verifyIdItem = (id, cartItems) => cartItems
//   .some((product) => product.id === id);

export const increaseQuantityInCart = (prevState, id, value) => prevState
  .map((prod) => {
    if (prod.id === id) {
      return ({ ...prod, quantity: value || prod.quantity + 1 });
    } return prod;
  });
export const decreaseQuantityInCart = (prevState, id) => prevState
  .map((prod) => {
    if (prod.id === id) {
      return ({ ...prod, quantity: prod.quantity - 1 });
    } return prod;
  });
