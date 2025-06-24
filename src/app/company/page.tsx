"use client";
import { useEffect, useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { getCompany, getCompanyStats } from '@/services/companyService';
import { TailSpin } from 'react-loader-spinner';
import Company, { CompanyStats } from '@/models/Company';
import { formatPhoneNumber } from '@/utils/formatStringMethod';
import Link from 'next/link';
import Rating from '@/models/Rating';
import { getRating, } from '@/services/ratingService';
import ReviewCard from '@/components/ReviewCard';
import { cancelSubscription, checkSession, subscribePremium } from '@/services/premiumService';
import { useSearchParams } from 'next/navigation'

export default function CompanyPage() {
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')

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
        console.log('companyData : ', res)
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
        if (session_id && typeof session_id == 'string') {
            checkSession(session_id);
        }
    }, [])


    const handleSubscription = async () => {
        const url = await subscribePremium()
        if (url)
            window.location.href = url;

    };
    const handleCancelSubscription = async () => {
        await cancelSubscription()
        fetchAllData()

    }

    return (
        <ProtectedRoute>
            <div className='flex flex-row h-screen m-auto mt-4 gap-20 mx-8 '>
                <div className=' flex-1'>
                    <h1 className="text-3xl font-bold text-gray-800 mr-6 mb-8">Mon forfait</h1>
                    <div className="flex space-x-8 ml-8">
                        {/* Carte Offre Gratuite 
                        <div className={'bg-white h-[450px] w-[300px] rounded-lg shadow-md p-5 flex flex-col justify-between ' + (!companyData?.subscriptionActive ? ' border-2 border-blue-500' : "")}>
                            <h2 className="text-2xl font-bold text-blue-600 text-center mb-2">Offre Gratuite</h2>
                            <p className="text-center text-lg text-gray-700">1 SMS par jour</p>
                            <p className="text-center text-lg text-gray-700">Limité à 31 SMS par mois</p>
                            <div className="flex-1 flex items-center justify-center">
                                <span className="text-5xl font-bold text-gray-800">0 €</span>
                                <span className="text-gray-500 text-sm ml-1">/mois</span>
                            </div>
                            <p className="text-center text-sm text-gray-500">Accédez aux fonctionnalités de base PrestaBook</p>
                            {!companyData?.subscriptionActive ?
                                <button className="bg-gray-100 text-gray-400 font-semibold py-2 rounded-md  mt-4 cursor-default">
                                    Selectionné
                                </button>
                                :
                                <button className="bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 mt-4">
                                    Choisir
                                </button>
                            }

                        </div>
*/}
                        {/* Carte Offre Premium   border-2 border-yellow-400 */}
                        <div className={'bg-white h-[450px] w-[300px] rounded-lg shadow-md p-5 flex flex-col justify-between ' + (companyData?.subscriptionActive ? ' border-2 border-yellow-500' : "")}>
                            <h2 className="text-2xl font-bold text-yellow-500 text-center mb-2">Offre Premium</h2>
                            <p className="text-center text-lg text-gray-700">10 SMS par jour</p>
                            <div className="flex-1 flex items-center justify-center">
                                <span className="text-5xl font-bold text-gray-800">17,49 €</span>
                                <span className="text-gray-500 text-sm ml-1">/mois</span>
                            </div>
                            <p className="text-center text-sm text-gray-500">Profitez de davantage d'envois pour accroître votre visibilité.</p>

                            {companyData?.subscriptionActive ?
                                <>
                                    <button onClick={handleCancelSubscription} className="bg-gray-100 text-gray-700 font-semibold py-2 rounded-md  mt-4 hover:bg-gray-200">
                                        Annulé l'abonnement
                                    </button>
                                    <p className='mx-auto text-gray-700 mt-2'> Prochain paiement : {new Date(companyData?.subscriptionEndDate as number * 1000).toLocaleDateString()}</p>
                                </>
                                :
                                (companyData?.subscriptionEndDate && (companyData?.subscriptionEndDate * 1000) > Date.now() ?
                                    <button className="bg-gray-100 text-gray-400 font-semibold py-2 rounded-md  mt-4 cursor-default">
                                        Abonné jusqu'au
                                        {companyData?.subscriptionEndDate ? <p className='inline'> {new Date(companyData?.subscriptionEndDate * 1000).toLocaleDateString()}</p> : <></>}
                                    </button>
                                    :
                                    <button className="bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 mt-4" onClick={handleSubscription}>
                                        Passer a l'offre Premium
                                    </button>)

                            }
                        </div>
                    </div>

                </div>


                <div className="flex flex-col items-center">
                    <div className=' flex items-center mb-8'>
                        <h1 className="text-3xl font-bold text-gray-800 mr-6">Ma carte de visite</h1>
                        <Link href='/companyWizard'
                            className="bg-orange-500 opacity-80 hover:opacity-100 text-white rounded-md text-sm font-medium px-4 py-1 content-center h-fit "
                        >Modifier</Link>
                    </div>
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
