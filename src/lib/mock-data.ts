import type { Patient, Technician, LabTest } from './types';

export const mockPatients: Patient[] = [
  { id: '1', patientId: 'NML-001', name: 'John Doe', dob: '1985-05-15', gender: 'Male', phone: '123-456-7890', email: 'john.doe@example.com', address: '123 Main St, Anytown' },
  { id: '2', patientId: 'NML-002', name: 'Jane Smith', dob: '1992-08-22', gender: 'Female', phone: '234-567-8901', email: 'jane.smith@example.com', address: '456 Oak Ave, Anytown' },
  { id: '3', patientId: 'NML-003', name: 'Peter Jones', dob: '1978-11-30', gender: 'Male', phone: '345-678-9012', email: 'peter.jones@example.com', address: '789 Pine Ln, Anytown' },
  { id: '4', patientId: 'NML-004', name: 'Mary Johnson', dob: '2001-02-10', gender: 'Female', phone: '456-789-0123', email: 'mary.j@example.com', address: '101 Maple Dr, Anytown' },
];

export const mockTechnicians: Technician[] = [
  { id: '1', name: 'Alice Brown', specialization: 'Hematology' },
  { id: '2', name: 'Bob White', specialization: 'Microbiology' },
  { id: '3', name: 'Charlie Green', specialization: 'Chemistry' },
];

export const mockLabTests: LabTest[] = [
  { id: '1', patientId: '1', patientName: 'John Doe', testName: 'Complete Blood Count', status: 'Completed', result: 'Normal', assignedTechnicianId: '1', createdAt: '2023-10-26T10:00:00Z', completedAt: '2023-10-26T14:00:00Z' },
  { id: '2', patientId: '2', patientName: 'Jane Smith', testName: 'Lipid Panel', status: 'In Progress', result: null, assignedTechnicianId: '3', createdAt: '2023-10-27T09:30:00Z', completedAt: null },
  { id: '3', patientId: '1', patientName: 'John Doe', testName: 'Urinalysis', status: 'Pending', result: null, assignedTechnicianId: null, createdAt: '2023-10-28T08:00:00Z', completedAt: null },
  { id: '4', patientId: '3', patientName: 'Peter Jones', testName: 'Microbe Culture', status: 'Pending', result: null, assignedTechnicianId: null, createdAt: '2023-10-28T11:00:00Z', completedAt: null },
  { id: '5', patientId: '4', patientName: 'Mary Johnson', testName: 'Thyroid Function Test', status: 'Completed', result: 'Within limits', assignedTechnicianId: '3', createdAt: '2023-10-25T15:00:00Z', completedAt: '2023-10-26T18:00:00Z' },
];
