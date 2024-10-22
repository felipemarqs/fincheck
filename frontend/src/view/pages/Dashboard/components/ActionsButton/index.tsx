import { cn } from '@/lib/utils';
import { Expense } from '@/view/components/icons/categories/expense/Expense';
import { useDashboard } from '../DashboardContext/useDashboard';
import { Income } from '@/view/components/icons/categories/income/Income';
import { BankAccountIcon } from '@/view/components/icons/BankAccountIcon';

interface ActionButtonsProps {
  className?: string;
}

export const ActionButtons = ({ className }: ActionButtonsProps) => {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard();
  return (
    <div
      className={cn(
        'flex justify-between items-center flex-col gap-2 ',
        className
      )}
    >
      <div
        className="p-1 cursor-pointer gap-2 flex items-center bg-white w-full border border-gray-400 rounded-2xl px-2"
        onClick={() => openNewTransactionModal('EXPENSE')}
      >
        <Expense className="h-9 w-9" />
        Nova Despesa
      </div>

      <div
        className="p-1 cursor-pointer gap-2 flex items-center bg-white w-full border border-gray-400 rounded-2xl px-2"
        onClick={() => openNewTransactionModal('INCOME')}
      >
        <Income className="h-9 w-9" />
        Nova Receita
      </div>

      <div
        className=" p-1 cursor-pointer gap-2 flex items-center bg-white w-full border border-gray-400 rounded-2xl px-2"
        onClick={openNewAccountModal}
      >
        <BankAccountIcon className="h-9 w-9" />
        Nova Conta
      </div>
    </div>
  );
};

export default ActionButtons;
