export const calculateCartTotal = (cartItems) => {
  let total = 0;
  cartItems.forEach((e) => {
    total += e.price * e.quantity;
  });
  return total;
};

export const updateCartDataWithDate = (cartItems, orderId) => {
  const currentDate = new Date().toISOString();
  return cartItems.map((obj) => ({ ...obj, ordered_date: currentDate, order_id: orderId }));
};
