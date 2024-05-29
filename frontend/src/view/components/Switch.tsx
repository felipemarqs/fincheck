import * as RadixSwitch from '@radix-ui/react-switch';
import { cn } from '../../app/utils/cn';

interface SwitchProps {
  id: string;
  className?: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  name: string;
  value?: string;
}

export const Switch = ({
  id,
  checked,
  name,
  onCheckedChange,
  value,
  disabled,
  className,
}: SwitchProps) => {
  return (
    <RadixSwitch.Root
      className={cn(
        'w-[42px]  h-[25px] bg-blackA6 rounded-full shadow-[0_0_0_0.5px] shadow-blackA4 focus:shadow-[0_0_0_1px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default',
        className
      )}
      checked={checked}
      id={id}
      onCheckedChange={onCheckedChange}
      value={value}
      name={name}
      disabled={disabled}
    >
      <RadixSwitch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
    </RadixSwitch.Root>
  );
};
