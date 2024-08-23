import { Button } from '@/view/components/Button';

import {
  InstallmentPurchasesContext,
  InstallmentPurchasesProvider,
} from './components/InstallmentPurchasesContext';
import { NewInstallmentPurchaseModal } from './modals/NewInstallmentPurchaseModal';
import { InstallmentPurchasesContainer } from './components/InstallmentPurchasesContainer';
import { EditInstallmentPurchaseModal } from './modals/EditInstallmentPurchaseModal';

export const InstallmentPurchases = () => {
  return (
    <InstallmentPurchasesProvider>
      <InstallmentPurchasesContext.Consumer>
        {({
          openNewInstallmentPurchaseModal,
          installmentPurchaseBeingEdited,
        }) => (
          <>
            {/*   <div className=" w-full h-full">
              <h1>Compras Parceladas:</h1>

              <Button onClick={openNewInstallmentPurchaseModal}>
                Novo Compra
              </Button>
            </div>
            */}
            <InstallmentPurchasesContainer />
            {installmentPurchaseBeingEdited && <EditInstallmentPurchaseModal />}
            <NewInstallmentPurchaseModal />
          </>
        )}
      </InstallmentPurchasesContext.Consumer>
    </InstallmentPurchasesProvider>
  );
};
