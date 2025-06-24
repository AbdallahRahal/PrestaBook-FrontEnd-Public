// src/app/agenda/CompanyWizard.tsx
'use client'
import { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import Stepper from '../../components/companyWizardComponents/Stepper';
import CompanyDetailsForm from '../../components/companyWizardComponents/CompanyDetailsForm';
import ContactDetailsForm from '../../components/companyWizardComponents/ContactDetailsForm';
import AddressDetailsForm from '../../components/companyWizardComponents/AddressDetailsForm'; // New import
import ReviewForm from '../../components/companyWizardComponents/ReviewForm';
import ImageUploadForm from '../../components/companyWizardComponents/ImageUploadForm'; // New import
import Company from '@/models/Company';
import { getCompany, postCompany } from '@/services/companyService';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import './style.css'

export default function CompanyWizard() {
    const router = useRouter();
    const [actualStep, setActualStep] = useState(0);
    const [loading, setLoading] = useState(true);
    const [companyData, setCompanyData] = useState<Company>({
        id: '',
        disabled: false,
        name: '',
        description: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        phone: '',
        email: '',
        coverUrl: '',
        logoUrl: '',
        imageUrls: [],
        tiktokLink: "",
        instagramLink: "",
        facebookLink: "",
    });

    const handleNext = (data: Partial<Company>) => {
        setCompanyData((prevData) => ({ ...prevData, ...data }));
        setActualStep((prevStep) => prevStep + 1);
    };

    const handlePrevious = () => {
        setActualStep((prevStep) => prevStep - 1);
    };
    const handleSubmit = async () => {
        if (companyData.coverUrl?.length == 0) delete companyData.coverUrl
        if (companyData.tiktokLink?.length == 0) delete companyData.tiktokLink
        if (companyData.instagramLink?.length == 0) delete companyData.instagramLink
        if (companyData.facebookLink?.length == 0) delete companyData.facebookLink
        if (companyData.logoUrl?.length == 0) delete companyData.logoUrl
        if (companyData.imageUrls?.length == 0) delete companyData.imageUrls
        try {

            const result = await postCompany(companyData)
            if (result) {
                router.replace('/dashboard')
            } else {
                console.log('error')
            }
        } catch (error) {
            console.log('Error sumbit wizard : ', error)
        }
    };

    useEffect(() => {

        const getCompanyReq = async () => {
            const res: Company | null = await getCompany()
            if (res) setCompanyData(res)
            setLoading(false)
        }
        getCompanyReq()
    }, [])

    return (
        <ProtectedRoute checkAuthOnly={true}>
            <div className=' w-full flex items-center min-h-[100vh] my-4'>
                <div className=" flex-1 pt-12 pb-8 px-4 max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg ">
                    {loading ?
                        <>Chargement</>
                        :
                        <>
                            <h1 className="text-xl font-bold  mb-4 text-center">PrestaBook</h1>
                            <h1 className="text-2xl font-bold mb-10 text-center">Créer votre établissement</h1>
                            <div className='border rounded-2xl mx-4 pb-4 shadow'>
                                <Stepper currentStep={actualStep} >
                                    <CompanyDetailsForm data={companyData} onNext={handleNext} />
                                    <AddressDetailsForm data={companyData} onNext={handleNext} onPrevious={handlePrevious} />
                                    <ContactDetailsForm data={companyData} onNext={handleNext} onPrevious={handlePrevious} />
                                    {/* <ImageUploadForm data={companyData} onNext={handleNext} onPrevious={handlePrevious} />*/}
                                    <ReviewForm data={companyData} onPrevious={handlePrevious} onSubmit={handleSubmit} />
                                </Stepper>
                            </div>
                        </>
                    }
                </div>
            </div>
        </ProtectedRoute>
    );
}
