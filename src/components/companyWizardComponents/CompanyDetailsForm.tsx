// src/components/CompanyDetailsForm.tsx
import Company from '@/models/Company';
import { useState } from 'react';

interface CompanyDetailsFormProps {
    data: Partial<Company>;
    onNext: (data: { name: string, description: string }) => void;
}

export default function CompanyDetailsForm({ data, onNext }: CompanyDetailsFormProps) {
    const [name, setName] = useState(data.name || '');
    const [description, setDescription] = useState(data.description || '');
    const [errors, setErrors] = useState({} as Record<string, string>);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('1')
        const newErrors: Record<string, string> = {};
        if (!name.trim()) newErrors.name = 'Le nom est requis';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            onNext({ name, description: 'empty' });
        }
    };

    return (
        <div className="mx-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nom de votre établissement<span className='text-red-500'>*</span></label>
                    <input
                        className="w-full p-2 border rounded"
                        placeholder="Nom de votre établissement"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <button type="submit" className="w-full bg-orange-400 text-white py-2 rounded">Suivant</button>
            </form>
        </div>
    );
}
