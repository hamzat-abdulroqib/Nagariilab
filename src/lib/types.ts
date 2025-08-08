export interface Patient {
  id: string;
  patientId: string;
  name: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  address: string;
}

export interface Technician {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
}

export interface LabTest {
  id: string;
  patientId: string;
  patientName: string;
  testName: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  result: string | null;
  assignedTechnicianId: string | null;
  createdAt: string;
  completedAt: string | null;
}

export interface Payment {
  id: string;
  patientId: string;
  patientName: string;
  amount: number;
  date: string;
}
