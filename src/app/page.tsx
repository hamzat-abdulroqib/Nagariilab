
'use client';

import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestTube, FlaskConical, Users, ShieldCheck, ArrowRight, Star, Menu } from 'lucide-react';
import { Logo } from '@/components/logo';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';


export default function LandingPage() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="px-4 lg:px-6 h-14 flex items-center border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Logo />
        </Link>
        <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
           <Link
            href="#how-it-works"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            How It Works
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Login
          </Link>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 py-6">
               <SheetClose asChild>
                <Link href="#" className="flex items-center justify-center mb-4" prefetch={false}>
                    <Logo />
                </Link>
               </SheetClose>
               <SheetClose asChild>
                <Link
                    href="#features"
                    className="text-lg font-medium hover:underline underline-offset-4"
                    prefetch={false}
                    onClick={() => setIsSheetOpen(false)}
                >
                    Features
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                    href="#how-it-works"
                    className="text-lg font-medium hover:underline underline-offset-4"
                    prefetch={false}
                    onClick={() => setIsSheetOpen(false)}
                >
                    How It Works
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                    href="/login"
                    className="text-lg font-medium hover:underline underline-offset-4"
                    prefetch={false}
                    onClick={() => setIsSheetOpen(false)}
                >
                    Login
                </Link>
               </SheetClose>
               <SheetClose asChild>
                <Button asChild className="mt-4">
                    <Link href="/signup">Get Started</Link>
                </Button>
               </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    The Modern Laboratory Information System
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Nagari Lab provides a comprehensive, intuitive, and secure platform to manage all your laboratory operations, from patient registration to final results.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/login">
                      Access Portal
                    </Link>
                  </Button>
                   <Button asChild size="lg" variant="outline">
                    <Link href="/signup">
                      Sign Up Now
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://i.ibb.co/4RqZkgNV/hotspital.jpg"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="medical setting"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Core Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Streamline Your Entire Workflow</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed to optimize every step of the laboratory process, ensuring accuracy, efficiency, and compliance.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
              <Card>
                <CardHeader className="flex flex-col items-center text-center gap-2">
                   <div className="bg-primary/20 p-3 rounded-full">
                     <Users className="h-8 w-8 text-primary" />
                   </div>
                  <CardTitle>Patient & Test Management</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  Easily manage patient records, log new tests, track their status from pending to completed, and record results seamlessly.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-col items-center text-center gap-2">
                   <div className="bg-primary/20 p-3 rounded-full">
                     <FlaskConical className="h-8 w-8 text-primary" />
                   </div>
                  <CardTitle>Technician Workflow</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  Assign tests to available technicians, monitor their workload, and allow them to update progress and enter results for their assigned tasks.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-col items-center text-center gap-2">
                   <div className="bg-primary/20 p-3 rounded-full">
                     <ShieldCheck className="h-8 w-8 text-primary" />
                   </div>
                  <CardTitle>Secure & Reliable</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  Built with role-based access control to ensure data security. Your laboratory's information is safe, organized, and accessible only to authorized personnel.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">A Simple, Powerful Process</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Follow our intuitive workflow to manage your lab with unparalleled efficiency.
                </p>
              </div>
            </div>
            <div className="relative mt-12">
                <div className="absolute top-0 left-1/2 w-0.5 h-full bg-border -translate-x-1/2 md:hidden" aria-hidden="true"></div>
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block" aria-hidden="true"></div>
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
                    <div className="flex flex-col md:flex-row md:items-center text-center md:text-left gap-4 p-6 bg-background rounded-lg shadow-md">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mx-auto md:mx-0 flex-shrink-0">1</div>
                        <div>
                            <h3 className="text-xl font-bold">Register Patient & Test</h3>
                            <p className="text-muted-foreground text-sm mt-1">Technicians or admins quickly add new patients and log required lab tests into the system, kicking off the process.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center text-center md:text-left gap-4 p-6 bg-background rounded-lg shadow-md">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mx-auto md:mx-0 flex-shrink-0">2</div>
                        <div>
                          <h3 className="text-xl font-bold">Assign & Process</h3>
                          <p className="text-muted-foreground text-sm mt-1">Admins assign the pending tests to available technicians. Technicians view their queue, perform the tests, and update the results.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center text-center md:text-left gap-4 p-6 bg-background rounded-lg shadow-md">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mx-auto md:mx-0 flex-shrink-0">3</div>
                        <div>
                          <h3 className="text-xl font-bold">Review & Deliver</h3>
                          <p className="text-muted-foreground text-sm mt-1">Once results are recorded, they are available for review. Admins can monitor overall progress and ensure timely delivery of results.</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Professionals</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear what our users have to say about Nagari Lab.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex">
                      <Star className="text-yellow-400" />
                      <Star className="text-yellow-400" />
                      <Star className="text-yellow-400" />
                      <Star className="text-yellow-400" />
                      <Star className="text-yellow-400" />
                    </div>
                    <p className="text-muted-foreground text-sm">&quot;Nagari Lab has transformed our workflow. Test assignments and result tracking are now incredibly simple and efficient.&quot;</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person portrait" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">Dr. Jane Doe</p>
                        <p className="text-xs text-muted-foreground">Lead Hematologist</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                <div className="space-y-4">
                    <div className="flex">
                      <Star className="text-yellow-400" />
                      <Star className="text-yellow-400" />
                      <Star className="text-yellow-400" />
                      <Star className="text-yellow-400" />
                      <Star className="text-yellow-400" />
                    </div>
                    <p className="text-muted-foreground text-sm">&quot;As a technician, having all my assigned tests in one place is a game-changer. The interface is clean and lets me focus on my work.&quot;</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person portrait" />
                        <AvatarFallback>MS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">Michael Smith</p>
                        <p className="text-xs text-muted-foreground">Lab Technician</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                <div className="space-y-4">
                    <div className="flex">
                      <Star className="text-yellow-400" />
                      <Star className="text-yellow-400" />
                      <Star className="text-yellow-400" />
                      <Star className="text-yellow-400" />
                      <Star className="text-yellow-400" />
                    </div>
                    <p className="text-muted-foreground text-sm">&quot;The administrative dashboard gives me a perfect overview of the entire lab&apos;s operations. It&apos;s powerful yet easy to use.&quot;</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person portrait" />
                        <AvatarFallback>SA</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">Sarah Adams</p>
                        <p className="text-xs text-muted-foreground">Lab Manager</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

         <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Ready to Modernize Your Laboratory?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join Nagari Lab today and bring efficiency, accuracy, and security to your operations.
                </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                    <Button asChild size="lg">
                        <Link href="/signup">
                            Sign Up for Free
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>


      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Nagari Lab. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/login" className="text-xs hover:underline underline-offset-4">
            Login
          </Link>
          <Link href="/signup" className="text-xs hover:underline underline-offset-4">
            Sign Up
          </Link>
        </nav>
      </footer>
    </div>
  );
}
