"use client";

import Link from 'next/link';
import {
  Users,
  FlaskConical,
  LogOut,
  Settings,
  ClipboardList
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/logo';


export default function TechnicianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Logo />
            <span className="sr-only">MediTrack Lite</span>
          </Link>
          <Link
            href="/technician/dashboard"
            className="text-foreground transition-colors hover:text-foreground flex items-center gap-2"
          >
            <FlaskConical className="h-4 w-4" />
            Test Management
          </Link>
          <Link
            href="/technician/patients"
            className="text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2"
          >
             <Users className="h-4 w-4" />
            Patient Management
          </Link>
           <Link
            href="/technician/my-work"
            className="text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2"
          >
             <ClipboardList className="h-4 w-4" />
            My Work
          </Link>
        </nav>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className='ml-auto'>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/40x40.png" alt="Technician" data-ai-hint="person portrait" />
                        <AvatarFallback>T</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Technician Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className='mr-2 h-4 w-4' />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                       <Link href="/login" className='flex items-center'>
                        <LogOut className='mr-2 h-4 w-4' />
                        Logout
                       </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        {children}
      </main>
    </div>
  );
}
