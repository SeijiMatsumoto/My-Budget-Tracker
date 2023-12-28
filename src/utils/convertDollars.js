export const convertDollarsToString = (amount) => {
  if (amount < 0) {
    return `-$${amount.toFixed(2).toString().slice(1)}`;
  } else {
    return `+$${amount.toFixed(2)}`;
  }
};
