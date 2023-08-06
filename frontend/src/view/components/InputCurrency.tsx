import { NumericFormat } from "react-number-format";

export const InputCurrency = () => {
  return (
    <NumericFormat
      className="w-full text-[32px] text-gray-800 font-bold tracking-[-1px]  outline-none"
      thousandSeparator="."
      decimalSeparator=","
      defaultValue="1000"
    />
  );
};
