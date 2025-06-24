// src/components/ReviewForm.tsx

import Company from "@/models/Company";
import Link from "next/link";

import Image from 'next/image';

import tiktokLogo from '../../images/tiktok.png'
import facebookLogo from '../../images/facebook.png'
import instagramLogo from '../../images/instagram.png'

interface ReviewFormProps {
    data: Partial<Company>;

    onPrevious: () => void;
    onSubmit: () => void;
}

export default function ReviewForm({ data, onPrevious, onSubmit }: ReviewFormProps) {
    return (
        <div className="mx-4 ">
            <h2 className="text-xl font-bold mb-4">Revoir & Confirmer</h2>
            <div className=" p-4  mb-4">
                <p><strong>Nom:</strong> {data.name}</p>
                <p><strong>Adresse:</strong> {data.address}, {data.postalCode} {data.city}, {data.country}</p>
                <p className="mt-2"><strong>Téléphone:</strong> {data.phone}</p>

                <div className="mt-4 flex mb-1 items-center">
                    <Image className="h-6 w-6 mr-2" alt='tiktokLogo' src={tiktokLogo} />
                    {data.tiktokLink ? <Link href={data.tiktokLink} className="underline">{data.tiktokLink}</Link> : <></>}
                </div>

                <div className=" flex mb-1 items-center">
                    <Image className="h-6 w-6 mr-2" alt='instagramLogo' src={instagramLogo} />
                    {data.instagramLink ? <Link href={data.instagramLink} className="underline">{data.instagramLink}</Link> : <></>}
                </div>

                <div className=" flex mb-1 items-center">
                    <Image className="h-6 w-6 mr-2" alt='facebookLogo' src={facebookLogo} />
                    {data.facebookLink ? <Link href={data.facebookLink} className="underline">{data.facebookLink}</Link> : <></>}
                </div>


                {
                    /** 
                                <p className="mt-4 mb-1"><strong>Bannière</strong></p>
                
                                <div className="flex mb-6 ">
                                    <img src={data.coverUrl} alt={`Cover`} className="h-20 " />
                                </div>
                
                                <p className="mb-1"><strong>Logo</strong></p>
                                <div className="flex mb-6 ">
                                    <img src={data.logoUrl} alt={`Logo`} className="h-20 " />
                                </div>
                
                
                                <p className="mb-1"><strong>Images</strong></p>
                                <div className="mb-6 flex space-x-2">
                                    {data.imageUrls?.map((img, index) => (
                                        <img src={img} key={index} alt={`Image ${index + 1}`} className="h-20 w-20 object-cover" />
                                    ))}
                                </div>
                */
                }
            </div>

            <div className="flex justify-between ">
                <button type="button" onClick={onPrevious} className="border border-gray-500 hover:bg-gray-800 hover:text-white py-2 px-4 rounded">Retour</button>
                <button type="submit" onClick={onSubmit} className=" py-2 px-3 rounded text-white bg-orange-500 border border-orange-500 rounded  ">Soumettre</button>
            </div>
        </div>
    );
}
