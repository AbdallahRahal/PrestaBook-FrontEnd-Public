export default interface Rating {
    id: string;
    companyId: string;
    firstName?: string;
    lastName?: string;
    phoneNumber: string;
    rating: number;
    comment: string;
    date: string;
    requestDate: number;
    status: 'pending' | 'completed';
    submitDate: number;
}


export interface SubmitRatingProps {
    code: string;
    firstName?: string;
    lastName?: string;
    rating: number;
    comment?: string;
}
