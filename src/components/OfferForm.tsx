import React, { useState, useEffect } from 'react';
import Offer from '@/models/Offer';
import ErrorObject from '@/models/Error';

interface OfferFormProps {
    initialData?: Offer;
    onSubmit: (data: Offer) => Promise<void>;
    fieldErrorsProps?: ErrorObject[]
}

const OfferForm: React.FC<OfferFormProps> = ({ initialData, onSubmit, fieldErrorsProps }) => {
    const [fieldErrors, setFieldErrors] = useState<ErrorObject[] | undefined>(fieldErrorsProps);
    const [offer, setOffer] = useState<Offer>(
        initialData || {
            name: '',
            description: '',
            price: 0,
            duration: 0,
            preBreakDuration: 0,
            postBreakDuration: 0,
            disabled: false,
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let newfieldErrors = fieldErrors?.filter(error => error.field != e.target.name)
        setFieldErrors(newfieldErrors)
        setOffer({ ...offer, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(offer);
    }

    useEffect(() => {
        setFieldErrors(fieldErrorsProps)
    }, [fieldErrorsProps])

    const errorFieldClassname = (fieldName: string): string => {
        if (fieldErrors?.some((error) => error.field == fieldName))
            return ' border-red-500 border-1'
        return ''
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label>Nom de la Prestation</label>
                <input
                    type="text"
                    name="name"
                    value={offer.name}
                    onChange={handleChange}
                    className={("border border-gray-300 p-2 rounded-md w-full " + errorFieldClassname('name'))}
                    required
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    name="description"
                    value={offer.description}
                    onChange={handleChange}
                    className={("border border-gray-300 p-2 rounded-md w-full " + errorFieldClassname('description'))}
                />
            </div>
            <div>
                <label>Prix (€)</label>
                <input
                    type="number"
                    name="price"
                    value={offer.price}
                    onChange={handleChange}
                    className={("border border-gray-300 p-2 rounded-md w-full " + errorFieldClassname('price'))}
                    required
                />
            </div>
            <div>
                <label>Durée (minutes)</label>
                <input
                    type="number"
                    name="duration"
                    value={offer.duration}
                    onChange={handleChange}
                    className={("border border-gray-300 p-2 rounded-md w-full " + errorFieldClassname('duration'))}
                    required
                />
            </div>
            <div>
                <label>Pause avant la prestation (minutes)</label>
                <input
                    type="number"
                    name="preBreakDuration"
                    value={offer.preBreakDuration}
                    onChange={handleChange}
                    className={("border border-gray-300 p-2 rounded-md w-full " + errorFieldClassname('preBreakDuration'))}
                />
            </div>
            <div>
                <label>Pause après la prestation (minutes)</label>
                <input
                    type="number"
                    name="postBreakDuration"
                    value={offer.postBreakDuration}
                    onChange={handleChange}
                    className={("border border-gray-300 p-2 rounded-md w-full " + errorFieldClassname('postBreakDuration'))}
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                {initialData ? 'Modifier la Prestation' : 'Ajouter la Prestation'}
            </button>
        </form>
    );
};

export default OfferForm;
