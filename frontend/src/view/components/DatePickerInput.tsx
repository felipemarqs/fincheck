import { cn } from '../../app/utils/cn';
import { useState } from 'react';
import { formatDate } from '../../app/utils/formatDate';
import { Popover } from './Popover';
import { DatePicker } from './DatePicker';
import { ErrorContainer } from './ErrorContainer';
import { Button } from './Button';

interface DatePickerInputProps {
  error?: string;
  className?: string;
  placeholder?: string;
  value?: Date;
  onChange?(date: Date): void;
}
export const DatePickerInput = ({
  error,
  className,
  value,
  placeholder,
  onChange,
}: DatePickerInputProps) => {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  const handleChangeDate = (date: Date) => {
    setSelectedDate(date);
    onChange?.(date);
  };

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              'bg-white rounded-lg w-full pt-4 border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative',
              error && '!border-red-900',
              className
            )}
          >
            <span className="absolute text-gray-700 text-xs left-[13px] top-2 pointer-events-none">
              {!placeholder && <>Data</>}
              {placeholder && placeholder}
            </span>

            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content className="">
          <DatePicker value={selectedDate} onChange={handleChangeDate} />
          <div className="w-full flex justify-end">
            <Popover.Close>
              <Button className="h-8 rounded-md px-3 text-xs">Ok</Button>
            </Popover.Close>
          </div>
        </Popover.Content>
      </Popover.Root>
      {error && <ErrorContainer error={error} />}
    </div>
  );
};
