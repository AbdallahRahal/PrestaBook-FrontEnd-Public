"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import { verifyToken } from '@/services/authService';
import { isCompanyInfoComplete } from '@/services/companyService';
import WaitingScreen from '@/components/WaitingScreen';
import wait from '@/utils/wait';
import { useRouter } from 'next/navigation';

interface AuthContextProps {
    isAuth: boolean;
    loading: boolean;
    infoComplete: boolean;
    login: Function;
    logout: Function;
}

const AuthContext = createContext<AuthContextProps>({ isAuth: false, infoComplete: false, loading: true, login: async () => { }, logout: () => { } });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [infoComplete, setInfoComplete] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {

        const checkInitialAuthState = async () => {
            const startTime = Date.now();
            setLoading(true);

            try {
                await setPersistence(auth, browserLocalPersistence);
            } catch (error) {
                console.error('Failed to set persistence:', error);
            }

            const currentUser = auth.currentUser;

            if (currentUser) {
                // Si l'utilisateur est déjà authentifié, récupérer les infos
                const isComplete = await isCompanyInfoComplete();
                setInfoComplete(isComplete);
                setIsAuth(true);
            } else {
                // Mettre en place l'écouteur onAuthStateChanged
                const unsubscribe = onAuthStateChanged(auth, async (user) => {
                    setLoading(true);
                    if (user) {
                        const isComplete = await isCompanyInfoComplete();
                        setInfoComplete(isComplete);
                        setIsAuth(true);
                    } else {
                        setIsAuth(false);
                        setInfoComplete(false);
                    }
                    setLoading(false);
                });

                return () => unsubscribe();
            }
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(1200 - elapsedTime, 0); // Calculer le temps restant pour atteindre 3 secondes
            await wait(remainingTime)
            setLoading(false);

        };

        checkInitialAuthState();
    }, []);

    const logout = async () => {
        console.log('trying to disconnect')
        setLoading(true);
        await auth.signOut(); // Déconnexion de Firebase
        setIsAuth(false); // Mise à jour immédiate de l'état d'authentification
        setInfoComplete(false);
        setLoading(false);

    };

    const login = async (loginFunction: Function) => {
        setLoading(true);
        try {
            await loginFunction()
            const isComplete = await isCompanyInfoComplete();
            setInfoComplete(isComplete);
            setIsAuth(true);
        } catch (error) {
            console.error('Error logging in:', error);
            setIsAuth(false);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <WaitingScreen />
    }

    return (
        <AuthContext.Provider value={{ isAuth, infoComplete, loading, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
