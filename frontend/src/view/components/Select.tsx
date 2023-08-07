import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";
import { useState } from "react";
import { ErrorContainer } from "./ErrorContainer";

interface SelectProps {
  className?: string;
  error?: string;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange?(value: string): void;
  value: string;
}

export const Select = ({
  className,
  error,
  placeholder,
  options,
  onChange,
  value,
}: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleSelect = (value: string) => {
    onChange?.(value);
    setSelectedValue(value);
  };

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            "absolute z-[10] top-1/2 -translate-y-1/2 left-3 pointer-events-none text-gray-700",
            selectedValue && "text-xs left-[13px] top-2 transition-all translate-y-0"
          )}
        >
          {placeholder}
        </label>
        <RadixSelect.Root value={value} onValueChange={handleSelect}>
          <RadixSelect.Trigger
            className={cn(
              "bg-white rounded-lg w-full border border-gray-500 px-3 h-[52px]  text-gray-800    focus:border-gray-800 transition-all outline-none text-left relative pt-4",
              error && "!border-red-900",
              className
            )}
          >
            <RadixSelect.Value />

            <RadixSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="w-6 h-6 text-gray-800 " />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>

          <RadixSelect.Portal>
            <RadixSelect.Content className="z-[99] overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
              <RadixSelect.ScrollUpButton className="flex items-center justify-center h-[25px] text-gray-800 cursor-default">
                <ChevronUpIcon />
              </RadixSelect.ScrollUpButton>

              <RadixSelect.Viewport className="p-2">
                {options.map((option) => (
                  <RadixSelect.Item
                    key={option.value}
                    value={option.value}
                    className="p-2 text-sm text-gray-800 data-[state=checked]:font-bold outline-none data-[highlighted]:bg-gray-50 rounded-lg transition-colors "
                  >
                    <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>

              <RadixSelect.ScrollDownButton className="flex items-center justify-center h-[25px] text-gray-800 cursor-default">
                <ChevronDownIcon />
              </RadixSelect.ScrollDownButton>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>
      </div>

      {error && <ErrorContainer error={error} />}
    </div>
  );
};
