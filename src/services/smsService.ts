// src/services/userService.ts
import { SmsRecord } from '@/models/SmsRecord';
import { errorMessagesFR } from '@/utils/errorMessage';
import { toast } from 'react-toastify';


export const getSmsRecordById = async (smsRecordId: string): Promise<SmsRecord | null> => {
    const url = 'http://' + process.env.NEXT_PUBLIC_BACKEND + '/api/public/sms/' + smsRecordId

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const status = response.status

    if (status == 200) {
        const data: SmsRecord = await response.json() as unknown as SmsRecord

        return data
    }
    const error = await response.json()
    toast.error(errorMessagesFR[error.error] || error.error || error.message || 'Une erreur est survenu')
    return null
}
