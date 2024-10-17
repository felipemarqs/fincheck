import { InstallmentPurchase } from '@/app/entities/InstallmentPurchase';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/view/components/Accordion';
import { Badge } from '@/view/components/Badge';

interface InstallmentPurchaseItemProps {
  purchase: InstallmentPurchase;
  openEditModal(purchase: InstallmentPurchase): void;
}

export default function InstallmentPurchaseItem({
  purchase: purchaseProp,
  openEditModal,
}: InstallmentPurchaseItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{purchaseProp.name}</h2>
          <Badge
            variant={
              purchaseProp.installments.every(({ paid }) => paid === true)
                ? 'default'
                : 'destructive'
            }
          >
            {purchaseProp.installments.every(({ paid }) => paid === true)
              ? 'Pago'
              : 'Pendente'}
          </Badge>
        </div>
        <p className="text-gray-500 mt-2">
          {purchaseProp.category.name} | {purchaseProp.numberOfInstallments}{' '}
          parcelas
        </p>
      </div>
      <div
        className="px-6 py-4 grid grid-cols-2 gap-4"
        onClick={() => openEditModal(purchaseProp)}
      >
        <div>
          <p className="text-gray-500">Valor total</p>
          <p className="text-primary font-bold">
            R$ {purchaseProp.totalValue.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Início</p>
          <p className="text-primary font-bold">
            {new Date(purchaseProp.startDate).toLocaleDateString()}
          </p>
        </div>
        {purchaseProp.creditCardId && (
          <>
            <div>
              <p className="text-gray-500">Cartão</p>
              <p className="text-primary font-bold">
                {purchaseProp.creditCard.name}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Conta</p>
              <p className="text-primary font-bold">
                {purchaseProp.bankAccount.name}
              </p>
            </div>
          </>
        )}

        {!purchaseProp.creditCardId && (
          <div>
            <p className="text-gray-500">Conta</p>
            <p className="text-primary font-bold">
              {purchaseProp.bankAccount.name}
            </p>
          </div>
        )}
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="installments">
          <AccordionTrigger className="px-6 py-4 border-t flex items-center justify-between">
            <span>Ver detalhes das parcelas</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 py-4 border-t">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th>Parcela</th>
                    <th>Valor</th>
                    <th>Vencimento</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseProp.installments.map((installment, index) => (
                    <tr
                      key={installment.id}
                      className={`${
                        installment.paid ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      <td>{index + 1}</td>
                      <td>R$ {installment.value.toFixed(2)}</td>
                      <td>
                        {new Date(installment.dueDate).toLocaleDateString()}
                      </td>
                      <td>{installment.paid ? 'Pago' : 'Pendente'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
