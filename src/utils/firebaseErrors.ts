// src/utils/firebaseErrors.ts

export const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return "L'adresse e-mail est déjà utilisée par un autre compte.";
        case 'auth/invalid-email':
            return "L'adresse e-mail n'est pas valide.";
        case 'auth/user-disabled':
            return "L'utilisateur associé à cette adresse e-mail a été désactivé.";
        case 'auth/user-not-found':
            return "Aucun utilisateur trouvé avec cette adresse e-mail.";
        case 'auth/wrong-password':
            return "Le mot de passe est incorrect.";
        case 'auth/weak-password':
            return "Le mot de passe est trop faible.";
        case 'auth/invalid-credential':
            return "Les informations de connexions ne sont pas valides.";
        default:
            return "Une erreur est survenue. Veuillez réessayer.";
    }
};
