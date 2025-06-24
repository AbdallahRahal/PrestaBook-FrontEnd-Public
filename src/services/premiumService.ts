import { auth } from '@/config/firebaseConfig';
import { errorMessagesFR } from '@/utils/errorMessage';
import { toast } from 'react-toastify';


export const subscribePremium = async () => {
    const token = await auth.currentUser?.getIdToken(true)
    const res = await fetch('http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/stripe/createCheckoutSession', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (res.status == 200) {
        const { url } = await res.json();
        return url
    }
    const error = await res.json()
    toast.error(errorMessagesFR[error.error] || error.error || error.message || 'Une erreur est survenu')
    return null
}

export const cancelSubscription = async () => {
    const token = await auth.currentUser?.getIdToken(true)
    const res = await fetch('http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/stripe/cancelSubscription', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (res.status == 200) {
        const { url } = await res.json();
        return url
    }
    const error = await res.json()
    toast.error(errorMessagesFR[error.error] || error.error || error.message || 'Une erreur est survenu')
    return null
}

export const checkSession = async (CHECKOUT_SESSION_ID: string) => {
    const token = await auth.currentUser?.getIdToken(true)
    const res = await fetch('http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/stripe/verifyCheckoutSession/' + CHECKOUT_SESSION_ID, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (res.status == 200) {
        toast.success('Passage à PrestaBook Premium réussi')
    }
    if (res.status == 400) {
        toast.error('Le paiement à échoué. Vous n\'avez pas été débitté')
    }
    return null
}