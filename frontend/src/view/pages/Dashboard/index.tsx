//import { Tabs, TabsList, TabsTrigger } from '@/view/components/Tabs';
import { cn } from '../../../app/utils/cn';
import ActionButtons from './components/ActionsButton';
import { BarChart } from './components/BarChart';
import {
  DashboardContext,
  DashboardProvider,
} from './components/DashboardContext';
import { Fab } from './components/Fab';
import { MonthlySummary } from './components/MonthlySummary';
import { PieChart } from './components/PieChart';
import { TotalBalance } from './components/TotalBalance';
import { Transactions } from './components/Transactions';
import { EditAccountModal } from './modals/EditAccountModal';
import { NewAccountModal } from './modals/NewAccountModal';
import { NewContactModal } from './modals/NewContactModal';
import { NewCreditCardModal } from './modals/NewCreditCardModal';
import { NewInstallmentPurchaseModal } from './modals/NewInstallmentPurchaseModal';
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

const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className="lg:h-[95%]  w-full flex flex-col gap-4 bg-gray-50">
            {/*<div className="flex justify-end ">
              <Tabs defaultValue="transactions">
                <TabsList>
                  <TabsTrigger value="transactions">Transações</TabsTrigger>
                  <TabsTrigger value="toPay">Conta a pagar</TabsTrigger>
                  <TabsTrigger value="toReceive">Contas a receber</TabsTrigger>
                </TabsList>
              </Tabs>
            </div> */}
            <main className="grid gap-4 p-2 lg:p-8 md:gap-8 grid-cols-12 auto-rows-[150px] -lg:grid-rows-12- h-full w-full md:mb-5 overflow-y-auto">
              <TotalBalance className="lg:col-span-5 row-span-1 lg:row-span-1 col-span-12" />
              <MonthlySummary className="lg:col-span-4 row-span-1 lg:row-span-1 col-span-12" />
              <ActionButtons className="hidden lg:flex lg:col-span-3 row-span-1 col-span-12" />
              <Transactions
                isDashboard
                className="lg:col-span-8 row-span-5 lg:row-span-4 col-span-12 "
              />
              {/*  <Accounts className="lg:col-span-4 row-span-3 lg:row-span-4 col-span-12 order-2 lg:order-none" /> */}
              <BarChart className="lg:col-span-4 row-span-2 lg:row-span-2 col-span-12" />

              <PieChart className="lg:col-span-4 row-span-2 lg:row-span-2 col-span-12" />
            </main>

            <Fab />
            <NewAccountModal />
            <NewTransactionModal />
            <NewCreditCardModal />
            <NewContactModal />
            <NewInstallmentPurchaseModal />
            {accountBeingEdited && <EditAccountModal />}
            <SystemVersion />
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
};

export default Dashboard;
