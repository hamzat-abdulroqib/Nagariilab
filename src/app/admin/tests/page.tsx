'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/context/data-context';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function TestsPage() {
  const { labTests } = useData();

  return (
    <>
      <PageHeader
        title="All Lab Tests"
        description="View the status and results of all tests in the system."
      />
      <Card>
        <CardHeader>
            <CardTitle>Test Log</CardTitle>
            <CardDescription>A comprehensive list of all lab tests.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="rounded-md border">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Logged</TableHead>
                    <TableHead>Result</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {labTests.map((test) => (
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
                    <TableCell>{test.result || 'N/A'}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </div>
        </CardContent>
      </Card>
    </>
  );
}
