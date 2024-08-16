import { BankAccount } from './BankAccount';
import { Category } from './Category';
import { CreditCard } from './CreditCard';

export interface InstallmentPurchase {
  id: string;
  userId: string;
  bankAccountId: string;
  categoryId: string;
  creditCardId: string;
  name: string;
  totalValue: number;
  numberOfInstallments: number;
  startDate: string;
  type: 'EXPENSE';
  category: Category;
  bankAccount: BankAccount;
  creditCard: CreditCard;
  installments: {
    id: string;
    installmentPurchaseId: string;
    transactionId: string;
    value: number;
    dueDate: string;
    paid: boolean;
  }[];
}
