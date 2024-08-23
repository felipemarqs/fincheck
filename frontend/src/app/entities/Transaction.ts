export interface Transaction {
  id: string;
  userId: string;
  bankAccountId: string;
  categoryId: string;
  creditCardId?: string;
  installmentPurchaseId?: string;
  name: string;
  value: number;
  date: string;
  type: 'EXPENSE' | 'INCOME';
  isPaid: boolean;
  createdAt: string;
  category: {
    id: string;
    name: string;
    icon: string;
  };
  installment?: { id: string };
}
