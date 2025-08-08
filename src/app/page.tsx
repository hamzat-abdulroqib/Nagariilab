'use client';

import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Users, FlaskConical, TestTube, DollarSign } from 'lucide-react';
import type { ChartConfig } from '@/components/ui/chart';

const chartData = [
  { month: 'January', tests: 186 },
  { month: 'February', tests: 305 },
  { month: 'March', tests: 237 },
  { month: 'April', tests: 173 },
  { month: 'May', tests: 209 },
  { month: 'June', tests: 214 },
];

const chartConfig = {
  tests: {
    label: 'Tests',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="An overview of your laboratory's activities."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Patients"
          value="1,204"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="+20.1% from last month"
        />
        <StatCard
          title="Tests In Progress"
          value="76"
          icon={<FlaskConical className="h-4 w-4 text-muted-foreground" />}
          description="+15 since last hour"
        />
        <StatCard
          title="Completed Tests"
          value="5,421"
          icon={<TestTube className="h-4 w-4 text-muted-foreground" />}
          description="+180.1% from last month"
        />
        <StatCard
          title="Revenue (This Month)"
          value="$24,280"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          description="+45% from last month"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tests Overview</CardTitle>
          <CardDescription>
            A chart showing the number of tests conducted per month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="tests" fill="var(--color-tests)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
