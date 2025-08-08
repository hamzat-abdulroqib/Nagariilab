import type { Patient, Technician, LabTest, Payment } from './types';

export const mockPatients: Patient[] = [
  { id: '1', patientId: 'NML-001', name: 'John Doe', dob: '1985-05-15', gender: 'Male', phone: '123-456-7890', email: 'john.doe@example.com', address: '123 Main St, Anytown' },
  { id: '2', patientId: 'NML-002', name: 'Jane Smith', dob: '1992-08-22', gender: 'Female', phone: '234-567-8901', email: 'jane.smith@example.com', address: '456 Oak Ave, Anytown' },
  { id: '3', patientId: 'NML-003', name: 'Peter Jones', dob: '1978-11-30', gender: 'Male', phone: '345-678-9012', email: 'peter.jones@example.com', address: '789 Pine Ln, Anytown' },
  { id: '4', patientId: 'NML-004', name: 'Mary Johnson', dob: '2001-02-10', gender: 'Female', phone: '456-789-0123', email: 'mary.j@example.com', address: '101 Maple Dr, Anytown' },
  { id: '5', patientId: 'NML-005', name: 'Carlos Garcia', dob: '1995-07-19', gender: 'Male', phone: '567-890-1234', email: 'carlos.g@example.com', address: '212 Birch Rd, Anytown' },
];

export const mockTechnicians: Technician[] = [
  { id: '1', name: 'Alice Brown', specialization: 'Hematology' },
  { id: '2', name: 'Bob White', specialization: 'Microbiology' },
  { id: '3', name: 'Charlie Green', specialization: 'Chemistry' },
];

export const mockLabTests: LabTest[] = [
  { id: '1', patientId: '1', patientName: 'John Doe', testName: 'Complete Blood Count', status: 'Completed', result: 'All values within normal range.', assignedTechnicianId: '1', createdAt: '2023-10-26T10:00:00Z', completedAt: '2023-10-26T14:00:00Z' },
  { id: '2', patientId: '2', patientName: 'Jane Smith', testName: 'Lipid Panel', status: 'In Progress', result: null, assignedTechnicianId: '3', createdAt: '2023-10-27T09:30:00Z', completedAt: null },
  { id: '3', patientId: '1', patientName: 'John Doe', testName: 'Urinalysis', status: 'Pending', result: null, assignedTechnicianId: null, createdAt: '2023-10-28T08:00:00Z', completedAt: null },
  { id: '4', patientId: '3', patientName: 'Peter Jones', testName: 'Microbe Culture', status: 'In Progress', result: null, assignedTechnicianId: '2', createdAt: '2023-10-28T11:00:00Z', completedAt: null },
  { id: '5', patientId: '4', patientName: 'Mary Johnson', testName: 'Thyroid Function Test', status: 'Completed', result: 'TSH level is slightly elevated.', assignedTechnicianId: '3', createdAt: '2023-10-25T15:00:00Z', completedAt: '2023-10-26T18:00:00Z' },
  { id: '6', patientId: '5', patientName: 'Carlos Garcia', testName: 'Glucose Tolerance Test', status: 'Pending', result: null, assignedTechnicianId: null, createdAt: '2023-10-29T10:15:00Z', completedAt: null },
  { id: '7', patientId: '2', patientName: 'Jane Smith', testName: 'Kidney Function Test', status: 'In Progress', result: null, assignedTechnicianId: '2', createdAt: '2023-10-29T11:45:00Z', completedAt: null },
];

export const mockPayments: Payment[] = [
    { id: '1', patientId: '1', patientName: 'John Doe', amount: 50.00, date: '2023-10-26T14:05:00Z'},
    { id: '2', patientId: '4', patientName: 'Mary Johnson', amount: 75.50, date: '2023-10-26T18:10:00Z'},
]
