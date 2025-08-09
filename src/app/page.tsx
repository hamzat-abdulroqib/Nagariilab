import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestTube, FlaskConical, Users, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Logo />
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
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
              <img
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="medical laboratory science"
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
