export const currencyStringToNumber = (value: string) => {
  if (typeof value === 'number') {
    return;
  }
  const sanitizedString = value.replace(/\./g, '').replace(',', '.');
  return Number(sanitizedString);
};
