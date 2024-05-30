import { NumericFormat } from 'react-number-format';
import { ErrorContainer } from './ErrorContainer';
import { cn } from '../../app/utils/cn';

interface InputCurrencyProps {
  error?: string;
  onChange?(value: string): void;
  value: string | number;
}
export const InputCurrency = ({
  error,
  onChange,
  value,
}: InputCurrencyProps) => {
  return (
    <div>
      <NumericFormat
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className={cn(
          'w-full text-[32px] text-gray-800 font-bold tracking-[-1px]  outline-none',
          error && 'text-red-500'
        )}
        decimalSeparator=","
        decimalScale={2}
      />

      {error && <ErrorContainer error={error} />}
    </div>
  );
};
