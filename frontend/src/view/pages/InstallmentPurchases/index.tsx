import { Button } from '@/view/components/Button';

import {
  InstallmentPurchasesContext,
  InstallmentPurchasesProvider,
} from './components/InstallmentPurchasesContext';
import { NewInstallmentPurchaseModal } from './modals/NewInstallmentPurchaseModal';
import { InstallmentPurchasesContainer } from './components/InstallmentPurchasesContainer';
import { EditInstallmentPurchaseModal } from './modals/EditInstallmentPurchaseModal';

const InstallmentPurchases = () => {
  return (
    <InstallmentPurchasesProvider>
      <InstallmentPurchasesContext.Consumer>
        {({
          openNewInstallmentPurchaseModal,
          installmentPurchaseBeingEdited,
        }) => (
          <>
            <div className=" w-full px-6 py-4">
              <Button onClick={openNewInstallmentPurchaseModal}>
                Nova Compra
              </Button>
            </div>

            <InstallmentPurchasesContainer />
            {installmentPurchaseBeingEdited && <EditInstallmentPurchaseModal />}
            <NewInstallmentPurchaseModal />
          </>
        )}
      </InstallmentPurchasesContext.Consumer>
    </InstallmentPurchasesProvider>
  );
};

export default InstallmentPurchases;
