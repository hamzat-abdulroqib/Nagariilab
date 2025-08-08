
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useData } from '@/context/data-context';
import { useToast } from '@/hooks/use-toast';
import type { Patient } from '@/lib/types';

const logTestSchema = z.object({
  testName: z.string().min(3, 'Test name must be at least 3 characters'),
});

interface LogTestDialogProps {
    patient: Patient;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function LogTestDialog({ patient, isOpen, onOpenChange }: LogTestDialogProps) {
    const { toast } = useToast();
    const { addTest } = useData();

    const form = useForm<z.infer<typeof logTestSchema>>({
        resolver: zodResolver(logTestSchema),
        defaultValues: { testName: '' },
    });

    const onSubmit = (values: z.infer<typeof logTestSchema>) => {
        addTest({
            patientId: patient.id,
            testName: values.testName,
        });

        form.reset();
        onOpenChange(false);
        toast({
            title: 'Test Logged',
            description: `${values.testName} for ${patient.name} has been successfully logged.`,
        });
    };
    
    // Reset form when dialog re-opens
    React.useEffect(() => {
        if (isOpen) {
            form.reset();
        }
    }, [isOpen, form]);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Log Test for {patient.name}</DialogTitle>
                    <DialogDescription>
                        The new patient has been created. You can now log a test for them.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
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
                        <DialogFooter>
                            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Skip</Button>
                            <Button type="submit">Log Test</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
