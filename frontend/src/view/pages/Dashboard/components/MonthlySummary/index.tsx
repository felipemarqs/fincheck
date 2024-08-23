import { cn } from '@/lib/utils';
import { useMonthlySummaryController } from './useMonthlySummaryController';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { Spinner } from '@/view/components/Spinner';

interface TotalBalanceProps {
  className?: string;
}

export const MonthlySummary = ({ className }: TotalBalanceProps) => {
  const {
    areValuesVisible,
    totalOutcome,
    totalIncome,
    isFetchingTransactions,
  } = useMonthlySummaryController();

  return (
    <div
      className={cn(
        'bg-gray-200 gap-2 rounded-2xl  p-6 flex items-center justify-between lg:flex-row lg:justify-between',
        className
      )}
    >
      {!isFetchingTransactions && (
        <>
          <div>
            <span className="tracking-[-1px] text-gray-700 block text-sm">
              Receita Mensal
            </span>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  `lg:text-2xl text-xl font-semibold text-green-800 tracking-[-1px]`,
                  !areValuesVisible && 'blur-md'
                )}
              >
                {formatCurrency(totalIncome)}
              </span>
            </div>
          </div>

          <div>
            <span className="tracking-[-1px] text-gray-700 block text-sm">
              Despesa Mensal
            </span>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  `lg:text-2xl text-xl font-semibold text-red-800 tracking-[-1px]`,
                  !areValuesVisible && 'blur-md'
                )}
              >
                {formatCurrency(totalOutcome)}
              </span>
            </div>
          </div>
        </>
      )}
      {isFetchingTransactions && (
        <div className="flex justify-center w-full">
          <Spinner />
        </div>
      )}
    </div>
  );
};
