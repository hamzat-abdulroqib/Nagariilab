'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TestTube } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = React.useState('admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/technician/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Link href="/" className="flex items-center justify-center mb-4">
             <TestTube className="h-8 w-8 text-primary" />
          </Link>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Select your role to access your dashboard.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" defaultValue="admin@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="password" required />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <RadioGroup defaultValue="admin" value={role} onValueChange={setRole} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">Admin</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="technician" id="technician" />
                  <Label htmlFor="technician">Technician</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
