// src/services/userService.ts
import { auth } from '@/config/firebaseConfig';
import Company, { CompanyStats } from '@/models/Company';
import { errorMessagesFR } from '@/utils/errorMessage';
import { toast } from 'react-toastify';


export const isCompanyInfoComplete = async (): Promise<boolean> => {
    const token = await auth.currentUser?.getIdToken(true)
    console.log('token on in company : ', token)
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/provider/company/valid'

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    const status = response.status

    if (status == 200) return true
    return false
};

export const getCompany = async (): Promise<Company | null> => {
    const token = await auth.currentUser?.getIdToken(true)
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/provider/company'



    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) return null

    const data: Company = await response.json() as unknown as Company
    return data
};

export const getCompanyStatsById = async (companyId: string): Promise<CompanyStats | null> => {
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/public/company/' + companyId + '/stats'

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) return null

    const data: CompanyStats = await response.json()
    return data
};
export const getCompanyStats = async (): Promise<CompanyStats | null> => {
    const token = await auth.currentUser?.getIdToken(true)
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/provider/company/stats'

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) return null

    const data: CompanyStats = await response.json()
    return data
};
export const getCompanyById = async (companyId: string): Promise<Company | null> => {
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/public/company/' + companyId

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data: Company = await response.json() as unknown as Company
    return data
};


export const postCompany = async (data: Company): Promise<Company | null> => {
    const token = await auth.currentUser?.getIdToken(true)
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/provider/company'

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
        const responseData: Company = await response.json() as unknown as Company
        return responseData
    }
    const error = await response.json()
    toast.error(errorMessagesFR[error.error] || error.error || error.message || 'Une erreur est survenu')
    return null

};
