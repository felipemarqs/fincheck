import { Button } from '@/view/components/Button';

import {
  InstallmentPurchasesContext,
  InstallmentPurchasesProvider,
} from './components/InstallmentPurchasesContext';
import { NewInstallmentPurchaseModal } from './modals/NewInstallmentPurchaseModal';
import { InstallmentPurchasesContainer } from './components/InstallmentPurchasesContainer';

export const InstallmentPurchases = () => {
  return (
    <InstallmentPurchasesProvider>
      <InstallmentPurchasesContext.Consumer>
        {({ openNewInstallmentPurchaseModal }) => (
          <>
            {/*   <div className=" w-full h-full">
              <h1>Compras Parceladas:</h1>

              <Button onClick={openNewInstallmentPurchaseModal}>
                Novo Compra
              </Button>
            </div>
            */}
            <InstallmentPurchasesContainer />
            {/*   {contactBeingEdited && <EditContactModal />} */}
            <NewInstallmentPurchaseModal />
          </>
        )}
      </InstallmentPurchasesContext.Consumer>
    </InstallmentPurchasesProvider>
  );
};
