import { ChartConfig } from '@/view/components/Chart';
import { useDashboard } from '../DashboardContext/useDashboard';

type ChartData = { category: string; value: number; fill: string }[];

export const usePieChartController = () => {
  const { transactions } = useDashboard();

  const colors = [
    '#C92A2A',
    '#E03131',
    '#F03E3E',
    '#FA5252',
    '#FF6B6B',
    '#FF8787',
    '#FFA8A8',
    '#FFC9C9',
    '#FFE3E3',
    '#FFF5F5',
  ];

  const chartData: ChartData = transactions
    .filter((transaction) => transaction.type === 'EXPENSE')
    .reduce<ChartData>((acc, item, index) => {
      const category = item.category.name;

      const foundItem = acc.find((accItem) => accItem.category === category);

      if (foundItem) {
        foundItem.value += item.value; // Acumula o valor se a categoria já existe
      } else {
        acc.push({
          category: category,
          value: item.value,
          fill: colors[index],
        });
      }

      return acc;
    }, []);

  const chartConfig: ChartConfig = {};

  chartData.forEach((transaction) => {
    const categoryKey = transaction.category;

    if (!chartConfig[categoryKey]) {
      chartConfig[categoryKey] = { label: categoryKey, color: '#1c7b7b' };
    }
  });

  console.log('chartData', chartData);
  console.log('chartConfig', chartConfig);

  return { transactions, chartConfig, chartData };
};
