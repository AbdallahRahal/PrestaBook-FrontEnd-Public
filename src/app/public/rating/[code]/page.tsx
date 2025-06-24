"use client";
import Company from '@/models/Company';
import Rating, { SubmitRatingProps } from '@/models/Rating';
import { SmsRecord } from '@/models/SmsRecord';
import { getCompanyById } from '@/services/companyService';
import { getRating, getRatingById, submitRating } from '@/services/ratingService';
import { getSmsRecordById } from '@/services/smsService';
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';

export default function RatingPage({ params }: { params: { code: string } }) {
    const [loading, setLoading] = useState<Boolean>(true);
    const [company, setCompany] = useState<Company>();
    const [rating, setRating] = useState<Rating>();

    // Nouveaux états pour les champs
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [ratingNotation, setRatingNotation] = useState<number>(5);
    const [comment, setComment] = useState<string>('');

    const messageCode = params.code;

    useEffect(() => {
        const getCompany = async (companyId: string) => {
            const res = await getCompanyById(companyId);
            if (res) {
                setCompany(res);
            }
        };

        const getRating = async (ratingId: string) => {
            const res = await getRatingById(ratingId);
            if (res) {
                setRating(res);
                return res;
            }
        };

        const fetchRatingInfo = async () => {
            const rating = await getRating(messageCode);
            if (rating) {
                await getCompany(rating.companyId);
            }
            setLoading(false);
        };

        fetchRatingInfo();
    }, []);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const ratingData: SubmitRatingProps = {
            firstName,
            lastName,
            rating: ratingNotation,
            comment,
            code: messageCode
        };

        console.log('Rating Data:', ratingData);
        submitRating(ratingData)
    };

    if (loading) {
        return (
            <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#0d2d45"
                ariaLabel="tail-spin-loading"
                radius="0"
                wrapperStyle={{ width: 'fit-content' }}
                wrapperClass=""
            />
        );
    }

    return (
        <div className='flex h-screen m-auto'>
            <div className='flex mx-auto flex-col '>
                <h1 className="text-2xl font-bold text-center mt-20 mb-10">Notez votre passage chez {company?.name}</h1>

                <form onSubmit={handleSubmit} className="flex flex-col">

                    <p className='text-lg mt-4 mb-1'>Note (1 à 5)</p>
                    <input
                        className='w-full px-4 py-1 border-gray-700 border rounded-md'
                        type="number"
                        id="rating"
                        name="rating"
                        value={ratingNotation}
                        onChange={(e) => setRatingNotation(parseInt(e.target.value))}
                        min="1"
                        max="5"
                        required
                    />


                    <p className='text-lg mt-4 mb-1'>Commentaire</p>
                    <textarea
                        className='w-full px-4 py-1 border-gray-700 border rounded-md h-[150px]'
                        id="comment"
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Entrez vos commentaires"
                        required
                    />

                    <p className='text-lg  mt-4 mb-1'>Prénom</p>
                    <input
                        className=' w-full px-4 py-1 border-gray-700 border rounded-md'
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Entrez votre prénom"
                        required
                    />

                    <p className='text-lg mt-4 mb-1'>Nom</p>
                    <input
                        className='w-full px-4 py-1 border-gray-700 border rounded-md'
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Entrez votre nom"
                        required
                    />




                    <button
                        type="submit"
                        className='w-full mt-10 border py-2 rounded-md border-gray-700 hover:bg-black hover:text-white transition duration-100 hover:shadow-2xl shadow-black'
                    >
                        Envoyer
                    </button>
                </form>
            </div>
        </div>
    );
}
