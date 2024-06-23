import { cn } from '@/lib/utils';
import { useTotalBalanceController } from './useTotalBalanceController';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { EyeIcon } from '@/view/components/icons/EyeIcon';

interface TotalBalanceProps {
  className?: string;
}

export const TotalBalance = ({ className }: TotalBalanceProps) => {
  const { currentBalance, areValuesVisible, toggleValuesVisibility } =
    useTotalBalanceController();

  return (
    <div className={cn('bg-teal-900 rounded-2xl p-6', className)}>
      <span className="tracking-[-1px] text-white block">Saldo Total</span>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            `text-2xl font-semibold text-white tracking-[-1px]`,
            !areValuesVisible && 'blur-md'
          )}
        >
          {formatCurrency(currentBalance)}
        </span>
        <button
          className="h-8 w-8 flex items-center justify-center"
          onClick={toggleValuesVisibility}
        >
          <EyeIcon open={!areValuesVisible} />
        </button>
      </div>
    </div>
  );
};
