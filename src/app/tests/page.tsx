import { PageHeader } from '@/components/page-header';
import { TestManagement } from './components/test-management';

export default function TestsPage() {
  return (
    <>
      <PageHeader
        title="Test Management"
        description="Log new tests and view the status of all tests."
      />
      <TestManagement />
    </>
  );
}
