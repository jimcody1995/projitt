'use client';

import { ReactNode } from 'react';
import { useSession } from '@/context/SessionContext';
import Loading from '@/components/common/loading';

export default function Layout({ children }: { children: ReactNode }) {
  const { loading } = useSession();
  return (
    !loading ? <div className="w-[100vw] h-[100vh] bg-[#fafafa] relative overflow-y-auto overflow-x-hidden">
      {children}
    </div> : <Loading />
  );
}
