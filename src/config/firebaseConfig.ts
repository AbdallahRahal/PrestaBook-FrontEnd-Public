// src/firebaseConfig.ts
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Définissez les variables d'environnement pour chaque environnement
const devConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_DEV,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_DEV,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_DEV,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_DEV,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_DEV,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_DEV,
};

const prodConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_PROD,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_PROD,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_PROD,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_PROD,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_PROD,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_PROD,
};

// Sélectionnez la configuration en fonction de l'environnement
const firebaseConfig = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

const app = () => {
    if (!getApps().length)
        return initializeApp(firebaseConfig)

    return getApp()
}


const auth = getAuth(app());
const db = getFirestore(app());
const storage = getStorage(app());

export { auth, db, storage };
