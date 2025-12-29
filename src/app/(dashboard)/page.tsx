import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // Redirect to the buyer dashboard by default
  redirect('/buyer');
}
