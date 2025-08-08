'use client';

import * as React from 'react';
import type { Patient, Technician, LabTest } from '@/lib/types';
import { mockPatients, mockTechnicians, mockLabTests } from '@/lib/mock-data';

type DataContextType = {
  patients: Patient[];
  technicians: Technician[];
  labTests: LabTest[];
  addPatient: (patientData: Omit<Patient, 'id' | 'patientId'>) => void;
  addTest: (testData: { patientId: string; testName: string }) => void;
  assignTest: (testId: string, technicianId: string) => void;
  completeTest: (testId: string) => void;
};

const DataContext = React.createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = React.useState<Patient[]>(mockPatients);
  const [technicians, setTechnicians] = React.useState<Technician[]>(mockTechnicians);
  const [labTests, setLabTests] = React.useState<LabTest[]>(mockLabTests);

  const addPatient = (patientData: Omit<Patient, 'id' | 'patientId'>) => {
    setPatients(prev => {
        const newId = (prev.length + 1).toString();
        const newPatient: Patient = {
            id: newId,
            patientId: `NML-00${newId}`,
            ...patientData,
        };
        return [newPatient, ...prev];
    });
  };

  const addTest = (testData: { patientId: string; testName: string }) => {
    const patient = patients.find(p => p.id === testData.patientId);
    if (!patient) return;

    setLabTests(prev => {
        const newTest: LabTest = {
            id: (prev.length + 1).toString(),
            patientId: testData.patientId,
            patientName: patient.name,
            testName: testData.testName,
            status: 'Pending',
            result: null,
            assignedTechnicianId: null,
            createdAt: new Date().toISOString(),
            completedAt: null,
        };
        return [newTest, ...prev];
    });
  };

  const assignTest = (testId: string, technicianId: string) => {
    setLabTests(prev =>
      prev.map(test =>
        test.id === testId
          ? { ...test, assignedTechnicianId: technicianId, status: 'In Progress' }
          : test
      )
    );
  };

  const completeTest = (testId: string) => {
    setLabTests(prev =>
      prev.map(test =>
        test.id === testId
          ? { ...test, status: 'Completed', completedAt: new Date().toISOString(), result: 'Results pending review' }
          : test
      )
    );
  };

  return (
    <DataContext.Provider
      value={{
        patients,
        technicians,
        labTests,
        addPatient,
        addTest,
        assignTest,
        completeTest,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
