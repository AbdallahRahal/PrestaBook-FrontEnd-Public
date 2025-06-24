// src/services/userService.ts
import { auth } from '@/config/firebaseConfig';
import Rating from '@/models/Rating';
import { errorMessagesFR } from '@/utils/errorMessage';
import { toast } from 'react-toastify';




export const getRating = async (): Promise<Rating[] | null> => {
    const token = await auth.currentUser?.getIdToken(true)
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/provider/rating'

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    const data: Rating[] = await response.json()
    return data
}
export const getRatingByCompanyId = async (companyId: string): Promise<Rating[] | null> => {
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/public/company/' + companyId + '/rating'

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data: Rating[] = await response.json()
    return data
}

export const getRatingById = async (ratingId: string): Promise<Rating | null> => {
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/public/rating/' + ratingId

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data: Rating = await response.json() as unknown as Rating
    return data
}
export const sendRatingSms = async (data: any) => {
    const token = await auth.currentUser?.getIdToken(true)
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/provider/rating/send'

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const status = response.status

    if (status == 200) {
        return response
    }
    const error = await response.json()
    toast.error(errorMessagesFR[error.error] || error.error || error.message || 'Une erreur est survenu')
    return null

};


export const submitRating = async (data: any) => {
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/public/rating/submit'

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const status = response.status

    if (status == 200) {
        const res = await response.json()
        return res
    }
    const error = await response.json()
    toast.error(errorMessagesFR[error.error] || error.error || error.message || 'Une erreur est survenu')
    return null
};