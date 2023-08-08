export const currencyStringToNumber = (value: string) => {
  console.log(typeof value);
  if (typeof value === "number") {
    return;
  }
  const sanitizedString = value.replace(/\./g, "").replace(",", ".");
  return Number(sanitizedString);
};
