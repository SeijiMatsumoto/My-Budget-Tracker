export const isValidDollar = (dollarsStr) => {
  if (!dollarsStr) return false;
  return !!dollarsStr.match(
    /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|0)?(\.[0-9]{1,2})?$/
  );
};
