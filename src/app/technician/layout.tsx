"use client";

import { TechnicianAppShell } from '@/components/technician-app-shell';

export default function TechnicianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TechnicianAppShell>{children}</TechnicianAppShell>;
}
