// src/components/GuestRoute.tsx
"use client";

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const GuestRoute = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    if (user) {
        return null; // Optionally, return a loading indicator here
    }

    return <>{children}</>;
};

export default GuestRoute;
