import { useEffect, useState } from 'react';
import { auth, storage } from '../../config/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Company from '@/models/Company';

interface ImageUploadFormProps {
    data: Partial<Company>;
    onNext: (data: { coverUrl?: string; logoUrl?: string; imageUrls?: string[] }) => void;
    onPrevious: () => void;
}

export default function ImageUploadForm({ data, onNext, onPrevious }: ImageUploadFormProps) {

    const [coverUrl, setCoverUrl] = useState(data.coverUrl || '');
    const [logoUrl, setLogoUrl] = useState(data.logoUrl || '');
    const [imageUrls, setImageUrls] = useState<string[]>(data.imageUrls || []);
    const [uploading, setUploading] = useState(false);
    const maxImageCount = 5;
    const IMG_TYPES = {
        LOGO: 'LOGO',
        COVER: 'COVER',
        OTHER: 'OTHER'
    }

    const handleFileUpload = async (file: File, type: string) => {
        if (!file) return;
        setUploading(true);
        const storageRef = ref(storage, `users/` + auth.currentUser?.uid + `/profile_images/` + type + `/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef)

        switch (type) {
            case IMG_TYPES.LOGO:
                setLogoUrl(downloadURL)
                break;
            case IMG_TYPES.COVER:
                setCoverUrl(downloadURL)
                break;
            case IMG_TYPES.OTHER:
                setImageUrls((prevUrls) => {
                    const newUrls = [...prevUrls];
                    newUrls.push(downloadURL)
                    return newUrls;
                });
                break;
            default:
                break;
        }
        setUploading(false);
    };

    const handleFileInput = (type: string,) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileUpload(file, type);
        }
    };

    const handleSubmit = () => {
        onNext({ coverUrl, logoUrl, imageUrls });
    };

    const ImageDiv = () => {
        return <div className='relative border-2 border-transparent h-fit w-fit mt-2 group'>
            <div className="h-20 w-20 bg-gray-200 flex items-center justify-center text-gray-500">
                + Image
            </div>
        </div>

    }

    return (
        <div className="mx-4 ">
            <h2 className="text-xl font-bold mb-6">Télécharger des images (Optionnel)</h2>
            <div className="">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mt-6 mb-2 cursor-pointer">
                        Bannière
                        {coverUrl ? (
                            <div className='relative border-2 border-transparent hover:border-red-600 h-fit w-fit mt-2 group cursor-pointer'>
                                <p className='text-red-600 absolute top-0 right-0 z-10 hidden group-hover:inline-block  mr-2 '>
                                    X
                                </p>
                                <img src={coverUrl} alt="Vignette" className="h-20" />
                            </div>

                        ) : (
                            <ImageDiv />
                        )}
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileInput(IMG_TYPES.COVER)}
                        />
                    </label>
                </div>
                <div>

                    <label className="block text-sm font-medium text-gray-700 mt-6 mb-2 cursor-pointer">
                        Logo
                        {logoUrl ? (
                            <div className='relative border-2 border-transparent hover:border-red-600 h-fit w-fit mt-2 group cursor-pointer'>
                                <p className='text-red-600 absolute top-0 right-0 z-10 hidden group-hover:inline-block cursor-pointer mr-2 '>
                                    X
                                </p>
                                <img src={logoUrl} alt="Vignette" className="h-20" />
                            </div>
                        ) : (
                            <ImageDiv />
                        )}
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileInput(IMG_TYPES.LOGO)}
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mt-6 mb-2">Autres images</label>
                    <div className="flex space-x-2">
                        {[...Array(Math.min(maxImageCount, imageUrls.length))].map((_, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700">
                                    <div className='relative border-2 border-transparent hover:border-red-600 h-fit w-fit mt-2 group cursor-pointer'>
                                        <p className='text-red-600 absolute top-0 right-0 z-10 hidden group-hover:inline-block cursor-pointer mr-2 '>
                                            X
                                        </p>
                                        <img src={imageUrls[index]} alt={`Image ${index + 1}`} className="h-20 w-20 object-cover" />
                                    </div>
                                </label>
                            </div>
                        ))}
                        {
                            imageUrls.length < maxImageCount ?
                                <label className="block text-sm font-medium text-gray-700 cursor-pointer">
                                    <ImageDiv />
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileInput(IMG_TYPES.OTHER)}
                                    />
                                </label>
                                :
                                <></>
                        }


                    </div>
                </div>
                <div className="flex justify-between pt-4">
                    <button type="button" onClick={onPrevious} className="border border-gray-500 hover:bg-gray-800 hover:text-white py-2 px-4 rounded">Retour</button>
                    <button type="submit" onClick={handleSubmit} disabled={uploading} className=" py-2 px-3 rounded text-white bg-orange-500 border border-orange-500 rounded  ">
                        {uploading ? 'Téléchargement...' : 'Suivant'}

                    </button>
                </div>

            </div>
        </div>
    );
}
