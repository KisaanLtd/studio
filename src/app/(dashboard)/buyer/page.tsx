import BuyerMatchmakingClient from '@/components/buyer-matchmaking-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BuyerPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-tight">AI-Powered Matchmaking</h1>
        <p className="text-muted-foreground">Discover available farmers for your specific requirements.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Find Farmers</CardTitle>
          <CardDescription>Enter your needs below and our AI will suggest the best matches.</CardDescription>
        </CardHeader>
        <CardContent>
          <BuyerMatchmakingClient />
        </CardContent>
      </Card>
    </div>
  );
}
