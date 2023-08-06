export const formatDate = (date: Date) => {
  return Intl.DateTimeFormat("pt-br").format(date);
};
