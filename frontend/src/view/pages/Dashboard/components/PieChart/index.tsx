'use client';

import { Pie, PieChart as RechartPieChart } from 'recharts';

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
  ChartLegend,
  ChartLegendContent,
} from '@/view/components/Chart';
import { cn } from '@/lib/utils';
const chartData = [
  { browser: 'chrome', visitors: 13500, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 500, fill: 'var(--color-safari)' },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Despesas',
    color: 'hsl(var(--destructive))',
  },
  safari: {
    label: 'Receitas',
    color: '#51CF66',
  },
} satisfies ChartConfig;

export interface PieChartProps {
  className?: string;
}

export function PieChart({ className }: PieChartProps) {
  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Legend</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <RechartPieChart>
            <Pie data={chartData} dataKey="visitors" />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </RechartPieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
