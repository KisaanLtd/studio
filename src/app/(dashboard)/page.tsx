'use client';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && userRole) {
      router.replace(`/${userRole}`);
    } else if (!loading && !userRole) {
      router.replace('/login');
    }
  }, [userRole, loading, router]);
  
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
