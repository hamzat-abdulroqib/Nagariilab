import { PageHeader } from '@/components/page-header';
import { TestManagement } from '@/app/tests/components/test-management';

export default function TechnicianDashboard() {
  return (
    <>
      <PageHeader
        title="Test Management"
        description="Log new tests, record results, and view patient test history."
      />
      <TestManagement />
    </>
  );
}
