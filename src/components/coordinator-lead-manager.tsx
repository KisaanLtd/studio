'use client';

import { useState } from 'react';
import { leads as initialLeads, farmers, buyers, type Lead } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const statuses: Lead['status'][] = ['New', 'Contacted', 'Negotiating', 'Closed', 'Lost'];

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
        case 'Negotiating': return 'bg-blue-500 text-white hover:bg-blue-600';
        case 'Closed': return 'bg-green-600 text-white hover:bg-green-700';
        default: return '';
    }
}

export default function CoordinatorLeadManager() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
    toast({
        title: "Status Updated",
        description: `Lead ${leadId} has been updated to "${newStatus}".`
    })
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Leads</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Farmer</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Date Requested</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Update Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => {
              const farmer = farmers.find((f) => f.id === lead.farmerId);
              const buyer = buyers.find((b) => b.id === lead.buyerId);
              return (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{farmer?.name || 'N/A'}</TableCell>
                  <TableCell>{buyer?.name || 'N/A'}</TableCell>
                  <TableCell>{new Date(lead.requestedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(lead.status)} className={cn('w-24 justify-center', getStatusClass(lead.status))}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select
                      value={lead.status}
                      onValueChange={(value: Lead['status']) =>
                        handleStatusChange(lead.id, value)
                      }
                    >
                      <SelectTrigger className="w-[180px] ml-auto">
                        <SelectValue placeholder="Update status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
