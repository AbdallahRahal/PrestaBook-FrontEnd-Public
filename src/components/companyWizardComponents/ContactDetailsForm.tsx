// src/components/ContactDetailsForm.tsx
import Company from '@/models/Company';
import { useState } from 'react';

interface ContactDetailsFormProps {
    data: Partial<Company>;
    onNext: (data: { phone: string, tiktokLink: string, instagramLink: string, facebookLink: string }) => void;
    onPrevious: () => void;
}

export default function ContactDetailsForm({ data, onNext, onPrevious }: ContactDetailsFormProps) {
    const [phone, setPhone] = useState(data.phone || '');
    const [errors, setErrors] = useState({} as Record<string, string>);
    const [tiktokLink, settiktokLink] = useState(data.tiktokLink || '')
    const [instagramLink, setinstagramLink] = useState(data.instagramLink || '')
    const [facebookLink, setfacebookLink] = useState(data.facebookLink || '')


    const validatePhone = (phone: string) => {
        const re = /^[\d\-\+\s\(\)]+$/;  // Allows digits, spaces, dashes, pluses, and parentheses
        return re.test(phone);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};
        if (!phone.trim()) {
            newErrors.phone = 'Le téléphone est requis';
        } else if (!validatePhone(phone)) {
            newErrors.phone = 'Le numéro de téléphone est invalide';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            onNext({
                phone, tiktokLink,
                instagramLink,
                facebookLink
            });
        }
    };

    return (
        <div className="mx-4">
            <h2 className="text-xl font-bold mb-4">Détails du contact</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Téléphone<span className='text-red-500'>*</span></label>
                    <input
                        className="w-full p-2 border rounded"
                        placeholder="Téléphone"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">TikTok</label>
                    <input
                        className="w-full p-2 border rounded"
                        placeholder="TikTok"
                        name='TikTok'
                        autoComplete='on'
                        value={tiktokLink}
                        onChange={(e) => settiktokLink(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div> <div>
                    <label className="block text-sm font-medium text-gray-700">Instagram</label>
                    <input
                        className="w-full p-2 border rounded"
                        placeholder="Instagram"
                        name='Instagram'
                        autoComplete='on'
                        value={instagramLink}
                        onChange={(e) => setinstagramLink(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div> <div>
                    <label className="block text-sm font-medium text-gray-700">Facebook</label>
                    <input
                        className="w-full p-2 border rounded"
                        placeholder="Facebook"
                        name='Facebook'
                        autoComplete='on'
                        value={facebookLink}
                        onChange={(e) => setfacebookLink(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>



                <div className="flex justify-between ">
                    <button type="button" onClick={onPrevious} className="border border-gray-500 hover:bg-gray-800 hover:text-white py-2 px-4 rounded">Retour</button>
                    <button type="submit" className=" py-2 px-3 rounded text-white bg-orange-500 border border-orange-500 rounded  ">Suivant</button>
                </div>
            </form>
        </div>
    );
}
