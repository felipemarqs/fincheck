import { Transaction } from '@/app/entities/Transaction';
import { useDashboard } from '../DashboardContext/useDashboard';

interface ChartData {
  week: string;
  expense: number;
  income: number;
}

export const useBarChartController = () => {
  const { transactions } = useDashboard();

  //console.log(transactions);

  //console.log('====================================================');

  function groupTransactionsByWeek(transactions: Transaction[]): ChartData[] {
    const weeks: { [key: string]: ChartData } = {};

    transactions.forEach((transaction) => {
      // Converte a string de data para um objeto Date
      const originalDate = new Date(transaction.date);

      const startOfWeek = new Date(originalDate);
      //console.log('startOfWeek.getDate()', startOfWeek.getDate());
      //console.log('startOfWeek.getDay()', startOfWeek.getDay());
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Define o início da semana
      startOfWeek.setHours(0, 0, 0, 0); // Zera as horas, minutos, segundos e milissegundos

      //console.log(startOfWeek.toISOString().split('T')[0]);
      //console.log('startOfWeek--', startOfWeek);

      const weekKey = startOfWeek.toISOString().split('T')[0]; // Usa a data como chave (YYYY-MM-DD)
      if (!weeks[weekKey]) {
        weeks[weekKey] = { week: weekKey, expense: 0, income: 0 };
      }

      if (transaction.type === 'EXPENSE') {
        weeks[weekKey].expense += transaction.value;
      } else if (transaction.type === 'INCOME') {
        weeks[weekKey].income += transaction.value;
      }
    });

    return Object.values(weeks).map((week, index) => ({
      ...week,
      week: `Sem ${index + 1}`,
    }));
  }

  const chartData = groupTransactionsByWeek(transactions);

  console.log('chartData', chartData.length);

  return { chartData };
};
