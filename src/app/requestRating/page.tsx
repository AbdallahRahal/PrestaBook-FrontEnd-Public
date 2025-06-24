// src/app/client/RequestRatingPage.tsx
"use client";
import ProtectedRoute from '../../components/ProtectedRoute';
import React, { useEffect, useState } from 'react'
import { sendRatingSms } from '@/services/ratingService';
import { toast } from 'react-toastify';

export default function RequestRatingPage() {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [message, setMessage] = useState<string>('');


    const handleSubmit = async () => {
        if (phoneNumber.length < 1 || message.length < 1) {
            toast.error('Veuillez renseigner tout les champs')
        }
        else {
            const res = await sendRatingSms({ phoneNumber, message });
            if (res && res.ok) {
                toast.success('Demande d\'avis envoyée.\n Retrouvez-la dans le tableau de bord.')
                setPhoneNumber('')
                setMessage('')
            }
        }
    };


    return (
        <ProtectedRoute>
            <div className='flex flex-col mt-4 px-10' >
                <h1 className="text-2xl font-bold text-center mt-2 mb-10" > Demander un avis </h1>
                <div className='mx-auto flex flex-col'>
                    <p className='text-lg mb-1 ' > Téléphone </p>
                    <input
                        className='px-4 py-1 border-gray-500 border rounded-md'
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)
                        } // Capture de l'input
                        placeholder="Entrez le numéro de téléphone"
                        required
                    />

                    <p className='text-lg mt-8 mb-1' > Message </p>
                    <textarea
                        className='px-4 py-1 border-gray-500 border rounded-md h-[150px] w-[350px]'
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)} // Capture de l'input
                        required
                    />
                    <button className='mt-14 border py-2 rounded-md border-gray-500 hover:bg-black hover:text-white transition duration-100 hover:shadow-2xl shadow-black' onClick={handleSubmit} > Envoyer </button>
                </div>
            </div>
        </ProtectedRoute>
    );
}
