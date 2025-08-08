import { PageHeader } from '@/components/page-header';
import TechnicianManagement from './components/technician-management';

export default function TechniciansPage() {
  return (
    <>
      <PageHeader
        title="Technician Management"
        description="View all registered technicians."
      />
      <TechnicianManagement />
    </>
  );
}
