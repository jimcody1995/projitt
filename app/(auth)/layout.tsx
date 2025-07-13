'use client';

import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#fafafa] relative overflow-y-auto overflow-x-hidden">{children}</div>
  );
}
