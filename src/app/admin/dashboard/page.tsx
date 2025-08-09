'use client';
import * as React from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Users, FlaskConical, TestTube, ClipboardList } from 'lucide-react';
import type { ChartConfig } from '@/components/ui/chart';
import { useData } from '@/context/data-context';
import { format, subMonths } from 'date-fns';

const chartConfig = {
  tests: {
    label: 'Tests',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function Dashboard() {
    const { patients, labTests, technicians, payments } = useData();

    const pendingTests = labTests.filter(t => t.status === 'Pending').length;
    const completedTests = labTests.filter(t => t.status === 'Completed').length;

    const monthlyTestCounts = React.useMemo(() => {
        const now = new Date();
        const counts = Array.from({ length: 6 }, (_, i) => {
          const month = subMonths(now, 5 - i);
          return {
            month: format(month, 'MMMM'),
            tests: 0,
          };
        });
    
        labTests.forEach(test => {
          try {
            const testDate = new Date(test.createdAt);
            const monthName = format(testDate, 'MMMM');
            const countEntry = counts.find(c => c.month === monthName);
            if (countEntry) {
              countEntry.tests += 1;
            }
          } catch (e) {
             // Invalid date, skip
          }
        });
    
        return counts;
      }, [labTests]);


  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Dashboard"
        description="An overview of your laboratory's activities."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Patients"
          value={patients.length.toString()}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="Total registered patients"
        />
        <StatCard
          title="Total Technicians"
          value={technicians.length.toString()}
          icon={<ClipboardList className="h-4 w-4 text-muted-foreground" />}
          description="Total registered technicians"
        />
        <StatCard
          title="Tests to Assign"
          value={pendingTests.toString()}
          icon={<FlaskConical className="h-4 w-4 text-muted-foreground" />}
          description="Tests awaiting assignment"
        />
        <StatCard
          title="Completed Tests"
          value={completedTests.toString()}
          icon={<TestTube className="h-4 w-4 text-muted-foreground" />}
          description="Total tests completed"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
         <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>
                A list of the 5 most recent payments.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.slice(0, 5).map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell>{payment.patientName}</TableCell>
                                    <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
            <CardTitle>Tests Overview</CardTitle>
            <CardDescription>
                A chart showing the number of tests conducted per month.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart accessibilityLayer data={monthlyTestCounts}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value ? value.slice(0, 3) : ''}
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

    </div>
  );
}
