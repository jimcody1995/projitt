'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/context/SessionContext';
import { Layout } from '../components/layouts/layout';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session.authenticated === false) {
            router.push('/signin');
        }
    }, [session.authenticated]);

    // if (session.authenticated === false) {
    //     return <ScreenLoader />;
    // }

    return <Layout>{children}</Layout>;
}
