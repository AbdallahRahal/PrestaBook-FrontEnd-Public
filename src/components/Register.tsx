// src/components/Register.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerWithEmailAndPassword, signInWithGoogle } from '../services/authService';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../images/logo.svg';
import googleIcon from '../images/google.png';
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async () => {
        setError(null);
        try {
            const user = await registerWithEmailAndPassword(email, password);
            router.push('/dashboard');
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        try {
            const user = await signInWithGoogle();
            router.push('/dashboard');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen mx-auto">
            <div className="w-full max-w-xs">
                <Image className='h-[150px] mb-12' src={logo} alt='logoPrestaBook' />

                {error && <div className="text-red-500 mb-4">{error}</div>}
                <input
                    type="email"
                    className="mb-4 w-full p-2 border"
                    placeholder="Email"
                    name='email'
                    autoComplete='on'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="mb-4 w-full p-2 border"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="mt-2 mb-3 py-2 w-full rounded-md border-gray-700 bg-PRIMARY text-white  "
                    onClick={handleRegister}
                >
                    S'inscrire
                </button>

                <button
                    className="w-full  mb-4 rounded-md border flex items-center justify-center h-10 hover:bg-transparent bg-gray-200"
                    onClick={handleGoogleSignIn}
                >
                    <Image src={googleIcon} alt='googleIcon' className='inline h-6 w-6 mr-2 ml-auto' />
                    <p className='mr-auto'>S'inscrire avec Google</p>
                </button>

                <p className="text-center ">
                    Déja inscrit ?{' '}
                    <Link href="/login" className="text-PRIMARY">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
