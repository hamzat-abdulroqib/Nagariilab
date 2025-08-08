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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useData } from '@/context/data-context';

export default function TechnicianManagement() {
  const { technicians } = useData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Technicians</CardTitle>
        <CardDescription>
          A list of all technicians in the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Technician ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Specialization</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {technicians.length > 0 ? (
                technicians.map((technician) => (
                  <TableRow key={technician.id}>
                    <TableCell className="font-medium">
                      {technician.id}
                    </TableCell>
                    <TableCell>{technician.name}</TableCell>
                    <TableCell>{technician.specialization}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No technicians found.
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
