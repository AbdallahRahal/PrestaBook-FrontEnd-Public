import React, { useState, useEffect } from 'react';
import Company, { CompanyStats } from '@/models/Company';
import { Rating as MuiRating } from '@mui/material';
import tiktokLogo from '../images/tiktok.png'
import facebookLogo from '../images/facebook.png'
import Image from 'next/image';
import instagramLogo from '../images/instagram.png'
import Link from 'next/link';
import Rating from '@/models/Rating';
import { formatPhoneNumber } from '@/utils/formatStringMethod';
import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';

const ReviewCard = ({ companyData, companyStats }: { companyData: Company, companyStats: CompanyStats }) => {
    return (
        <div className="bg-white rounded-lg shadow-md px-6 pt-4 text-center h-[450px] w-[300px] flex flex-col relative overflow-hidden ">
            <div className="absolute -top-[6%] left-0 w-full h-[37%] bg-blue-700 transform -skew-y-6 z-1"></div>
            <div className="absolute -top-[10%] left-0 w-full h-[37%] bg-blue-600 transform -skew-y-[12deg] z-1"></div>
            <div className='relative z-2 w-full h-full flex flex-col'>

                <h2 className="text-2xl  text-white mb-4 mt-4 ">{companyData?.name}</h2>


                <div className={"bg-white   rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-2 border-gray-200 border text-blue-700"}>
                    <span className="text-4xl font-bold">{companyStats?.globalRating?.toFixed(1) || ''}</span>
                </div>


                <MuiRating
                    className='mx-auto '
                    value={companyStats?.globalRating}
                    precision={0.1}
                    readOnly
                    size="large"
                />
                <p className="text-xs text-gray-600  ">Sur un total de {companyStats?.ratingCount} avis</p>
                <div className='flex-1 relative flex flex-col  justify-center gap-4'>
                    <Link href={'/public/company/' + companyData?.id} target="_blank" className="mx-auto  px-4 py-2 border border-blue-700 text-blue-600 rounded-md hover:bg-blue-700 hover:text-white shadow-sm shadow-blue-500">
                        Découvrez Nos Avis
                    </Link>


                </div>
                <div className='w-full flex flex-col  '>
                    <div className='flex flex-col justify-evenly gap-1 mx-auto mb-4 text-left  leading-[14px] text-xs text-blue-700 opacity-95' >
                        <div className='flex   '>
                            <PhoneIcon className='h-4 mr-2 my-auto' />
                            <a href={`tel:${companyData?.phone}`}>{formatPhoneNumber(companyData?.phone)}</a>
                        </div>
                        <div className='flex   '>
                            <MapPinIcon className='h-5 mr-2 my-auto ' />
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                    companyData?.address + "," +
                                    companyData?.postalCode + "," +
                                    companyData?.city + "," +
                                    companyData?.country)}`}
                                target="_blank"
                                rel="noopener noreferrer">{companyData?.address},<br /> {companyData?.postalCode} {companyData?.city}, {companyData?.country}</a>
                        </div>
                    </div>
                    <div className='flex mb-3  justify-evenly'>
                        {companyData?.tiktokLink ?
                            <Link href={companyData?.tiktokLink} target="_blank" className='cursor-pointer'>
                                <Image className="h-[30px] w-[30px]" src={tiktokLogo} alt='tiktokLogo' />
                            </Link> : <></>}

                        {companyData?.instagramLink ?
                            <Link href={companyData?.instagramLink} target="_blank" className='cursor-pointer'>

                                <Image className="h-[30px] w-[30px]" src={instagramLogo} alt='instagramLogo' />
                            </Link> : <></>}

                        {companyData?.facebookLink ?
                            <Link href={companyData?.facebookLink} target="_blank" className='cursor-pointer'>

                                <Image className="h-[30px] w-[30px]" src={facebookLogo} alt='facebookLogo' />
                            </Link> : <></>}

                    </div>
                    <Link href='/' target="_blank" className="text-xs text-gray-400 mb-1  ">Powered by <p className='inline underline cursor-pointer'>PrestaBook</p></Link>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard

{   /* Ebauche carrousel
    <div className="w-full overflow-hidden flex-1 ">
           <div className="flex items-center  h-full  transition-transform duration-[1200ms] ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
               {displayableRatings.map((rating, index) => (
                   <div key={index} className='h-full w-full flex-none flex flex-col py-2 '>
                       <p className="underline text-left">{rating.firstName + rating.lastName}</p>
                       <p className="text-sm overflow-y-auto">{rating.comment}</p>
                   </div>
               ))}
           </div>
       </div>
       */}