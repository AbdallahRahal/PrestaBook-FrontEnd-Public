// src/components/Navbar.tsx
"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import logo from '../images/logo.svg';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { logout } = useAuth();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            logout()
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const linkClasses = (path: string) =>
        pathname === path
            ? '  font-bold border-b-2  border-gray-800'
            : ' hover:border-gray-400';

    return (
        <nav className="flex flex-row justify-between w-full h-24 px-6  shadow-md bg-white">
            <Link href="/dashboard" >
                <Image className='h-full w-fit py-2' src={logo} alt='logoPrestaBook' />
            </Link>
            <div className="flex flex-row  mx-auto mt-auto space-x-14">
                <Link href="/dashboard" className={`${linkClasses('/dashboard')} hover:border-b-2 text-gray-900 px-3 py-2 text-sm font-medium`}>
                    Tableau de bord
                </Link>
                <Link href="/offer" className={`${linkClasses('/offer')} hover:border-b-2 text-gray-900 px-3 py-2 text-sm font-medium`}>
                    Prestations
                </Link>
                <Link href="/requestRating" className={`${linkClasses('/requestRating')} hover:border-b-2 text-gray-900 px-3 py-2 text-sm font-medium`}>
                    Demander un avis
                </Link>
                <Link href="/company" className={`${linkClasses('/company')} text-gray-900 hover:border-b-2 px-3 py-2 text-sm font-medium`}>
                    Mon compte
                </Link>
            </div>
            <div className='my-auto'>
                <button
                    onClick={handleLogout}
                    className="w-full  border border-black hover:bg-black hover:opacity-100 hover:text-white px-3 py-2 text-sm font-medium rounded-md hover:shadow-2xl shadow-black"
                >
                    Déconnexion
                </button>
            </div>

        </nav >
    );
};

export default Navbar;
