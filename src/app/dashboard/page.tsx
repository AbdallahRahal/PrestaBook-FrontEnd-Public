// src/app/client/DashboardPage.tsx
"use client";
import ProtectedRoute from '../../components/ProtectedRoute';
import React, { useEffect, useState } from 'react'
import { getRating } from '@/services/ratingService';
import Rating from '@/models/Rating';
import './style.css'
import { formatDate } from '@/utils/dateMethod';
import Company, { CompanyStats } from '@/models/Company';
import { getCompany, getCompanyStats } from '@/services/companyService';
import { TailSpin } from 'react-loader-spinner';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

import ReviewCard from '@/components/ReviewCard';

export default function DashboardPage() {
    const [ratingData, setRatingData] = useState<Rating[]>([])
    const [companyData, setCompanyData] = useState<Company>()
    const [companyStats, setCompanyStats] = useState<CompanyStats>()

    const [ratingDataLoading, setRatingDataLoading] = useState<Boolean>(true)
    const [companyStatsLoading, setCompanyStatsLoading] = useState<Boolean>(true)
    const [companyDataLoading, setCompanyDataLoading] = useState<Boolean>(true)

    const getRatingData = async () => {
        setRatingDataLoading(true)
        const res = await getRating()
        if (res) setRatingData(res)
        setRatingDataLoading(false)
    }
    const getCompanyData = async () => {
        setCompanyDataLoading(true)
        const res = await getCompany()
        if (res) setCompanyData(res)
        setCompanyDataLoading(false)

    }
    const getCompanyStatsData = async () => {
        setCompanyStatsLoading(true)
        const res = await getCompanyStats()
        if (res) setCompanyStats(res)
        setCompanyStatsLoading(false)

    }

    const fetchAllData = () => {
        getRatingData()
        getCompanyData()
        getCompanyStatsData()
    }

    useEffect(() => {
        fetchAllData()
    }, [])

    const mapRatingDataToTable = () => {
        return (
            <div className="container mx-auto ">
                <table className="min-w-full bg-white px-1">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 border-y border-gray-500 text-center border-l ">Statut</th>
                            <th className="py-3 px-4 border-y border-gray-500 text-center">Nom</th>
                            <th className="py-3 px-4 border-y border-gray-500 text-center whitespace-nowrap">Numéro de téléphone</th>
                            <th className="py-3 px-4 border-y border-gray-500 text-center">Note</th>
                            <th className="py-3 px-4 border-y border-gray-500 text-center w-full">Commentaire</th>
                            <th className="py-3 px-4 border-y border-gray-500 text-center border-r whitespace-nowrap">Date de soumission</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ratingDataLoading ?
                            <tr>
                                <td colSpan={6} className="py-8">
                                    <div className="flex justify-center items-center">
                                        <TailSpin
                                            visible={true}
                                            height="80"
                                            width="80"
                                            color="#0d2d45"
                                            ariaLabel="tail-spin-loading"
                                            radius="0"
                                            wrapperClass="p-10"
                                        />
                                    </div>
                                </td>
                            </tr>
                            : ratingData?.map((rating, index) => (
                                <tr key={index}
                                    className={`hover:bg-gray-100 border-b  ${index == ratingData.length - 1 ? " border-b-gray-500" : ""}`}

                                >
                                    <td className={` border-l border-l-gray-500 text-center  py-2 px-4   
                                ${rating.status === "completed" ? "text-green-500" : "text-orange-500"}`}>
                                        {rating.status === "completed" ? "Complété" : "En attente"}
                                    </td>
                                    <td className="text-center py-2 px-4 ">{`${rating.firstName || ""} ${rating.lastName || ""}`}</td>
                                    <td className="text-center py-2 px-4 ">{rating.phoneNumber || ""}</td>
                                    <td className="text-center py-2 px-4 ">{rating.rating || ""}</td>
                                    <td className="text-center py-2 px-4 w-full">
                                        <div className='max-h-28 overflow-y-auto'>
                                            {rating.comment || ""}
                                        </div>
                                    </td>
                                    <td className="border-r border-r-gray-500 text-center  py-2 px-4 ">{rating.submitDate ? formatDate(rating.submitDate) : ""}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <ProtectedRoute>
            <div className='flex flex-row h-screen m-auto mt-4 gap-16 mx-8'>
                <div className='flex mx-auto flex-col flex-1 '>
                    <div className='flex'>
                        <h1 className="text-2xl font-bold mt-2 mb-10">Tableau des Avis</h1>
                        <ArrowPathIcon className='w-8 h-fit mt-2 ml-10 cursor-pointer transition-transform duration-500 hover:rotate-180' onClick={fetchAllData} />
                    </div>
                    {mapRatingDataToTable()}
                </div>
                <div className=" mx-auto ">
                    <h1 className="text-2xl font-bold mt-2 mb-10">Carte de visite</h1>
                    {
                        companyStatsLoading || companyDataLoading ?
                            <TailSpin
                                visible={true}
                                height="80"
                                width="80"
                                color="#0d2d45"
                                ariaLabel="tail-spin-loading"
                                radius="0"
                                wrapperClass=" w-fit "
                            />
                            :
                            <ReviewCard companyData={companyData as Company} companyStats={companyStats as CompanyStats} />
                    }
                </div>
            </div>
        </ProtectedRoute>
    );
}
