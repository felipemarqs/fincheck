import { Pie, PieChart as RechartPieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/view/components/Card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/view/components/Chart';
import { cn } from '@/lib/utils';
import { usePieChartController } from './usePieChartController';

export interface PieChartProps {
  className?: string;
}

export function PieChart({ className }: PieChartProps) {
  const { chartConfig, chartData } = usePieChartController();
  return (
    <Card
      className={cn(
        'flex flex-col',
        className,
        chartData.length === 0 && 'hidden'
      )}
    >
      <CardHeader className="items-center pb-0">
        <CardTitle>Gastos do Mês por Categoria</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <RechartPieChart>
            <Pie data={chartData} dataKey="value" nameKey="category" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </RechartPieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
