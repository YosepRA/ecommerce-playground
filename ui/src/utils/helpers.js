export const fixedTwoDecimals = (value) => parseFloat(value.toFixed(2));

export const calculatePrice = (cart) => {
  const subtotal = fixedTwoDecimals(
    cart.reduce((total, item) => {
      const itemTotalPrice = item.price * item.amount;
      const newTotal = total + itemTotalPrice;

      return newTotal;
    }, 0),
  );
  const tax = fixedTwoDecimals((10 / 100) * subtotal);
  const total = fixedTwoDecimals(subtotal + tax);

  return { subtotal, tax, total };
};
