/* eslint-disable import/prefer-default-export */
export const getAllTransactions = (ordersData) => {
  let transactions = [];
  Object.values(ordersData).forEach((arr) => {
    transactions = [...transactions, ...arr];
  });

  return transactions.map((obj) => {
    const newObj = { ...obj };
    newObj.cost = Number(obj.price) * Number(obj.quantity);
    newObj.ordered_date = `${new Date(obj.ordered_date).toLocaleDateString()} ${new Date(obj.ordered_date).toLocaleTimeString()}`;
    return newObj;
  });
};