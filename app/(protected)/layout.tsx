'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/context/SessionContext';
import { Layout } from '../components/layouts/layout';
import axios from 'axios';
import Loading from '@/components/common/loading';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { loading } = useSession();
    const router = useRouter();



    return !loading ? <Layout>{children}</Layout> : <Loading />;
}
