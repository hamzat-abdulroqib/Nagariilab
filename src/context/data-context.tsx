
'use client';

import * as React from 'react';
import type { Patient, Technician, LabTest, Payment, User, UserRole } from '@/lib/types';
import { mockPatients, mockTechnicians, mockLabTests, mockPayments } from '@/lib/mock-data';

type DataContextType = {
  // Auth
  users: User[];
  signup: (userData: Omit<User, 'id' | 'password_bcrypt_hash'>) => User;
  login: (email: string, pass: string) => User | null;

  // Data
  patients: Patient[];
  technicians: Technician[];
  labTests: LabTest[];
  payments: Payment[];
  addPatient: (patientData: Omit<Patient, 'id' | 'patientId'>) => Patient;
  removePatient: (patientId: string) => void;
  addTechnician: (technicianData: Omit<Technician, 'id'>) => void;
  removeTechnician: (technicianId: string) => void;
  addTest: (testData: { patientId: string; testName: string }) => void;
  assignTest: (testId: string, technicianId: string) => void;
  updateTestResult: (testId: string, result: string) => void;
  recordPayment: (paymentData: { patientId: string, amount: number }) => void;
};

const DataContext = React.createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = React.useState<User[]>([]);
  const [patients, setPatients] = React.useState<Patient[]>(mockPatients);
  const [technicians, setTechnicians] = React.useState<Technician[]>(mockTechnicians);
  const [labTests, setLabTests] = React.useState<LabTest[]>(mockLabTests);
  const [payments, setPayments] = React.useState<Payment[]>(mockPayments);

  // --- AUTH ---
  const signup = (userData: Omit<User, 'id' | 'password_bcrypt_hash'>) => {
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
        throw new Error('An account with this email already exists.');
    }
    
    const newUser: User = {
        id: (users.length + 1).toString() + Date.now().toString(),
        ...userData,
        // In a real app, you would hash the password here before saving.
        // For this demo, we'll store it as is, but name the field to reflect best practice.
        password_bcrypt_hash: userData.password, 
    };

    setUsers(prev => [newUser, ...prev]);

    // If the new user is a technician, also create a technician profile
    if (newUser.role === 'Technician') {
        addTechnician({
            name: newUser.name,
            email: newUser.email,
            phone: 'N/A', // Placeholder, could be part of signup form
            specialization: 'General', // Placeholder
        })
    }
    
    return newUser;
  }

  const login = (email: string, pass: string) => {
    const user = users.find(u => u.email === email && u.password_bcrypt_hash === pass);
    return user || null;
  }


  // --- DATA MANAGEMENT ---
  const addPatient = (patientData: Omit<Patient, 'id' | 'patientId'>) => {
    const newId = (patients.length + 1).toString() + Date.now().toString();
    const newPatient: Patient = {
        id: newId,
        patientId: `NML-00${patients.length + 1}`,
        ...patientData,
    };
    setPatients(prev => [newPatient, ...prev]);
    return newPatient;
  };

  const removePatient = (patientId: string) => {
    setPatients(prev => prev.filter(p => p.id !== patientId));
    // Also remove associated tests and payments
    setLabTests(prev => prev.filter(t => t.patientId !== patientId));
    setPayments(prev => prev.filter(p => p.patientId !== patientId));
  }

  const addTechnician = (technicianData: Omit<Technician, 'id'>) => {
    setTechnicians(prev => {
        // Prevent duplicate technicians if a user signs up twice somehow
        if (prev.some(t => t.email === technicianData.email)) {
            return prev;
        }
        const newId = (prev.length + 1).toString() + Date.now().toString();
        const newTechnician: Technician = {
            id: newId,
            ...technicianData,
        };
        return [newTechnician, ...prev];
    });
  }

  const removeTechnician = (technicianId: string) => {
    setTechnicians(prev => prev.filter(t => t.id !== technicianId));
    // Also unassign tests from this technician
    setLabTests(prev => prev.map(test => 
        test.assignedTechnicianId === technicianId 
        ? { ...test, assignedTechnicianId: null, status: 'Pending' } 
        : test
    ));
  }

  const addTest = (testData: { patientId: string; testName: string }) => {
    const patient = patients.find(p => p.id === testData.patientId);
    if (!patient) return;

    setLabTests(prev => {
        const newTest: LabTest = {
            id: (prev.length + 1).toString() + Date.now().toString(),
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

  const updateTestResult = (testId: string, result: string) => {
    setLabTests(prev => 
        prev.map(test => 
            test.id === testId ? { ...test, result, status: 'Completed', completedAt: new Date().toISOString() } : test
        )
    )
  }

  const recordPayment = (paymentData: { patientId: string, amount: number }) => {
    const patient = patients.find(p => p.id === paymentData.patientId);
    if (!patient) return;

    setPayments(prev => {
        const newPayment: Payment = {
            id: (prev.length + 1).toString() + Date.now().toString(),
            patientId: paymentData.patientId,
            patientName: patient.name,
            amount: paymentData.amount,
            date: new Date().toISOString(),
        };
        return [newPayment, ...prev];
    });
  }

  return (
    <DataContext.Provider
      value={{
        users,
        signup,
        login,
        patients,
        technicians,
        labTests,
        payments,
        addPatient,
        removePatient,
        addTechnician,
        removeTechnician,
        addTest,
        assignTest,
        updateTestResult,
        recordPayment,
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
