'use client';

import { useSession } from '@/context/SessionContext';
import { Layout } from '../components/layouts/layout';
import Loading from '@/components/common/loading';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { loading } = useSession();
    return !loading ? <Layout>{children}</Layout> : <Loading />;
}
