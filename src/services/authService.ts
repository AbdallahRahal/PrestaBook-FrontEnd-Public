
import { collection, getDoc, setDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, User as FirebaseUser } from 'firebase/auth';
import { auth, db } from '@/config/firebaseConfig';
import { getErrorMessage } from '@/utils/firebaseErrors';

export const verifyToken = async (): Promise<boolean> => {
    const token = await auth.currentUser?.getIdToken(true)

    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/auth/verifyToken'

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    const status = response.status

    if (status == 200) return true
    return false
};
export const signInWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
        const userCredential = await signInWithPopup(auth, provider);

    } catch (error: any) {
        console.error('Error signing in with Google:', error);
        throw new Error(getErrorMessage(error.code));
    }
};

export const registerWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
        console.error('Error registering with email and password:', error);
        throw new Error(getErrorMessage(error.code));
    }
};

export const loginWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
        console.error('Error logging in with email and password:', error);
        throw new Error(getErrorMessage(error.code));
    }
};
