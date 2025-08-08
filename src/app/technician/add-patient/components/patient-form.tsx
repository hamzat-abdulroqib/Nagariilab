
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
import { useToast } from '@/hooks/use-toast';
import { LogTestDialog } from './log-test-dialog';
import type { Patient } from '@/lib/types';

const addPatientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number seems too short'),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date of birth',
  }),
});

export function PatientForm() {
  const { toast } = useToast();
  const { addPatient } = useData();
  const [newPatient, setNewPatient] = React.useState<Patient | null>(null);
  const [isLogTestDialogOpen, setIsLogTestDialogOpen] = React.useState(false);

  const form = useForm<z.infer<typeof addPatientSchema>>({
    resolver: zodResolver(addPatientSchema),
    defaultValues: { name: '', email: '', phone: '', dob: '' },
  });

  const onSubmit = (values: z.infer<typeof addPatientSchema>) => {
    const createdPatient = addPatient({
      ...values,
      gender: 'Other',
      address: '',
    });

    form.reset();
    toast({
        title: "Patient Added",
        description: `${values.name} has been added to the patient list.`,
    });
    setNewPatient(createdPatient);
    setIsLogTestDialogOpen(true);
  };

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>New Patient Details</CardTitle>
        <CardDescription>
          Fill in the details below to add a new patient record.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                    <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
                <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                    <Input placeholder="123-456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                    <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className="flex justify-end pt-4">
                <Button type="submit">Add Patient & Log Test</Button>
            </div>
            </form>
        </Form>
       </CardContent>
    </Card>

    {newPatient && (
        <LogTestDialog 
            patient={newPatient}
            isOpen={isLogTestDialogOpen}
            onOpenChange={setIsLogTestDialogOpen}
        />
    )}
    </>
  );
}
