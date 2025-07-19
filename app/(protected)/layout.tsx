'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/context/SessionContext';
import { Layout } from '../components/layouts/layout';
import axios from 'axios';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { session, setSession } = useSession();
    const router = useRouter();



    return <Layout>{children}</Layout>;
}
