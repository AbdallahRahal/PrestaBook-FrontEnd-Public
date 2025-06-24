export function formatPhoneNumber(phoneNumber: string): string {
    if (!/^\d{10}$/.test(phoneNumber)) {
        return phoneNumber
    }
    return phoneNumber.replace(/(\d{2})(?=\d)/g, '$1 ');
}