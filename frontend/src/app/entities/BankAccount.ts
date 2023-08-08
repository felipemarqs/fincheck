export interface BankAccount {
  id: string;
  name: string;
  initialBalance: string;
  type: "CHECKING" | "INVESTMENT" | "CASH";
  color: string;
  currentBalance: number;
}
