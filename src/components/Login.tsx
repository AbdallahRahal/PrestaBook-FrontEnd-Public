// src/components/Login.tsx
"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginWithEmailAndPassword, signInWithGoogle } from '../services/authService';
import Link from 'next/link';
import logo from '../images/logo.svg';
import googleIcon from '../images/google.png';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { isAuth, loading, login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!loading && isAuth) {
            console.log('replacing to dashboard from login')
            router.replace('/dashboard');
        }

    })

    const handleLogin = async () => {
        setError(null);
        try {
            await login(async () => { await loginWithEmailAndPassword(email, password) })

        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        try {
            await login(async () => { await signInWithGoogle() })
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
                    onClick={handleLogin}
                >
                    Se connecter
                </button>
                <button
                    className="w-full  mb-4 rounded-md border flex items-center justify-center h-10 hover:bg-transparent bg-gray-200"
                    onClick={handleGoogleSignIn}
                >
                    <Image src={googleIcon} alt='googleIcon' className='inline h-6 w-6 mr-2 ml-auto' />
                    <p className='mr-auto'>Continuer avec Google</p>
                </button>
                <p className="text-center">
                    Vous n'avez pas de compte ?{' '}
                    <Link href="/register" className="text-PRIMARY">
                        S'inscrire
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

