export type Farmer = {
  id: string;
  name: string;
  location: string;
  crops: { type: string; quantity: number }[];
};

export type Buyer = {
  id:string;
  name: string;
  location: string;
  needs: { type: string; quantity: number, organic: boolean };
};

export type Lead = {
  id: string;
  farmerId: string;
  buyerId: string;
  coordinatorId: string;
  status: 'New' | 'Contacted' | 'Negotiating' | 'Closed' | 'Lost';
  requestedDate: string;
};

export const farmers: Farmer[] = [
  { id: 'F001', name: 'Green Valley Farms', location: 'Salinas, CA', crops: [{ type: 'Lettuce', quantity: 1000 }] },
  { id: 'F002', name: 'Sunset Orchards', location: 'Fresno, CA', crops: [{ type: 'Oranges', quantity: 5000 }] },
  { id: 'F003', name: 'Prairie Grains Co.', location: 'Ames, IA', crops: [{ type: 'Corn', quantity: 10000 }] },
];

export const buyers: Buyer[] = [
  { id: 'B001', name: 'Whole Foods', location: 'Austin, TX', needs: { type: 'Organic Lettuce', quantity: 800, organic: true } },
  { id: 'B002', name: 'Tropicana', location: 'Bradenton, FL', needs: { type: 'Oranges', quantity: 4000, organic: false } },
  { id: 'B003', name: 'Cargill', location: 'Minnetonka, MN', needs: { type: 'Corn', quantity: 20000, organic: false } },
];

export const leads: Lead[] = [
  { id: 'L001', farmerId: 'F001', buyerId: 'B001', coordinatorId: 'C001', status: 'Negotiating', requestedDate: '2024-07-20' },
  { id: 'L002', farmerId: 'F002', buyerId: 'B002', coordinatorId: 'C001', status: 'Contacted', requestedDate: '2024-07-18' },
  { id: 'L003', farmerId: 'F003', buyerId: 'B003', coordinatorId: 'C001', status: 'New', requestedDate: '2024-07-22' },
  { id: 'L004', farmerId: 'F001', buyerId: 'B002', coordinatorId: 'C001', status: 'Closed', requestedDate: '2024-06-15' },
  { id: 'L005', farmerId: 'F002', buyerId: 'B003', coordinatorId: 'C001', status: 'Lost', requestedDate: '2024-06-10' },
];

export const farmerMatches = [
    {
        buyerId: 'B001',
        buyerName: 'Whole Foods',
        needs: 'Looking for 800kg of Organic Lettuce in Texas.',
        matchScore: 92,
    },
    {
        buyerId: 'B002',
        buyerName: 'Tropicana',
        needs: 'Sourcing 4000kg of Oranges from Florida.',
        matchScore: 85,
    },
    {
        buyerId: 'B003',
        buyerName: 'Cargill',
        needs: 'Requires 20,000kg of Corn from the Midwest.',
        matchScore: 78,
    }
]
