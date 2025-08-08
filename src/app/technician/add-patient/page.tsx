import { PageHeader } from '@/components/page-header';
import { PatientForm } from './components/patient-form';

export default function AddPatientPage() {
  return (
    <>
      <PageHeader
        title="Add New Patient"
        description="Use the form below to add a new patient to the system."
      />
      <div className="max-w-2xl mx-auto">
        <PatientForm />
      </div>
    </>
  );
}
