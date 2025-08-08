import { PageHeader } from '@/components/page-header';
import AssignmentManagement from './components/assignment-management';

export default function TechniciansPage() {
  return (
    <>
      <PageHeader
        title="Technician Management"
        description="Assign tests to technicians and track completed work."
      />
      <AssignmentManagement />
    </>
  );
}
