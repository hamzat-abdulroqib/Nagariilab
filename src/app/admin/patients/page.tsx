import { PageHeader } from '@/components/page-header';
import PatientManagement from './components/patient-management';

export default function PatientsPage() {
  return (
    <>
      <PageHeader
        title="Patient Management"
        description="Search, view, and add patient records."
      />
      <PatientManagement />
    </>
  );
}
