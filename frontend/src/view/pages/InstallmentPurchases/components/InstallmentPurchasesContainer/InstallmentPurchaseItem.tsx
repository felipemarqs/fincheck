import { InstallmentPurchase } from '@/app/entities/InstallmentPurchase';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/view/components/Accordion';
import { Badge } from '@/view/components/Badge';
import { ChevronDownIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

interface InstallmentPurchaseItemProps {
  purchase: InstallmentPurchase;
  openEditModal(purchase: InstallmentPurchase): void;
}

export default function InstallmentPurchaseItem({
  purchase: purchaseProp,
  openEditModal,
}: InstallmentPurchaseItemProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
  });
  const purchases = [
    {
      id: 1,
      name: 'Novo Smartphone',
      category: 'Eletrônicos',
      totalAmount: 2500.0,
      installments: 12,
      startDate: '2023-05-01',
      paymentAccount: 'Cartão de Crédito',
      status: 'Pendente',
      installmentDetails: [
        { number: 1, amount: 208.33, dueDate: '2023-05-10', paid: false },
        { number: 2, amount: 208.33, dueDate: '2023-06-10', paid: false },
        { number: 3, amount: 208.33, dueDate: '2023-07-10', paid: false },
        { number: 4, amount: 208.33, dueDate: '2023-08-10', paid: false },
        { number: 5, amount: 208.33, dueDate: '2023-09-10', paid: false },
        { number: 6, amount: 208.33, dueDate: '2023-10-10', paid: false },
        { number: 7, amount: 208.33, dueDate: '2023-11-10', paid: false },
        { number: 8, amount: 208.33, dueDate: '2023-12-10', paid: false },
        { number: 9, amount: 208.33, dueDate: '2024-01-10', paid: false },
        { number: 10, amount: 208.33, dueDate: '2024-02-10', paid: false },
        { number: 11, amount: 208.33, dueDate: '2024-03-10', paid: false },
        { number: 12, amount: 208.33, dueDate: '2024-04-10', paid: false },
      ],
    },
    {
      id: 2,
      name: 'Sofá de Canto',
      category: 'Móveis',
      totalAmount: 3000.0,
      installments: 6,
      startDate: '2023-03-15',
      paymentAccount: 'Conta Corrente',
      status: 'Pago',
      installmentDetails: [
        { number: 1, amount: 500.0, dueDate: '2023-03-20', paid: true },
        { number: 2, amount: 500.0, dueDate: '2023-04-20', paid: true },
        { number: 3, amount: 500.0, dueDate: '2023-05-20', paid: true },
        { number: 4, amount: 500.0, dueDate: '2023-06-20', paid: true },
        { number: 5, amount: 500.0, dueDate: '2023-07-20', paid: true },
        { number: 6, amount: 500.0, dueDate: '2023-08-20', paid: true },
      ],
    },
    {
      id: 3,
      name: 'Viagem para Cancún',
      category: 'Viagens',
      totalAmount: 8000.0,
      installments: 10,
      startDate: '2023-07-01',
      paymentAccount: 'Cartão de Crédito',
      status: 'Pendente',
      installmentDetails: [
        { number: 1, amount: 800.0, dueDate: '2023-07-15', paid: false },
        { number: 2, amount: 800.0, dueDate: '2023-08-15', paid: false },
        { number: 3, amount: 800.0, dueDate: '2023-09-15', paid: false },
        { number: 4, amount: 800.0, dueDate: '2023-10-15', paid: false },
        { number: 5, amount: 800.0, dueDate: '2023-11-15', paid: false },
        { number: 6, amount: 800.0, dueDate: '2023-12-15', paid: false },
        { number: 7, amount: 800.0, dueDate: '2024-01-15', paid: false },
        { number: 8, amount: 800.0, dueDate: '2024-02-15', paid: false },
        { number: 9, amount: 800.0, dueDate: '2024-03-15', paid: false },
        { number: 10, amount: 800.0, dueDate: '2024-04-15', paid: false },
      ],
    },
  ];
  const filteredPurchases = useMemo(() => {
    return purchases.filter((purchase) => {
      if (
        filters.category !== 'all' &&
        purchase.category !== filters.category
      ) {
        return false;
      }
      if (filters.status !== 'all' && purchase.status !== filters.status) {
        return false;
      }
      return purchase.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, filters]);
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
