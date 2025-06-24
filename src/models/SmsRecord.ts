// smsModel.ts
export interface SmsRecord {
    id: string;            // L'identifiant unique du code (le code lui-même ou un UUID)
    companyId: string;     // L'ID de la company liée
    phoneNumber: string;   // Le numéro du client
    sentAt: Date;          // La date d'envoi
    status: string;        // Statut de l'envoi (par exemple "sent", "delivered")
    code: string;          // Le code unique généré
}
