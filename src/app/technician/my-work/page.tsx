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
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, FileText, Pencil } from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { useData } from '@/context/data-context';
import { PageHeader } from '@/components/page-header';

// For demonstration, we'll assume technician with ID '2' is logged in.
const LOGGED_IN_TECHNICIAN_ID = '2';

function RecordResultDialog({ testId, currentResult, onResultSaved }: { testId: string, currentResult: string | null, onResultSaved: () => void }) {
    const { toast } = useToast();
    const { updateTestResult, labTests } = useData();
    const [result, setResult] = React.useState(currentResult || '');
    const [isOpen, setIsOpen] = React.useState(false);

    const handleSave = () => {
        updateTestResult(testId, result);
        const updatedTest = labTests.find(t => t.id === testId);
        if (updatedTest) {
            toast({
                title: 'Result Recorded',
                description: `Result for ${updatedTest.testName} has been saved.`,
            });
        }
        setIsOpen(false);
        onResultSaved();
    }
    
    // Update local state if the prop changes
    React.useEffect(() => {
        setResult(currentResult || '');
    }, [currentResult]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                    <Pencil className="mr-2 h-4 w-4" />
                    {currentResult ? 'Edit Result' : 'Record Result'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Record Test Result</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Textarea
                        placeholder="Enter test results here..."
                        className="h-40"
                        value={result}
                        onChange={(e) => setResult(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                    <Button onClick={handleSave}>Save Result</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default function MyWorkPage() {
  const { toast } = useToast();
  const { labTests, technicians, completeTest } = useData();
  // Force re-render when a result is saved
  const [_, setForceRender] = React.useState({});
  
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
            These are the tests currently assigned to you. Update their status and record results once completed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Result</TableHead>
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
                      <TableCell>{test.result || "N/A"}</TableCell>
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
                       <TableCell className="text-right space-x-2">
                        {test.status === 'In Progress' && (
                           <Button size="sm" onClick={() => handleCompleteTest(test.id)}>
                            Mark as Complete
                           </Button>
                        )}
                        {test.status === 'Completed' && (
                            <RecordResultDialog 
                                testId={test.id} 
                                currentResult={test.result}
                                onResultSaved={() => setForceRender({})}
                             />
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
