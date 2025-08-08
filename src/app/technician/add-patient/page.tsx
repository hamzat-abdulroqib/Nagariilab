import { PageHeader } from '@/components/page-header';
import { PatientManagement } from '@/app/patients/components/patient-management';

export default function AddPatientPage() {
  return (
    <>
      <PageHeader
        title="Add New Patient"
        description="Use the form below to add a new patient to the system."
      />
      <div className="max-w-2xl mx-auto">
        <PatientManagement />
      </div>
    </>
  );
}
