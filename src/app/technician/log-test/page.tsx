import { PageHeader } from '@/components/page-header';
import { TestManagement } from '@/app/tests/components/test-management';

export default function LogTestPage() {
  return (
    <>
      <PageHeader
        title="Log a New Test"
        description="Select a patient and enter the test details to add it to the queue."
      />
      <TestManagement />
    </>
  );
}
