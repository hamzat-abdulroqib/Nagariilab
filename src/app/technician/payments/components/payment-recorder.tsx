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
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
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
import { useData } from '@/context/data-context';

const recordPaymentSchema = z.object({
  patientId: z.string().nonempty('Patient is required'),
  amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
});

export function PaymentRecorder() {
  const { toast } = useToast();
  const { patients, recordPayment } = useData();

  const form = useForm<z.infer<typeof recordPaymentSchema>>({
    resolver: zodResolver(recordPaymentSchema),
    defaultValues: { patientId: '', amount: 0 },
  });

  const onSubmit = (values: z.infer<typeof recordPaymentSchema>) => {
    const patient = patients.find((p) => p.id === values.patientId);
    if (!patient) return;

    recordPayment({
        patientId: values.patientId,
        amount: values.amount,
    });

    form.reset();
    toast({
      title: 'Payment Recorded',
      description: `Payment of $${values.amount.toFixed(2)} for ${patient.name} has been recorded.`,
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>New Payment</CardTitle>
            <CardDescription>
              Select a patient and enter the payment amount.
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
                          {patients.map((patient) => (
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
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="50.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Record Payment</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
  );
}
