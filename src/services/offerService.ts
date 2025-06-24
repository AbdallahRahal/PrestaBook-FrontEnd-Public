// src/services/offerService.ts
import { auth } from '@/config/firebaseConfig';
import { Offer } from '@/models/Offer';
import { toast } from 'react-toastify';
import { errorMessagesFR } from '@/utils/errorMessage';

// Récupérer toutes les offres (y compris les offres désactivées) pour le fournisseur connecté
export const getAllOffersForProvider = async (): Promise<Offer[] | null> => {
    const token = await auth.currentUser?.getIdToken(true);
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/provider/offers';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    const data: Offer[] = await response.json();
    return data;
}

// Récupérer une offre par son ID (pour le fournisseur connecté)
export const getOfferByIdForProvider = async (offerId: string): Promise<Offer | null> => {
    const token = await auth.currentUser?.getIdToken(true);
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/provider/offer/' + offerId;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    const data: Offer = await response.json() as unknown as Offer;
    return data;
}

// Créer une nouvelle offre
export const createOffer = async (data: any): Promise<Offer | null> => {
    const token = await auth.currentUser?.getIdToken(true);
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/provider/offer';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const status = response.status;
    if (status === 201) {
        const res = await response.json();
        return res;
    }
    const error = await response.json();
    toast.error(errorMessagesFR[error.error] || error.error || error.message || 'Une erreur est survenue');
    return null;
}

// Mettre à jour une offre par ID
export const updateOffer = async (offerId: string, data: any): Promise<Offer | null> => {
    const token = await auth.currentUser?.getIdToken(true);
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/provider/offer/' + offerId;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const status = response.status;
    if (status === 200) {
        const res = await response.json();
        return res;
    }
    const error = await response.json();
    toast.error(errorMessagesFR[error.error] || error.error || error.message || 'Une erreur est survenue');
    return null;
}

// Supprimer une offre par ID
export const deleteOffer = async (offerId: string): Promise<boolean> => {
    const token = await auth.currentUser?.getIdToken(true);
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/provider/offer/' + offerId;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    const status = response.status;
    if (status === 200) {
        return true;
    }
    const error = await response.json();
    toast.error(errorMessagesFR[error.error] || error.error || error.message || 'Une erreur est survenue');
    return false;
}

// Récupérer toutes les offres actives (côté public)
export const getActiveOffersByCompanyId = async (companyId: string): Promise<Offer[] | null> => {
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/public/company/' + companyId + '/offers';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data: Offer[] = await response.json();
    return data;
}
