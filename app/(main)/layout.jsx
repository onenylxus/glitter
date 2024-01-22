'use client'

import { redirect } from 'next/navigation';
import { useConvexAuth } from 'convex/react';
import Spinner from '@/components/spinner';

const MainLayout = ({ children }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex h-full justify-center items-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return redirect('/');
  }

  return (
    <div className="flex h-full">
      <main className="h-full flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
