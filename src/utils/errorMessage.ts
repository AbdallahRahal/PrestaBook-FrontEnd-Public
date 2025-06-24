export const errorMessagesFR: { [key: string]: string } = {
    // Erreurs générales pour ID
    'id is required': 'L\'ID est requis.',
    'id cannot be empty': 'L\'ID ne peut pas être vide.',

    // Erreurs spécifiques à companyId
    'companyId is required': 'L\'ID de la société est requis.',
    'companyId cannot be empty': 'L\'ID de la société ne peut pas être vide.',

    // Champs généraux
    'disabled is required': 'Le champ "disabled" est requis.',

    // Erreurs liées au nom
    'name is required': 'Le nom est requis.',
    'name cannot be empty': 'Le nom ne peut pas être vide.',

    // Erreurs liées à la description
    'description is required': 'La description est requise.',
    'description cannot be empty': 'La description ne peut pas être vide.',

    // Adresse
    'address is required': 'L\'adresse est requise.',
    'address cannot be empty': 'L\'adresse ne peut pas être vide.',

    // Ville
    'city is required': 'La ville est requise.',
    'city cannot be empty': 'La ville ne peut pas être vide.',

    // Code postal
    'postalCode is required': 'Le code postal est requis.',
    'postalCode cannot be empty': 'Le code postal ne peut pas être vide.',

    // Pays
    'country is required': 'Le pays est requis.',
    'country cannot be empty': 'Le pays ne peut pas être vide.',

    // Téléphone
    'phone is required': 'Le numéro de téléphone est requis.',
    'phone cannot be empty': 'Le numéro de téléphone ne peut pas être vide.',

    // Email
    'email is required': 'L\'email est requis.',
    'email cannot be empty': 'L\'email ne peut pas être vide.',
    'email must be a valid email address': 'L\'email doit être une adresse valide.',

    // URLs pour coverUrl, logoUrl, imageUrls
    'coverUrl must be a valid URL': 'L\'URL de couverture doit être valide.',
    'logoUrl must be a valid URL': 'L\'URL du logo doit être valide.',
    'imageUrls must be a valid URL': 'Les URLs d\'images doivent être valides.',

    // Réseaux sociaux
    'tiktokLink must be a valid URL': 'Le lien TikTok doit être un URL valide.',
    'instagramLink must be a valid URL': 'Le lien Instagram doit être un URL valide.',
    'facebookLink must be a valid URL': 'Le lien Facebook doit être un URL valide.',

    // Évaluation
    'phoneNumber is required': 'Le numéro de téléphone est requis.',
    'phoneNumber cannot be empty': 'Le numéro de téléphone ne peut pas être vide.',

    'rating must be a number': 'La note doit être un nombre.',
    'rating must be at least 1': 'La note doit être au minimum 1.',
    'rating must be at most 5': 'La note doit être au maximum 5.',

    // Commentaire
    'comment must be a string': 'Le commentaire doit être une chaîne de caractères.',

    // Dates (UNIX timestamp)
    'requestDate is required': 'La date de requête est requise.',
    'requestDate must be a valid UNIX timestamp': 'La date de requête doit être un timestamp UNIX valide.',
    'requestDate must be an integer representing a UNIX timestamp': 'La date de requête doit être un entier représentant un timestamp UNIX.',

    'submitDate must be a valid UNIX timestamp': 'La date de soumission doit être un timestamp UNIX valide.',
    'submitDate must be an integer representing a UNIX timestamp': 'La date de soumission doit être un entier représentant un timestamp UNIX.',

    // Statut
    'status is required': 'Le statut est requis.',
    'status cannot be empty': 'Le statut ne peut pas être vide.',
    'status must be either pending or completed': 'Le statut doit être "pending" ou "completed".',
    'Failed to send SMS': 'Impossible d\'envoyer un SMS à ce numéro',
    'Rating already completed': 'Note déja envoyé',
    'Rating submitted successfully': 'Note envoyer avec succés',
};
