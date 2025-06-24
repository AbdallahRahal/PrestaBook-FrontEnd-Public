export interface Offer {
    id: string;
    companyId: string;
    disabled: boolean;
    name: string;
    description: string;
    price: number;
    duration: number; // Durée en minutes
    breakBefore: number; // Pause avant la prestation en minutes
    breakAfter: number; // Pause après la prestation en minutes
}