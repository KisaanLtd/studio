import { leads, buyers, type Lead } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const getStatusVariant = (status: Lead['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
        case 'New':
            return 'outline';
        case 'Contacted':
            return 'secondary';
        case 'Negotiating':
            return 'default';
        case 'Closed':
            return 'default';
        case 'Lost':
            return 'destructive';
        default:
            return 'outline';
    }
}

const getStatusClass = (status: string) => {
    switch(status) {
        case 'Negotiating': return 'bg-blue-500 text-white';
        case 'Closed': return 'bg-green-600 text-white';
        default: return '';
    }
}

export default function FarmerLeadsPage() {
  const farmerLeads = leads.filter((lead) => lead.farmerId === 'F001'); // Mock: assuming current farmer is F001

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-tight">My Leads</h1>
        <p className="text-muted-foreground">Track the status of your requested introductions.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Lead Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Buyer</TableHead>
                <TableHead>Date Requested</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {farmerLeads.map((lead) => {
                const buyer = buyers.find((b) => b.id === lead.buyerId);
                return (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{buyer?.name || 'N/A'}</TableCell>
                    <TableCell>{new Date(lead.requestedDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={getStatusVariant(lead.status)} className={cn('w-24 justify-center', getStatusClass(lead.status))}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
