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
    useEffect(() => {
        const stored = localStorage.getItem("session")
        if (stored) {
            setSession({ token: stored, authenticated: true })
        }
        if (session && session.authenticated === false) {
            router.push('/signin');
        }
    }, [])

    return <Layout>{children}</Layout>;
}
