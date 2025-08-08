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

export default function TestsPage() {
  const { labTests } = useData();

  return (
    <>
      <PageHeader
        title="All Lab Tests"
        description="View the status and details of all tests in the system."
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test Name</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Logged</TableHead>
              <TableHead>Assigned To</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {labTests.map((test) => {
              const technician = useData().technicians.find(t => t.id === test.assignedTechnicianId);
              return (
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
                  <TableCell>
                    {technician ? technician.name : 'Unassigned'}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
