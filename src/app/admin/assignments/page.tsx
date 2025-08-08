import { PageHeader } from '@/components/page-header';
import { AssignmentManagement } from '@/app/technicians/components/assignment-management';

export default function AssignmentsPage() {
  return (
    <>
      <PageHeader
        title="Test Assignments"
        description="Assign pending tests to available technicians."
      />
      <AssignmentManagement />
    </>
  );
}
