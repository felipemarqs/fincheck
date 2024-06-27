//import { Tabs, TabsList, TabsTrigger } from '@/view/components/Tabs';
import { cn } from '../../../app/utils/cn';
import { Logo } from '../../components/Logo';

import { UserMenu } from '../../components/UserMenu';
import { Accounts } from './components/Accounts';
import {
  DashboardContext,
  DashboardProvider,
} from './components/DashboardContext';
import { Fab } from './components/Fab';
import { Transactions } from './components/Transactions';
import { EditAccountModal } from './modals/EditAccountModal';
import { NewAccountModal } from './modals/NewAccountModal';
import { NewContactModal } from './modals/NewContactModal';
import { NewCreditCardModal } from './modals/NewCreditCardModal';
import { NewTransactionModal } from './modals/NewTransactionModal';

const SystemVersion = () => {
  return (
    <div
      className={cn(
        'fixed text-sm text-gray-400 p-1 lg:p-4 z-50 rounded-lg bottom-2 left-5'
      )}
    >
      <span>{'0.1.2'}</span>
    </div>
  );
};

export const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className="h-full w-full p-4 md:px-8 md:pb-8 md:pt-6 flex flex-col gap-4">
            {/*<div className="flex justify-end ">
              <Tabs defaultValue="transactions">
                <TabsList>
                  <TabsTrigger value="transactions">Transações</TabsTrigger>
                  <TabsTrigger value="toPay">Conta a pagar</TabsTrigger>
                  <TabsTrigger value="toReceive">Contas a receber</TabsTrigger>
                </TabsList>
              </Tabs>
            </div> */}
            <main className="flex-1 flex-col md:flex-row flex gap-4 max-h-full">
              <div className="  w-full md:w-1/2">
                <Accounts />
              </div>

              <div className="w-full md:w-1/2 ">
                <Transactions />
              </div>
            </main>

            <Fab />
            <NewAccountModal />
            <NewTransactionModal />
            <NewCreditCardModal />
            <NewContactModal />
            {accountBeingEdited && <EditAccountModal />}
            <SystemVersion />
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
};
