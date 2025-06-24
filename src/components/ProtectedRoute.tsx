// src/components/ProtectedRoute.tsx
"use client";

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import { TailSpin } from 'react-loader-spinner'

interface ProtectedRouteProps {
    children: ReactNode;
    checkAuthOnly?: boolean;
}

const ProtectedRoute = ({ children, checkAuthOnly = false }: ProtectedRouteProps) => {
    const { isAuth, infoComplete, loading } = useAuth();
    const router = useRouter()

    useEffect(() => {
        if (!loading && !isAuth) {
            router.replace('/login');
        } else if (!loading && !infoComplete && !checkAuthOnly) {
            console.log('replacing company wizard')
            router.replace('/companyWizard');
        }
    }, [isAuth, loading, infoComplete]);

    return (
        loading ?
            <div className='flex flex-col w-full'>
                <Navbar />
                <div className='items-center w-full flex justify-center h-[100vh]'>
                    <TailSpin
                        visible={true}
                        height="50"
                        width="50"
                        color="#0d2d45"
                        ariaLabel="tail-spin-loading"
                        radius="0"
                        wrapperStyle={{ width: 'fit-content' }}
                        wrapperClass=""
                    />
                </div>
            </div>
            :
            <div className='flex flex-col w-full'>
                <Navbar />
                <div className='flex-1 px-10 pt-8 pb-4 '>
                    {children}
                </div>
            </div>
    );
};

export default ProtectedRoute;
