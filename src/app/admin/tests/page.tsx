'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/context/data-context';
import { PageHeader } from '@/components/page-header';
import { TestManagement } from '@/app/tests/components/test-management';

export default function TestsPage() {
  const { labTests, technicians } = useData();

  return (
    <>
      <PageHeader
        title="Test Management"
        description="Log new tests and view the status of all tests."
      />
      <TestManagement />
    </>
  );
}
