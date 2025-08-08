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
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useData } from '@/context/data-context';
import { PageHeader } from '@/components/page-header';

export default function PatientsPage() {
  const { patients } = useData();
  const [search, setSearch] = React.useState('');

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone.includes(search)
  );

  return (
    <>
      <PageHeader
        title="Patient Records"
        description="View all registered patient records."
      />
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, ID, or phone..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.patientId}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.dob}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No patients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
