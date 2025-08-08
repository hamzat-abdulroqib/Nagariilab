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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/context/data-context';

export function AssignmentManagement() {
  const { toast } = useToast();
  const { labTests, technicians, assignTest } = useData();

  const unassignedTests = labTests.filter((test) => test.status === 'Pending');

  const handleAssign = (testId: string, technicianId: string) => {
    assignTest(testId, technicianId);
    const assignedTest = labTests.find(t => t.id === testId);
    const technician = technicians.find(t => t.id === technicianId);
    if(assignedTest && technician) {
      toast({
        title: 'Test Assigned',
        description: `${assignedTest.testName} assigned to ${technician.name}.`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unassigned Tests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Name</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date Logged</TableHead>
                <TableHead className="w-[250px]">Assign To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unassignedTests.length > 0 ? (
                unassignedTests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">{test.testName}</TableCell>
                    <TableCell>{test.patientName}</TableCell>
                    <TableCell>
                      {new Date(test.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Select onValueChange={(techId) => handleAssign(test.id, techId)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Technician" />
                        </SelectTrigger>
                        <SelectContent>
                          {technicians.map((technician) => (
                            <SelectItem key={technician.id} value={technician.id}>
                              {technician.name} ({technician.specialization})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No unassigned tests.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
