export const convertDate = (dateString) => {
  const parts = dateString.split("-");
  const formattedDateString = `${parts[0]}/${parts[1]}/${parts[2]}`;

  const dateObject = new Date(formattedDateString);
  return dateObject;
};
