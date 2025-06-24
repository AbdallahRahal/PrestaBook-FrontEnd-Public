"use client";
import ProtectedRoute from '../../components/ProtectedRoute';
import React, { useEffect, useState } from 'react';
import { getAllOffersForProvider, createOffer, updateOffer, deleteOffer } from '@/services/offerService';
import { Offer } from '@/models/Offer';
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { PencilIcon, TrashIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

export default function OffersPage() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [offersLoading, setOffersLoading] = useState<Boolean>(true);

    // State for creating a new offer
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [breakBefore, setBreakBefore] = useState<number>(0);
    const [breakAfter, setBreakAfter] = useState<number>(0);
    const [disabled, setDisabled] = useState<boolean>(false);

    // State for modals
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [currentOffer, setCurrentOffer] = useState<Offer | null>(null);

    const fetchOffers = async () => {
        setOffersLoading(true);
        const res = await getAllOffersForProvider();
        if (res) setOffers(res);
        setOffersLoading(false);
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    const handleEditOffer = (offer: Offer) => {
        setCurrentOffer(offer);
        setName(offer.name);
        setDescription(offer.description);
        setPrice(offer.price);
        setDuration(offer.duration);
        setBreakBefore(offer.breakBefore);
        setBreakAfter(offer.breakAfter);
        setDisabled(offer.disabled);
        setIsEditModalOpen(true);
    };
    const resetFrom = () => {
        setName('');
        setDescription('');
        setPrice(0);
        setDuration(0);
        setBreakBefore(0);
        setBreakAfter(0);
    }
    const handleCreateOffer = async () => {
        if (
            name.length < 1 ||
            description.length < 1 ||
            price <= 0 ||
            duration < 1
        ) {
            toast.error('Veuillez renseigner tous les champs avec des valeurs valides. La durée doit être d\'au moins 1 minute.');
        } else {
            const res = await createOffer({
                disabled: false,
                name,
                description,
                price,
                duration,
                breakBefore,
                breakAfter,
            });

            if (res) {
                toast.success('Prestation créée avec succès');
                // Réinitialisation des champs
                resetFrom()
                fetchOffers(); // Re-fetch offers to update the list
            }
        }
    };
    const handleUpdateOffer = async () => {
        if (
            name.length < 1 ||
            description.length < 1 ||
            price <= 0 ||
            duration < 1
        ) {
            toast.error('Veuillez renseigner tous les champs avec des valeurs valides. La durée doit être d\'au moins 1 minute.');
        } else {
            if (currentOffer) {
                const res = await updateOffer(currentOffer.id, {
                    name,
                    description,
                    price,
                    duration,
                    breakBefore,
                    breakAfter,
                    disabled,
                });

                if (res) {
                    toast.success('Prestation modifiée avec succès');
                    setIsEditModalOpen(false);
                    resetFrom()
                    fetchOffers();
                }
            }
        }
    };

    const handleDuplicateOffer = async (offer: Offer) => {
        const res = await createOffer({
            name: `${offer.name} (copie)`,
            description: offer.description,
            price: offer.price,
            duration: offer.duration,
            breakBefore: offer.breakBefore,
            breakAfter: offer.breakAfter,
            disabled: offer.disabled,
        });

        if (res) {
            toast.success('Prestation dupliquée avec succès');
            fetchOffers();
        }
    };

    const handleDeleteOffer = (offer: Offer) => {
        setCurrentOffer(offer);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteOffer = async () => {
        if (currentOffer) {
            const res = await deleteOffer(currentOffer.id);
            if (res) {
                toast.success('Prestation supprimée avec succès');
                fetchOffers();
            } else {
                toast.error('Erreur lors de la suppression de la prestation');
            }
            setIsDeleteModalOpen(false);
        }
    };

    const renderOffersAsCards = () => {
        if (offersLoading) {
            return (
                <div className="flex justify-center items-center py-20">
                    <TailSpin
                        visible={true}
                        height="80"
                        width="80"
                        color="#0d2d45"
                        ariaLabel="tail-spin-loading"
                        radius="0"
                    />
                </div>
            );
        }

        if (offers.length === 0) {
            return <p className="text-center text-gray-500">Aucune Prestation disponible pour le moment.</p>;
        }

        return (
            <div className="space-y-6">
                {offers.map((offer) => (
                    <div
                        key={offer.id}
                        className="relative bg-white border rounded-lg shadow-md p-6 transition-transform transform hover:border-gray-400 hover:shadow-lg"
                    >
                        <div className="absolute top-2 left-6 flex space-x-2 text-xs">
                            {offer.disabled ? <div className='text-red-500'>Inactive</div> : <div className='text-green-500'>Active</div>}
                        </div>
                        <div className="absolute top-3 right-3 flex space-x-2">

                            <div className="relative group">
                                <PencilIcon
                                    className="w-5 h-5 text-blue-500 cursor-pointer"
                                    onClick={() => handleEditOffer(offer)}
                                />
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max p-2 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    Modifier la Prestation
                                </div>
                            </div>

                            <div className="relative group">
                                <DocumentDuplicateIcon
                                    className="w-5 h-5 text-gray-500 cursor-pointer"
                                    onClick={() => handleDuplicateOffer(offer)}
                                />
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max p-2 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    Dupliquer la Prestation
                                </div>
                            </div>
                            <div className="relative group">
                                <TrashIcon
                                    className="w-5 h-5 text-red-500 cursor-pointer"
                                    onClick={() => handleDeleteOffer(offer)}
                                />
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max p-2 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    Supprimer la Prestation
                                </div>
                            </div>
                        </div>
                        <h2 className="text-xl font-bold mb-2">{offer.name}</h2>
                        <p className="text-gray-600 mb-2 ml-2">{offer.description}</p>
                        <div className="mb-2 items-center text-gray-700 ml-2">
                            <p className="text-sm">Pause avant: {offer.breakBefore} min</p>
                            <p className="text-sm">Pause après: {offer.breakAfter} min</p>
                        </div>
                        <div className="flex justify-between items-center ">
                            <p className="text-gray-800 font-semibold">Prix: {offer.price} €</p>
                            <p className="text-gray-800 font-semibold">Durée: {offer.duration} min</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <ProtectedRoute>
            <div className="flex flex-row h-screen mx-8 mt-4 gap-16">
                {/* Column for the list of offers */}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-6">Vos Prestations</h1>
                    {renderOffersAsCards()}
                </div>

                {/* Modal for editing an offer */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                            <h2 className="text-xl font-bold mb-4">Modifier la prestation</h2>
                            {/* Form fields similar to create offer */}
                            <p className='text-lg mb-1'>Nom de la prestation</p>
                            <input
                                className='w-full px-4 py-1 border-gray-500 border rounded-md mb-4'
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nom de la prestation"
                            />                        <p className='text-lg mb-1'>Description</p>
                            <textarea
                                className='w-full px-4 py-1 border-gray-500 border rounded-md mb-4 h-[100px]'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                            />                        <p className='text-lg mb-1'>Prix (€)</p>
                            <input
                                className='w-full px-4 py-1 border-gray-500 border rounded-md mb-4'
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                placeholder="Prix (€)"
                            />                        <p className='text-lg mb-1'>Durée (minutes)</p>
                            <input
                                className='w-full px-4 py-1 border-gray-500 border rounded-md mb-4'
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                                placeholder="Durée (minutes)"
                            />                        <p className='text-lg mb-1'>Pause avant (minutes)</p>
                            <input
                                className='w-full px-4 py-1 border-gray-500 border rounded-md mb-4'
                                type="number"
                                value={breakBefore}
                                onChange={(e) => setBreakBefore(Number(e.target.value))}
                                placeholder="Pause avant (minutes)"
                            />                        <p className='text-lg mb-1'>Pause après (minutes)</p>
                            <input
                                className='w-full px-4 py-1 border-gray-500 border rounded-md mb-4'
                                type="number"
                                value={breakAfter}
                                onChange={(e) => setBreakAfter(Number(e.target.value))}
                                placeholder="Pause après (minutes)"
                            />
                            <div className="flex items-center mb">
                                <label
                                    className={`mr-4 font-semibold ${disabled ? 'text-gray-600' : 'text-gray-400'}`}
                                >
                                    Inactive
                                </label>
                                <button
                                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${!disabled ? 'bg-blue-500' : 'bg-gray-300'
                                        }`}
                                    onClick={() => setDisabled(!disabled)}
                                >
                                    <span
                                        className={`transform transition-transform duration-200 ease-in-out inline-block w-4 h-4 bg-white rounded-full ${!disabled ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                                <label
                                    className={`ml-4 font-semibold ${!disabled ? 'text-blue-600' : 'text-gray-400'}`}
                                >
                                    Active
                                </label>
                            </div>
                            <p className="text-xs italic text-gray-500">
                                Une prestation inactive ne pourra pas être réservée par vos clients.
                            </p>

                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-150"
                                    onClick={() => setIsEditModalOpen(false)}
                                >
                                    Annuler
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150"
                                    onClick={handleUpdateOffer}
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal for confirming deletion */}
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                            <h2 className="text-xl font-bold mb-4">Confirmer la Suppression</h2>
                            <p>Êtes-vous sûr de vouloir supprimer cette prestation ?</p>
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-150"
                                    onClick={() => setIsDeleteModalOpen(false)}
                                >
                                    Annuler
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-150"
                                    onClick={confirmDeleteOffer}
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Column for creating a new offer */}
                <div className="w-1/3">
                    <h1 className="text-2xl font-bold mb-6 text-center">Créer une Prestation</h1>
                    <div className="bg-white border rounded-lg shadow-md p-6">
                        {/* Same form as before for creating an offer */}
                        <p className='text-lg mb-1'>Nom de la prestation</p>
                        <input
                            className='w-full px-4 py-1 border-gray-500 border rounded-md mb-4'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Entrez le nom de la prestation"
                        />
                        <p className='text-lg mb-1'>Description</p>
                        <textarea
                            className='w-full px-4 py-1 border-gray-500 border rounded-md mb-4 h-[100px]'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Entrez une description"
                        />
                        <p className='text-lg mb-1'>Prix (€)</p>
                        <input
                            className='w-full px-4 py-1 border-gray-500 border rounded-md mb-4'
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            placeholder="Entrez le prix"
                        />
                        <p className='text-lg mb-1'>Durée (minutes)</p>
                        <input
                            className='w-full px-4 py-1 border-gray-500 border rounded-md mb-4'
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            placeholder="Entrez la durée (min 1 minute)"
                        />
                        <p className='text-lg mb-1'>Pause avant (minutes)</p>
                        <input
                            className='w-full px-4 py-1 border-gray-500 border rounded-md mb-4'
                            type="number"
                            value={breakBefore}
                            onChange={(e) => setBreakBefore(Number(e.target.value))}
                            placeholder="Pause avant"
                        />
                        <p className='text-lg mb-1'>Pause après (minutes)</p>
                        <input
                            className='w-full px-4 py-1 border-gray-500 border rounded-md mb-4'
                            type="number"
                            value={breakAfter}
                            onChange={(e) => setBreakAfter(Number(e.target.value))}
                            placeholder="Pause après"
                        />
                        <button
                            className='w-full mt-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150'
                            onClick={handleCreateOffer}
                        >
                            Créer la prestation
                        </button>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
