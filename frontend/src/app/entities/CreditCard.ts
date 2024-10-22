export interface CreditCard {
  id: string;
  userId: string;
  bankAccountId: string;
  name: string;
  limit: number;
  availableLimit: number;
  color: string;
  closingDay: number;
  dueDay: number;
  bankAccount: {
    id: string;
    name: string;
  };
}
