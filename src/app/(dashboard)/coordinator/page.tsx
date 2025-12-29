import CoordinatorLeadManager from '@/components/coordinator-lead-manager';

export default function CoordinatorPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Lead Management</h1>
        <p className="text-muted-foreground">Manage and track all leads in the system.</p>
      </header>
      <CoordinatorLeadManager />
    </div>
  );
}
