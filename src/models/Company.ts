export default interface Company {
    id: string;
    disabled: boolean;
    description: string
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    email: string;
    coverUrl?: string;
    logoUrl?: string;
    imageUrls?: string[];
    tiktokLink?: string;
    instagramLink?: string;
    facebookLink?: string;
    subscriptionEndDate?: number
    subscriptionActive: boolean

}
export interface CompanyStats {
    globalRating: number;
    ratingCount: number;
}