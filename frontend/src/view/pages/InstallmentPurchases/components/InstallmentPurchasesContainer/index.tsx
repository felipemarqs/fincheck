import InstallmentPurchaseItem from './InstallmentPurchaseItem';
import { useInstallmentPurchasesContainer } from './useInstallmentPurchasesContainer';

export const InstallmentPurchasesContainer = () => {
  const { installmentPurchases, openEditInstallmentPurchaseModal } =
    useInstallmentPurchasesContainer();
  return (
    <div className="w-full h-full overflow-y-auto px-6 py-4 grid gap-6">
      {installmentPurchases.map((installmentPurchases) => (
        <InstallmentPurchaseItem
          purchase={installmentPurchases}
          openEditModal={openEditInstallmentPurchaseModal}
        />
      ))}
    </div>
  );
};
