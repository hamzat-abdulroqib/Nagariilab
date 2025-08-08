'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockLabTests, mockPatients } from '@/lib/mock-data';
import type { LabTest } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const logTestSchema = z.object({
  patientId: z.string().nonempty('Patient is required'),
  testName: z.string().min(3, 'Test name must be at least 3 characters'),
});

export function TestManagement() {
  const { toast } = useToast();
  const [tests, setTests] = React.useState<LabTest[]>(mockLabTests);

  const form = useForm<z.infer<typeof logTestSchema>>({
    resolver: zodResolver(logTestSchema),
    defaultValues: { patientId: '', testName: '' },
  });

  const onSubmit = (values: z.infer<typeof logTestSchema>) => {
    const patient = mockPatients.find((p) => p.id === values.patientId);
    if (!patient) return;

    const newTest: LabTest = {
      id: (tests.length + 1).toString(),
      patientId: values.patientId,
      patientName: patient.name,
      testName: values.testName,
      status: 'Pending',
      result: null,
      assignedTechnicianId: null,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setTests([newTest, ...tests]);
    form.reset();
    toast({
      title: 'Test Logged',
      description: `${values.testName} for ${patient.name} has been successfully logged.`,
    });
  };

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Log New Test</CardTitle>
            <CardDescription>
              Select a patient and enter the test name.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="patientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a patient" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockPatients.map((patient) => (
                            <SelectItem key={patient.id} value={patient.id}>
                              {patient.name} ({patient.patientId})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="testName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Test Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Complete Blood Count" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Log Test</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">All Tests</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Name</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Logged</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.testName}</TableCell>
                  <TableCell>{test.patientName}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        test.status === 'Completed'
                          ? 'default'
                          : test.status === 'In Progress'
                          ? 'secondary'
                          : 'outline'
                      }
                      className={test.status === 'Completed' ? 'bg-accent text-accent-foreground' : ''}
                    >
                      {test.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(test.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
