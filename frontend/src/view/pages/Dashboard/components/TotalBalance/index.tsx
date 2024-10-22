import { cn } from '@/lib/utils';
import { useTotalBalanceController } from './useTotalBalanceController';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { EyeIcon } from '@/view/components/icons/EyeIcon';
import { Spinner } from '@/view/components/Spinner';

interface TotalBalanceProps {
  className?: string;
}

export const TotalBalance = ({ className }: TotalBalanceProps) => {
  const {
    currentBalance,
    areValuesVisible,
    toggleValuesVisibility,
    isFetchingBankAccounts,
  } = useTotalBalanceController();

  return (
    <div
      className={cn('bg-teal-900 rounded-2xl p-6 flex items-center', className)}
    >
      {!isFetchingBankAccounts && (
        <div>
          <span className="tracking-[-1px] text-white block">Saldo Total</span>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                `lg:text-2xl text-xl font-semibold text-white tracking-[-1px]`,
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
      )}

      {isFetchingBankAccounts && (
        <div className="flex w-full justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};
