import React, { useState, useRef } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

interface AddressDetailsFormProps {
    data: {
        address?: string;
        city?: string;
        postalCode?: string;
        country?: string;
    };
    onNext: (data: { address: string; city: string; postalCode: string; country: string }) => void;
    onPrevious: () => void;
}

const libraries: ('places')[] = ['places'];
const apiKey = 'VOTRE_CLE_API_GOOGLE'; // Remplacez par votre propre clé API Google

export default function AddressDetailsForm({ data, onNext, onPrevious }: AddressDetailsFormProps) {
    const [address, setAddress] = useState(data.address || '');
    const [city, setCity] = useState(data.city || '');
    const [postalCode, setPostalCode] = useState(data.postalCode || '');
    const [country, setCountry] = useState(data.country || '');
    const [errors, setErrors] = useState({} as Record<string, string>);

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKey,
        libraries,
    });
    // Gestion du chargement de l'AutoComplete
    const handleLoad = (autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const handlePlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            const addressComponents = place.address_components;

            if (addressComponents) {
                // Extraire seulement les composants d'adresse de rue
                const streetNumber = addressComponents.find(component =>
                    component.types.includes('street_number')
                )?.long_name || '';

                const route = addressComponents.find(component =>
                    component.types.includes('route')
                )?.long_name || '';

                // Construire l'adresse de rue sans ville, code postal et pays
                const streetAddress = `${streetNumber} ${route}`.trim();
                setAddress(streetAddress);

                const cityComponent = addressComponents.find((component) =>
                    component.types.includes('locality')
                );
                const postalCodeComponent = addressComponents.find((component) =>
                    component.types.includes('postal_code')
                );
                const countryComponent = addressComponents.find((component) =>
                    component.types.includes('country')
                );

                setCity(cityComponent ? cityComponent.long_name : '');
                setPostalCode(postalCodeComponent ? postalCodeComponent.long_name : '');
                setCountry(countryComponent ? countryComponent.long_name : '');
            }
        }
    };

    // Fonction appelée en cas d'erreur de chargement du script Google Maps

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};
        if (!address.trim()) newErrors.address = "L'adresse est requise";
        if (!city.trim()) newErrors.city = 'La ville est requise';
        if (!postalCode.trim()) newErrors.postalCode = 'Le code postal est requis';
        if (!country.trim()) newErrors.country = 'Le pays est requis';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            onNext({ address, city, postalCode, country });
        }
    };

    return (
        <div className="mx-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Adresse<span className="text-red-500">*</span>
                    </label>
                    {isLoaded && !loadError ? (
                        <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
                            <input
                                className="w-full p-2 border rounded z-10"
                                placeholder="Adresse"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Autocomplete>
                    ) : (
                        // Champ de saisie manuel si le chargement de Google Maps échoue
                        <input
                            className="w-full p-2 border rounded"
                            placeholder="Entrez votre adresse"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    )}
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ville<span className="text-red-500">*</span></label>
                    <input
                        className="w-full p-2 border rounded"
                        placeholder="Ville"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Code Postal<span className="text-red-500">*</span></label>
                    <input
                        className="w-full p-2 border rounded"
                        placeholder="Code Postal"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                    {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Pays<span className="text-red-500">*</span></label>
                    <input
                        className="w-full p-2 border rounded"
                        placeholder="Pays"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                </div>
                <div className="flex justify-between">
                    <button type="button" onClick={onPrevious} className="border border-gray-500 hover:bg-gray-800 hover:text-white py-2 px-4 rounded">
                        Retour
                    </button>
                    <button type="submit" className="py-2 px-3 rounded text-white bg-orange-500 border border-orange-500 rounded">
                        Suivant
                    </button>
                </div>
            </form>
        </div>
    );
}
