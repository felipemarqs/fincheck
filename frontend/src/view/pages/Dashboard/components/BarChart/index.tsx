'use client';

import {
  Bar,
  BarChart as RechartBarChart,
  CartesianGrid,
  XAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/view/components/Card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/view/components/Chart';
import { cn } from '@/lib/utils';
import { useBarChartController } from './useBarChartController';
/* const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]; */

const chartConfig = {
  expense: {
    label: 'Despesas',
    color: '#FF6B6B',
  },
  income: {
    label: 'Receitas',
    color: '#20C997',
  },
} satisfies ChartConfig;

export interface BarChartProps {
  className?: string;
}

export function BarChart({ className }: BarChartProps) {
  const { chartData } = useBarChartController();
  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Receitas x Despesas do Mês</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="min-h-[275px] w-full">
          <RechartBarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              //tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="expense" fill="#E03131" radius={4} />
            <Bar dataKey="income" fill="#20C997" radius={4} />
            <ChartLegend content={<ChartLegendContent />} />
          </RechartBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
