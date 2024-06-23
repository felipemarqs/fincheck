import { PlusIcon } from '@radix-ui/react-icons';
import { DropdownMenu } from '../../../../components/DropdownMenu';
import { Expense } from '../../../../components/icons/categories/expense/Expense';
import { Income } from '../../../../components/icons/categories/income/Income';
import { BankAccountIcon } from '../../../../components/icons/BankAccountIcon';
import { useDashboard } from '../DashboardContext/useDashboard';
import { CircleUserRound, CreditCard } from 'lucide-react';

export const Fab = () => {
  const {
    openNewAccountModal,
    openNewTransactionModal,
    openNewCreditCardModal,
    openNewContactModal,
  } = useDashboard();
  return (
    <div className="fixed right-4 bottom-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className=" text-white bg-teal-900 w-12 h-12 flex justify-center items-center rounded-full ">
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item
            className="gap-2"
            onSelect={() => openNewTransactionModal('EXPENSE')}
          >
            <Expense />
            Nova Despesa
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="gap-2"
            onSelect={() => openNewTransactionModal('INCOME')}
          >
            <Income />
            Nova Receita
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2" onSelect={openNewAccountModal}>
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="gap-2"
            onSelect={openNewCreditCardModal}
          >
            <div className="w-11 h-11 bg-nubank-100 rounded-full flex items-center justify-center border-2 border-white">
              <CreditCard className="text-nubank-600" />
            </div>
            Novo Cartão
          </DropdownMenu.Item>

          <DropdownMenu.Item className="gap-2" onSelect={openNewContactModal}>
            <div className="w-11 h-11 bg-orange-100 rounded-full flex items-center justify-center border-2 border-white">
              <CircleUserRound className="text-orange-600" />
            </div>
            Novo Contato
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};
