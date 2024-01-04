export const convertDollarsToString = (amount) => {
  if (!amount) return "$ 0";
  if (amount < 0) {
    return `$ ${amount.toFixed(2).toString().slice(1)}`;
  } else {
    return `$ ${amount.toFixed(2)}`;
  }
};

export const positiveOrNegative = (amount) => {
  if (amount > 0) {
    return amount.toString();
  } else {
    return (amount * -1).toString();
  }
};
