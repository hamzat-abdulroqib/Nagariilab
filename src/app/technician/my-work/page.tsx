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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, FileText } from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { useData } from '@/context/data-context';
import { PageHeader } from '@/components/page-header';

// For demonstration, we'll assume technician with ID '2' is logged in.
const LOGGED_IN_TECHNICIAN_ID = '2';

export default function MyWorkPage() {
  const { toast } = useToast();
  const { labTests, technicians, completeTest } = useData();
  
  const technician = technicians.find(t => t.id === LOGGED_IN_TECHNICIAN_ID);

  const assignedTests = labTests.filter(
    (test) => test.assignedTechnicianId === LOGGED_IN_TECHNICIAN_ID
  );

  const pendingTests = assignedTests.filter(t => t.status === 'In Progress');
  const completedTestsByMe = assignedTests.filter(t => t.status === 'Completed');

  const handleCompleteTest = (testId: string) => {
    completeTest(testId);
     const completedTest = labTests.find(t => t.id === testId);
     if (completedTest) {
        toast({
            title: 'Test Marked as Complete',
            description: `${completedTest.testName} for ${completedTest.patientName} is now complete.`,
            variant: 'default',
        });
     }
  };

  if (!technician) {
    return <div>Technician not found.</div>;
  }

  return (
    <div className="space-y-6">
       <PageHeader
        title={`Welcome, ${technician.name}`}
        description="Here are the tests assigned to you."
      />
      <div className="grid gap-4 md:grid-cols-3">
          <StatCard 
            title="Total Assigned Tests"
            value={assignedTests.length.toString()}
            icon={<FileText className="h-4 w-4 text-muted-foreground" />}
            description="All tests assigned to you."
          />
          <StatCard 
            title="Tests In Progress"
            value={pendingTests.length.toString()}
            icon={<Clock className="h-4 w-4 text-muted-foreground" />}
            description="Tests you need to complete."
          />
          <StatCard 
            title="My Completed Tests"
            value={completedTestsByMe.length.toString()}
            icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
            description="Total tests you have completed."
          />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>My Assigned Tests</CardTitle>
          <CardDescription>
            These are the tests currently assigned to you. Update their status once completed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date Assigned</TableHead>
                  <TableHead>Status</TableHead>
                   <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedTests.length > 0 ? (
                  assignedTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">
                        {test.testName}
                      </TableCell>
                      <TableCell>{test.patientName}</TableCell>
                      <TableCell>
                        {new Date(test.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                         <Badge
                            variant={
                                test.status === 'Completed'
                                ? 'default'
                                : 'secondary'
                            }
                            className={test.status === 'Completed' ? 'bg-accent text-accent-foreground' : ''}
                            >
                            {test.status}
                        </Badge>
                      </TableCell>
                       <TableCell className="text-right">
                        {test.status === 'In Progress' && (
                           <Button size="sm" onClick={() => handleCompleteTest(test.id)}>
                            Mark as Complete
                           </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      You have no assigned tests.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
