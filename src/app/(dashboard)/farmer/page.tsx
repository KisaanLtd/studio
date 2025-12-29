'use client'

import { farmerMatches } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function FarmerMatchesPage() {
  const handleRequestIntroduction = (buyerName: string) => {
    toast({
      title: 'Introduction Requested!',
      description: `Your coordinator has been notified to connect you with ${buyerName}.`,
    });
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Your Recommended Buyers</h1>
        <p className="text-muted-foreground">Here are AI-powered suggestions for potential buyers.</p>
      </header>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {farmerMatches.map((match) => (
          <Card key={match.buyerId} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                {match.buyerName}
              </CardTitle>
              <CardDescription>{match.needs}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-grow flex-col justify-end">
                <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium">Match Score</p>
                    <div className="flex items-center gap-2">
                      <Progress value={match.matchScore} className="w-full" />
                      <span className="font-semibold">{match.matchScore}%</span>
                    </div>
                </div>
              <Button onClick={() => handleRequestIntroduction(match.buyerName)} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Request Introduction <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
