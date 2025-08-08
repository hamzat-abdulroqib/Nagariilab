import { PageHeader } from '@/components/page-header';
import { TestManagement } from './components/test-management';

export default function TestsPage() {
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
