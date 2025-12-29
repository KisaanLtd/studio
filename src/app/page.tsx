import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, Leaf, ShoppingBag, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';

const roles = [
  {
    name: 'Farmer',
    description: 'Find buyers for your crops and manage introductions.',
    icon: <Leaf className="h-10 w-10 text-primary" />,
    href: '/farmer',
  },
  {
    name: 'Buyer',
    description: 'Discover available farmers using AI-powered matching.',
    icon: <ShoppingBag className="h-10 w-10 text-primary" />,
    href: '/buyer',
  },
  {
    name: 'Coordinator',
    description: 'Manage leads and facilitate deals between stakeholders.',
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    href: '/coordinator',
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-farm');

  return (
    <div className="flex min-h-screen flex-col">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <Logo className="h-8 w-auto" />
              <span className="font-headline text-xl font-semibold">AgriMatch Connect</span>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <div className="relative isolate">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/80 to-accent/80 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
            <div className="text-center">
              <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-6xl">
                AgriMatch Connect
              </h1>
              <p className="mt-6 text-lg leading-8 text-foreground/80">
                Connecting Farmers, Buyers, and Coordinators for a more efficient agricultural marketplace.
              </p>
            </div>
            
            <div className="mt-16 sm:mt-20">
              <h2 className="text-center font-headline text-2xl font-semibold">Choose Your Role</h2>
              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                {roles.map((role) => (
                  <Card key={role.name} className="group transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 rounded-lg bg-primary/10 p-3">
                          {role.icon}
                        </div>
                        <CardTitle className="font-headline text-2xl">{role.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{role.description}</p>
                      <Button asChild variant="link" className="mt-4 p-0 font-semibold text-accent">
                        <Link href={role.href}>
                          Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/70 to-accent/70 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} AgriMatch Connect. All rights reserved.
      </footer>
    </div>
  );
}
